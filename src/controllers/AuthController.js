const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const jwtTokens = require('../utils/jwt-helper.js');
const ImageService = require("../services/ImageService.js");
const ProfileService = require("../services/ProfileService.js");

const User = db.UserModel;


/**
 * Login user and return jwt tokens and user data if successful else return error message
 * @param {*} req 
 * @param {*} res 
 * @returns  {object} tokens and user data
 */
const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }

    const username_email = req.body.username || req.body.email;

    try {
        const user = await User.findOne({
            where: {
                [db.Sequelize.Op.or]: [{ username: username_email }, { email: username_email }]
            }
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }

        await User.update({ lastlogin: new Date() }, { where: { userid: user.userid } });

        const images = await ImageService.getImagesByUserId(user.userid);

        const userData = { ...user.dataValues, password: undefined, images };

        const tokens = jwtTokens(userData);

        res.status(200).send({ tokens: tokens, user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while processing the login");
    }
};


/**
 * Register a new user and return jwt tokens and user data if successful else return error message
 * @param {*} req 
 * @param {*} res  
 * @returns  {object} tokens and user data
 */
const register = async (req, res) => {
    if (!req.body){
        return res.status(400).send("Request body is missing")
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user ={
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        gender: req.body.gender,
        usertype: req.body.usertype,
    }

    User.create(user).then((user) => {
        if (!user){
            return res.status(500).send("Error while registering the user")
        }

        user.password = undefined;

        const tokens = jwtTokens(user.dataValues);

        if (user.dataValues.usertype === 'vendor'){
            const vendorProfile = {
                businessname: null,
                businesstype: null,
                bio: null,
                dob: null,
                userid: user.userid
            }

            ProfileService.createVendorProfile(vendorProfile).then((vendorProfile) => {
                if (!vendorProfile){
                   vp = vendorProfile;
                }
            }).catch((err) => {
                throw new Error("Failed to create vendor profile.");
            });
        }

        res
        .cookie("access_token", tokens.accessToken, { httpOnly: true })
        .cookie("refresh_token", tokens.refreshToken, { httpOnly: true })
        .cookie("user", user.dataValues)
        .status(201)
        .send({tokens:tokens, user: user.dataValues, message: "User registered successfully"})
    }).catch((err) => {
        res.status(500).send(err)
    });
}

const resetPassword = async (req, res) => {
    console.log(req.body);
    
    if (!req.body){
        return res.status(400).send("Request body is missing")
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const email_username = req.body.username ? req.body.username : req.body.email;

    User.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ username: email_username }, { email: email_username }]
        }
    }).then((user) => {
        if (!user){
            return res.status(404).send("User not found")
        }

        User.update({
            password: hashPassword,
        }, { where : { userid: user.userid } }
        ).then((updatedUser) => {
            if (!updatedUser){
                return res.status(500).send("Error while updating the user password")
            }

            user.password = undefined;

            const tokens = jwtTokens(user.dataValues);

            res.status(200).send({tokens: tokens, user: user.dataValues, message: "Password reset successful"})
        }).catch((err) => {
            console.log(err)
            return res.status(500).send("Error while updating the user password")
        });
    }).catch((err) => {
        return res.status(500).send("Error while finding the user")
    });
}

const logout = async (req, res) => {
    console.log(req.body),
    res.send("User has logged out")
}

module.exports = {
    login,
    register,
    resetPassword,
    logout,
};
