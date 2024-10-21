import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Fix the import statement
import dotenv from "dotenv";

dotenv.config();

export function postUsers(req, res) {
  const userData = req.body;
  const password = userData.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    // Use 10 for salt rounds
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to hash password" });
    }

    userData.password = hashedPassword;

    const newUser = new User(userData);

    newUser
      .save()
      .then(() => {
        res.json({
          message: "User Saved Successfully",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "User Save Failed",
          error: error.message,
        });
      });
  });
}

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email })
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      bcrypt.compare(credentials.password, user.password, (err, match) => {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (!match) {
          return res.status(404).json({ message: "Invalid credentials" });
        }

        const payLoad = {
          id: user._id,
          email: user.email,
          type: user.type,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          message: "User Found",
          user: user,
          token: token,
        });
      });
    })
    .catch((error) => {
      console.error(error); // Log any errors that occur during the query
      res.status(500).json({ message: "Error fetching user" });
    });
}
