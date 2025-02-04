const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const SECRET = process.env.SECRET;

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).render('404');
    }
    try {
        // Vérifie si le accessToken est valide
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
            return next();

        
    } catch (err) {
        return res.status(500).json({ message: "Erreur" });
    }
};

const isAdmin = (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    if (req.user.admin) {
        return next();
    }
    return res.status(403).json({ message: "Accès réservé au administrateur." });
};



module.exports = { authenticateToken ,isAdmin };
