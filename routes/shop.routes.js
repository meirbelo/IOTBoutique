module.exports = app => {
    const shop = require("../controllers/shop.controller.js");
    const {authenticateToken , isAdmin}  = require("../middleware/auth.middleware.js")

    var router = require("express").Router();
    router.get("/",  authenticateToken, shop.GetAllProduct);
    router.get("/:id",  authenticateToken, shop.GetIdProduct);
    router.get("/admin/add/product",  authenticateToken, isAdmin, shop.CreateProductForm);
    router.post("/admin/add/product",  authenticateToken, isAdmin, shop.CreateProduct);
    router.get("/admin/add/category",  authenticateToken, isAdmin, shop.CreateCategoryForm);
    router.post("/admin/add/category",  authenticateToken, isAdmin, shop.CreateCategory);
    
    app.use("/shop", router);
    };