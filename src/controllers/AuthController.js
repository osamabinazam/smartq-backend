import db from "../models/index.js";
import bcrypt from 'bcrypt';
import jwtTokens from '../utils/jwt-helper.js';


/**
 * Models
 */

const User = db.UserModel;


/**
 * Authenticate the user login
 */
const login = async (req, res) => {


    if (!req.body){
        return res.status(400).send("Request body is missing")
    }

    const username_email =  req.body.username ? req.body.username : req.body.email;
 

    // find the user by username or email
   User.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ username: username_email }, { email: username_email }]
        }
    }).then((user) => {

        // check if the user exists
        if (!user){
            return res.status(404).send("User not found")
        }

        // compare the password
        bcrypt.compare(req.body.password, user.password).then((validPassword) => {

            // check if the password is valid
            if (!validPassword){
                return res.status(401).send("Invalid password")
            }

            // update the last login date
            const currentDate = new Date();
            User.update({
                lastlogin: currentDate,
            }, { where : { userid: user.userid } }
            ).then((updatedUser) => {

                // check if the last login date was updated
                if (!updatedUser){
                    return res.status(500).send("Error while updating the last login date")
                }
            }).catch((err) => {
                return res.status(500).send("Error while updating the last login date")
            });

            // remove the password from the user data for security reasons
            user.password = undefined;

            // generate the jwt tokens
            const tokens = jwtTokens(user.dataValues);
        
            // send the tokens and the user data
            res.status(200).send({tokens: tokens, user: user.dataValues});
        }).catch((err) => {

            return res.status(500).send("Error while comparing the passwords")
        });
    }).catch((err) => {
        return res.status(500).send("Error while finding the user")        
    });
}


/**
 * Register a new user and authenticate the user login
 */

const register = async (req, res) => {

    // check if the request body is empty
    if (!req.body){
        return res.status(400).send("Request body is missing")
    }

    // hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const currentDate = new Date();

    // create the user object
    const user ={
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        gender: req.body.gender,
        usertype: req.body.usertype,
        isactive: true,
        lastlogin: currentDate

    }

    // save the user to the database
    User.create(user).then((user) => {

        if (!user){
            return res.status(500).send("Error while registering the user")
        }

        // remove the password from the user data for security reasons
        user.password = undefined;

        // generate the jwt tokens
        const tokens = jwtTokens(user.dataValues);

        // send the tokens and the user data
        res.status(201).send({tokens:tokens, user: user.dataValues, message: "User registered successfully"})
    }).catch((err) => {
        res.status(500).send("Error while registering the user")
    });
}



/**
 * Reset the user password and authenticate the user login
 */
const resetPassword = async (req, res) => {
    console.log(req.body);
    
    // check if the request body is empty
    if (!req.body){
        return res.status(400).send("Request body is missing")
    }

    // hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const email_username = req.body.username ? req.body.username : req.body.email;

    // find the user by email or username
    User.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ username: email_username }, { email: email_username }]
        }
    }).then((user) => {


        // check if the user exists
        if (!user){
            return res.status(404).send("User not found")
        }

        // update the user password
        User.update({
            password: hashPassword,
        }, { where : { userid: user.userid } }
        ).then((updatedUser) => {

            // check if the user password was updated
            if (!updatedUser){
                return res.status(500).send("Error while updating the user password")
            }

            // remove the password from the user data for security reasons
            user.password = undefined;

            // generate the jwt tokens
            const tokens = jwtTokens(user.dataValues);

            // send the tokens and the user data
            res.status(200).send({tokens: tokens, user: user.dataValues, message: "Password reset successful"})
        }).catch((err) => {
            console.log(err)
            return res.status(500).send("Error while updating the user password")
        });
    }).catch((err) => {
        return res.status(500).send("Error while finding the user")
    });
}


/**
 * Logout the user
 */
const logout = async (req, res) => {
    console.log(req.body),
    res.send("User has logged out")
}



/**
 * export the controller functions
 * 
 */

export default {
    login,
    register,
    resetPassword,
    logout,
}