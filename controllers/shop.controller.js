const { Product, validateProduct } = require('../models/product.model');
const { Category, validateCategory } = require('../models/category.model');

exports.getProducts =async (req, res) => {
    try {
        // Join with Categories collection 
        let products = await Product.find().populate("category_id", "category_name");
        res.render("products", { products });
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        res.status(500).send("Erreur serveur");
    }
    
}

exports.getIdProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findOne({ productId: id }).populate("category_id", "category_name");
        if (!product) {
            return res.status(404).send("Produit non trouvé");
        }
        res.render("productId", { product });
    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        res.status(500).send("Erreur serveur");
    }
};

exports.ManageProducts = async (req, res) => {
    try {
        const categories = await Category.find({});
        const products = await Product.find().populate("category_id", "category_name");
    
        res.render("adminProduct", { categories, products });
        
    } catch (error) {
        console.error("Erreur lors de la récupération des produits et catégories :", error);
        res.status(500).send("Erreur serveur");
    }
};


exports.AddProductForm = async (req, res) => {
    const categories = await Category.find({})
    res.render("addProducts", {categories});
};

exports.CreateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category_id: req.body.category_id
        });

        await newProduct.save();
        res.status(200).redirect('/shop/admin/products');
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message });
    }
};

exports.UpdateProduct = async (req, res) => {
    try {
        const findProductandUpdate = await Product.findByIdAndUpdate(
        req.params.id,
            req.body,     
            { new: true, runValidators: true }
        );
        if (!findProductandUpdate) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(303).redirect('/shop/admin/products');
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.DeleteProduct = async (req, res) => {
    try {
        const findProductandDelete = await Product.findByIdAndDelete(
            req.params.id,
            req.body,     
            { new: true, runValidators: true }
        );

        if (!findProductandDelete) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(303).redirect('/shop/admin/products');
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.CreateCategoryForm = async (req, res) => {
    res.render("createCategory");
};

exports.CreateCategory = async (req, res) => {

    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const newCategory = new Category({
        category_name: req.body.category_name
    });
    try {
        await newCategory.save();
        res.status(200).redirect('/shop/admin/category');
    } catch (err) {
        console.error("Erreur MongoDB :", err);
        res.status(500).json({ error: 'Erreur serveur', message: err.message });
    }
};
