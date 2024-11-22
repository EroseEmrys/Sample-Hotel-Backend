import express from "express";
import {

  loginUser,
  postUsers,
  getUsers

} from "../controllers/userControllers.js";

const userRouter = express.Router();


userRouter.post("/", postUsers);
userRouter.post("/login",loginUser)
userRouter.get("/",getUsers);

export default userRouter;
