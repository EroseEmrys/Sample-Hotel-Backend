import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "customer",
  },
  whatsApp: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Change the model name here to "User"
const User = mongoose.model("User", userSchema);
export default User;
