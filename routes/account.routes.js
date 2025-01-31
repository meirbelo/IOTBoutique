module.exports = app => {
  const account = require("../controllers/account.controller.js");
  var router = require("express").Router();

  
    router.get("/register", account.renderSignUpPage);
    router.get("/login", account.renderSignInPage);
    router.post("/register", account.registerUser);
    router.post("/login", account.loginUser);
    router.post("/logout", account.logoutUser);

   
    app.use("/api/account", router);
  };