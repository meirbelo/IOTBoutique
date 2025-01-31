const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 30,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

// Validation pour l'inscription
function validateUserSignUp(user) {
    const schema = Joi.object({
        login: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(7).max(30).required(),
        passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' }),
    });
    return schema.validate(user);
}

// Validation pour la connexion
function validateUserSignIn(user) {
    const schema = Joi.object({
        login: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(7).max(30).required(),
    });
    return schema.validate(user);
}

const User = mongoose.model('accounts', userSchema);

module.exports = {
    User,
    validateUserSignUp,
    validateUserSignIn,
};
