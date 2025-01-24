module.exports = app => {
  const account = require("../controllers/account.controller.js");

  var router = require("express").Router();

  
    router.get("/", account.login);
  
   
    app.use("/api/account", router);
  };