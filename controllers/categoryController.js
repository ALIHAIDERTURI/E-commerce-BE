const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

//create Category

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new category
    const newCategory = new Category({
      name,
      description,
    });

    // Save the new category to the database
    await newCategory.save();

    // Respond with success message and the created category
    res.status(201).json({
      success: true,
      message: 'New Category Added',
      category: newCategory,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//get category by param using regex

exports.getCategories = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const regex = new RegExp(searchQuery, "i");

    const categories = await Category.find({ name: regex });

    res.status(200).json({
      success: true,
      count: categories.length,
      Category: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//updated category
exports.updateCategory = async (req, res) => {
  try {
    const { id, name } = req.params; // Get the category ID from the request parameters
    // const { name } = req.params; // Get the  name from the req params
    const { newName } = req.body; //Get the updated name from the request body

    let updatedCategory;

    if (id) {
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid category ID" });
      }
      // Find the category by ID and update it with the new data
      updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name: newName }, // Use regex or the plain name
        { new: true, runValidators: true } // Return the updated document and run validation
      );
    } else if (name) {
      // Optionally, if you want to use regex for the name update
      const regex = new RegExp(name, "i");

      // Find the category by ID and update it with the new data
      updatedCategory = await Category.findOneAndUpdate(
        { name: regex }, // Use regex or the plain name
        { name: newName }, //updating new name
        { new: true, runValidators: true } // Return the updated document and run validation
      );
    } else {
      return res
        .status(400)
        .json({ success: false, error: "No valid identifier provided" });
    }

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// delete category

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      Category: {
        name: deletedCategory.name,
        description: deletedCategory.description,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
