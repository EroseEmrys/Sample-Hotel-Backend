import Category from "../models/category.js";

// Admin Only: Create Category
export function createCategory(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Please Login First" });
  }

  if (user.type !== "admin") {
    return res.status(403).json({ message: "Only Admin can add Categories" });
  }

  const categoryData = req.body;
  const newCategory = new Category(categoryData);

  newCategory
    .save()
    .then(() => {
      res.json({
        message: "Category added successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add Category",
        error: error.message,
      });
    });
}

// Admin Only: Delete Category
export function deleteCategory(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Please Login First" });
  }

  if (user.type !== "admin") {
    return res.status(403).json({ message: "Only Admin can delete Categories" });
  }

  const categoryId = req.params.categoryId;

  Category.findByIdAndDelete(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({
        message: "Category deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete Category",
        error: error.message,
      });
    });
}

// Public: Get All Categories (accessible by both admin and users)
export function getCategories(req, res) {
  Category.find()
    .then((result) => {
      res.json({
        categories: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve categories",
        error: err.message,
      });
    });
}

// Public: Get Category By Name (accessible by both admin and users)
export function getCategoryByName(req, res) {
  const name = req.params.name;

  Category.findOne({ name: name })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({
        category: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve category by name",
        error: err.message,
      });
    });
}
