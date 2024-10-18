import Category from "../models/category.js";

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

export function getCategories(req, res) {
  Category.find()
    .then((categories) => {
      res.json({
        categories: categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to retrieve categories",
        error: error.message,
      });
    });
}
