const User = require('../models/user');
const {registerSchema, loginSchema} = require('../validators/userValidate');
const {hashPassword, comparePassword} = require('../utils/bcrypt');
const {generateToken} = require('../utils/token');
const { exist } = require('joi');

exports.register = async (req, res) => {
    try {
        const {name, email, password, track, role} = req.body;
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(409).json({message: 'User with this email already exists'});
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            track,
            role
        });
        const token = generateToken({id: user.id, email: user.email, track: user.track, role: user.role});
        return res.status(201).json({
            message: 'User registered successfully',
            user: {id: user.id, name: user.name, email: user.email, track: user.track, role: user.role},
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = generateToken({id: user.id, email: user.email, track: user.track, role: user.role});
        return res.status(200).json({
            message: 'Login successful',
            track: user.track,
            role: user.role,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};