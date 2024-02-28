import express from 'express';
import pool from "../db/connection.js";
import bcrypt from 'bcrypt';
import authenticateToken from '../middlewares/authorization.js';
import jwtTokens from '../utils/jwt-helper.js';


const router = express.Router();

// Get all Users
router.get('/', authenticateToken,async (req, res) => {
    console.log("User has made a request to get all users");
    try {
        const data = await pool.query('SELECT * FROM public.users');
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Create User
router.post('/', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const currentDate = new Date();
        const newUser = await pool.query('INSERT INTO public.users (firstname, lastname, username, email, phone, gender, password, registrationdate, lastlogindate, usertype, isactive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [
                req.body.firstName,
                req.body.lastName,
                req.body.username,
                req.body.email,
                req.body.phone,
                req.body.gender,
                hashPassword,
                currentDate,
                currentDate,
                req.body.userType,
                true,
            ]);

        // Generate a token for the registered user
        const registrationToken = jwtTokens(newUser.rows[0]);

        res.status(200).json({ user: newUser.rows[0], registrationToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});



// Get User By ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM public.users WHERE user_id = $1', [req.params.id]);
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get User By Email
router.get('/:email', authenticateToken, async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM public.users WHERE email = $1', [req.params.email]);
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


// Update user
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        // will add logic to it.xw

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


// Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        // will add logic to it.
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



export default router;

