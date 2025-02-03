module.exports = app => {
  const account = require("../controllers/account.controller.js");
  var router = require("express").Router();

  
    router.get("/register", account.renderRegisterPage);
    router.post("/register", account.registerUser);

    
    router.get("/login", account.renderLoginPage);
    router.post("/login", account.loginUser);

    router.post("/logout", account.logoutUser);

   
    app.use("/account", router);
  };