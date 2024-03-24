import db from "../models/index.js";
import bcrypt from 'bcrypt';
import jwtTokens from '../utils/jwt-helper.js';

/**
 * Authenticate the user login
 */
const login = async (req, res) => {
    console.log(req.body)   
}

/**
 * Register a new user and authenticate the user login
 */

const register = async (req, res) => {
    console.log(req.body)
}

/**
 * Reset the user password and authenticate the user login
 */
const resetPassword = async (req, res) => {
    console.log(req.body)
}

/**
 * Logout the user
 */
const logout = async (req, res) => {
    console.log(req.body)
}




/**
 * export the controller functions
 * 
 */

export default {
    login,
    register,
    resetPassword,
    logout
}