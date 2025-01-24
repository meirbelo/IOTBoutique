const db  = require('../models')
const Test = db.test;

exports.login = (req, res) => {
      res.render("register");
};