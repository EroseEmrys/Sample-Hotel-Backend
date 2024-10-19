import express from "express";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import jwt, { decode } from "jsonwebtoken";

const app = express();

app.use(express.json());

const connectionString =
  "mongodb+srv://igpmax456:1235@cluster0.eqqwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use((req, res, next) => {
  if (req.path === "/api/users/login" || req.path === "/api/users") {
    return next();
  }

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      if (decoded) {
        req.user = decoded;
        next(); 
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB:");
  });

app.use("/api/users", userRouter);

app.use("/api/gallery", galleryItemRouter);

app.use("/api/categories", categoryRouter);

app.listen(5000, () => {
  console.log("Server is Running Suuda");
});
