const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
});

categorySchema.plugin(autoIncrement, { inc_field: 'categoryId', start_seq: 1 });

// Validation avec Joi
function validateCategory(category) {
    const schema = Joi.object({
        category_name: Joi.string().min(1).max(500).required(),
    });
    return schema.validate(category);
}

const Category = mongoose.model('Categories', categorySchema);

module.exports = {
    Category,
    validateCategory,
};
