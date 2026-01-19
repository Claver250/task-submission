const User = require('../models/user');
const {registerSchema, loginSchema} = require('../validators/userValidate');
const {hashPassword, comparePassword} = require('../utils/bcrypt');
const {generateToken} = require('../utils/token');
const { exist } = require('joi');

exports.register = async (req, res) => {
    try {
        const {error, value} = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.message});
        }
        const {name, email, password, track} = value;
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(409).json({message: 'User with this email already exists'});
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            track
        });
        const token = generateToken({id: user.id, email: user.email});
        return res.status(201).json({
            message: 'User registered successfully',
            user: {id: user.id, name: user.name, email: user.email, track: user.track},
            token
        });
   } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.login = async (req, res) => {
    try {
        const {error, value} = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.message});
        }
        const {email, password} = value;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = generateToken({id: user.id, email: user.email});
        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};