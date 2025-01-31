const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    createdAt: { type: Date, default: Date.now },
});

productSchema.plugin(autoIncrement, { inc_field: 'productId', start_seq: 1 });

// Validation avec Joi
function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        price: Joi.number().positive().required(),
        description: Joi.string().max(500),
        category_id: Joi.string().hex().length(24).required(), // Validation d'un ObjectId

    });
    return schema.validate(product);
}

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    validateProduct,
};
