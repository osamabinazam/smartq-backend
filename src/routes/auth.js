
import jwt from 'jsonwebtoken';
import jwtTokens from '../utils/jwt-helper.js';
import express from 'express';
import bcrypt from 'bcrypt';
import pool from "../db/connection.js";
import authenticateToken from '../middlewares/authorization.js';
// import sendEmail from '../utils/email.js';
const router = express.Router();




// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await pool.query("SELECT * FROM users WHERE email = $1 ", [email]);

        // 
        if (users.rows.length === 0) return res.status(401).json({ error: "Incorrect Email Address" })

        // Check Password
        const validatePassword = await bcrypt.compare(password, users.rows[0].password);
        if (!validatePassword) return res.status(401).json({ error: "Password Incorrect" })

        // JWT
        const tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.status(200).json({ tokens: tokens, user: users.rows[0] });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});

// reset password
router.post('/reset-password', async (req, res) => {

    try {

        // Send Email
        sendEmail(req.body).then((response) =>{
            res.status(200).json(response.message);
        }).catch((error) =>{
            res.status(500).json(error.message);
        });


        const { email, password } = req.body; // email
        const hashPassword = await bcrypt.hash(password, 10);
        const users = await pool.query("UPDATE users SET password = $1 WHERE email = $2 RETURNING *", [hashPassword, email]);

        res.status(200).json({ message: "Password Reset Successful" });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});


// Logout User from the System
router.get('/logout',authenticateToken, async (req, res) => {
    console.log("Hi from logout")
    res.clearCookie('refresh_token');
    res.status(200).json({ message: "User Logged Out" });
});

export default router;