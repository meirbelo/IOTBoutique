const { Product, validateProduct } = require('../models/product.model');
const { Category, validateCategory } = require('../models/category.model');

exports.GetAllProduct =async (req, res) => {
    // Jointure avec la collection Categories
    let products = await Product.find().populate("category_id", "category_name"); 
    res.render("products", { products });;
}

exports.GetIdProduct = async (req, res) => {
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

exports.CreateProductForm = async (req, res) => {
    const categories = await Category.find({})
    res.render("createProduct", {categories});
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
        res.status(200).redirect('/shop');
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message });
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
        res.status(200).redirect('/shop/admin/add/product');
    } catch (err) {
        console.error("Erreur MongoDB :", err);
        res.status(500).json({ error: 'Erreur serveur', message: err.message });
    }
};
