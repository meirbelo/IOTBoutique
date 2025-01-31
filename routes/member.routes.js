module.exports = app => {
    const account = require("../controllers/member.controller.js");
    const {authenticateToken , isAdmin}  = require("../middleware/auth.middleware.js")

    var router = require("express").Router();
    router.get("/",  authenticateToken, account.MemberPage);  
    
    app.use("/member", router);
    };