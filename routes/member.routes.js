module.exports = app => {
    const member = require("../controllers/member.controller.js");
    const {authenticateToken}  = require("../middleware/auth.middleware.js")

    //router.use(authenticateToken);

    var router = require("express").Router();
    router.get("/",  authenticateToken, member.renderMemberPage);  
    
    app.use("/member", router);
    };