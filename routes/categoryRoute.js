import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryByName
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

categoryRouter.delete("/:categoryId", deleteCategory);

categoryRouter.get("/",getCategories)
categoryRouter.get("/:name",getCategoryByName)

export default categoryRouter;
