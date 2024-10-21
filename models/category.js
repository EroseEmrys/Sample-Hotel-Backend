import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
