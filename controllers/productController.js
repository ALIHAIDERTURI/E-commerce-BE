const Product = require('../models/productsModel');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');



// Create a product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, categoryId, stock } = req.body;
        const image = req.file ? req.file.filename : null; // Path to the uploaded image file

        // Optional: Validate if the category exists
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, error: 'Invalid category ID' });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            categoryId,
            stock,
            image,
        });

        await newProduct.save();

        // Generate a JWT token (if necessary for your use case)
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
            token: token // Include this only if necessary
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.listProducts = async (req, res) => {
    try {

        // Find products by category
        const products = await Product.find()
         .populate({
            path:'categoryId',
            select: 'name description'
         })
         const invalidProducts = await Product.find({ categoryId: { $exists: true, $eq: null } });
console.log(invalidProducts); // Should return empty if there are no null references

        res.status(200).json({
            success: true,
            products: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};
// Get products by category ID or category name
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId, categoryName } = req.query;

        let category;

        // If categoryId is provided, use it to find the category
        if (categoryId) {
            category = await Category.findById(categoryId);
        } 
        // If categoryName is provided, use it to find the category
        else if (categoryName) {
            category = await Category.findOne({ name: categoryName });
        }

        // If no category found, return an error
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Find products by category
        const products = await Product.find({ category: category._id });

        res.status(200).json({
            success: true,
            products: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(`received id ${id}`);
         
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid product ID' });
        }

        // Find the existing product by ID
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        
        const updateData = { ...req.body };


       // If a new file is uploaded, delete the old one
       if (req.file) {
        const oldImagePath = path.join(__dirname, '..', 'uploads/content', existingProduct.image); // Adjust the path according to your structure

        // Delete the old image file
        fs.unlink(oldImagePath, (err) => {
            if (err) {
                console.error('Error deleting old image:', err);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        // Update the image field with the new filename
        updateData.image = req.file.filename;
    }

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Delete a product( by passing id in json body)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// delete product by passing id in url(params)
exports.deleteProductBy_ID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

