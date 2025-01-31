const { User, validateUserSignUp, validateUserSignIn } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const jwtExpirySeconds = 86400;

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, login: user.login, email: user.email, admin: user.admin },
        SECRET,
        { expiresIn: jwtExpirySeconds }
    );
};

exports.renderSignUpPage = (req, res) => {
    res.render('register');
};

exports.renderSignInPage = (req, res) => {
    res.render('login');
};

exports.registerUser = async (req, res) => {
    const { error } = validateUserSignUp(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword,
            admin: false,
        });

        await user.save();
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "strict",
            maxAge: jwtExpirySeconds * 1000
        });

        res.status(200).redirect('/member');

    } catch (error) {
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyPattern)[0];

            if (duplicatedField === 'login') {
                return res.status(400).send('Login already exists');
            } 
            else if (duplicatedField === 'email') {
                return res.status(400).send('Email already exists');
            }
        } else {
            res.status(400).send(error.message);
        }
    }
};

exports.loginUser = async (req, res) => {
    const { error } = validateUserSignIn(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let user = await User.findOne({ login: req.body.login });

        if (!user) {
            return res.status(400).send('Incorrect login or password.');
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).send('Incorrect login or password.');
        }
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "strict",
            maxAge: jwtExpirySeconds * 1000
        });

        res.status(200).redirect('/member');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).redirect('/api/account/login');
    } catch (err) {
        res.status(400).send('Error during logout: ' + err.message);
    }
};


