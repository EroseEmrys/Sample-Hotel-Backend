import express from "express";
import { createCategory,getCategories } from "../models/categoryController";
const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

categoryRouter.get("/", getCategories);

export default categoryRouter;