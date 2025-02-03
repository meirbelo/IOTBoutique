module.exports = app => {
    const member = require("../controllers/member.controller.js");
    const {authenticateToken , isAdmin}  = require("../middleware/auth.middleware.js")

    var router = require("express").Router();
    router.get("/",  authenticateToken, isAdmin, member.renderMemberPage);  
    
    app.use("/member", router);
    };