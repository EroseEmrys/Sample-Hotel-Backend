import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryByName,
  updateCategory, // Import the new updateCategory function
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Admin: Create a new category
categoryRouter.post("/", createCategory);

// Admin: Delete a category by ID
categoryRouter.delete("/:categoryId", deleteCategory);

// Admin: Update a category by ID
categoryRouter.put("/:categoryId", updateCategory); // New route for updating category

// Public: Get all categories
categoryRouter.get("/", getCategories);

// Public: Get a category by name
categoryRouter.get("/:name", getCategoryByName);

export default categoryRouter;
