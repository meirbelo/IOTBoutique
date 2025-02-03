module.exports = app => {
    const shop = require("../controllers/shop.controller.js");
    const {authenticateToken , isAdmin}  = require("../middleware/auth.middleware.js")

    var router = require("express").Router();

    //routes for user 
    router.get("/",  authenticateToken, shop.getProducts);
    router.get("/:id",  authenticateToken, shop.getIdProduct);


    //routes for admin
    router.get("/admin/products",  authenticateToken, isAdmin, shop.ManageProducts);
    router.post("/admin/product/new",  authenticateToken, isAdmin, shop.CreateProduct);
    router.get("/admin/product/new",  authenticateToken, isAdmin, shop.AddProductForm);

    router.post("/admin/product/edit/:id",  authenticateToken, isAdmin, shop.UpdateProduct);

    
    router.post("/admin/product/delete/:id",  authenticateToken, isAdmin, shop.DeleteProduct);

    router.get("/admin/category/new",  authenticateToken, isAdmin, shop.CreateCategoryForm);
    router.post("/admin/category/new",  authenticateToken, isAdmin, shop.CreateCategory);
    
    app.use("/shop", router);
    };