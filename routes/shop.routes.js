module.exports = app => {
    const shop = require("../controllers/shop.controller.js");
    const {authenticateToken , isAdmin}  = require("../middleware/auth.middleware.js")

    var router = require("express").Router();

    //routes for user 
    router.get("/",  authenticateToken, shop.getProducts);
    router.get("/:id",  authenticateToken, shop.getIdProduct);


    //routes for admin
    router.get("/admin/products", isAdmin, shop.ManageProducts);
    router.post("/admin/product/new", isAdmin, shop.CreateProduct);
    router.get("/admin/product/new", isAdmin, shop.AddProductForm);

    router.post("/admin/product/edit/:id", isAdmin, shop.UpdateProduct);

    
    router.post("/admin/product/delete/:id", isAdmin, shop.DeleteProduct);

    
    router.get("/admin/categories", isAdmin, shop.ManageCategories);
    router.post("/admin/category/new",  isAdmin, shop.CreateCategory);
    router.get("/admin/category/new",  isAdmin, shop.CreateCategoryForm);
    router.post("/admin/category/edit/:id", isAdmin, shop.UpdateCategory);
    router.post("/admin/category/delete/:id", isAdmin, shop.DeleteCategory);
    app.use("/shop", router);
    };