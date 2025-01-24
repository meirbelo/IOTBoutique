const { Router } = require('express');

module.exports = app => {
    const test = require('../controllers/test.controller')

    var routes = require('express').Router();
    
    Router.get('/', test.findAll)

    app.use("/api/test" , router)
}