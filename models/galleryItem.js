import mongoose from "mongoose";

const galleryItemSchema = mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const GalleryItem = mongoose.model("GalleryItems", galleryItemSchema);
export default GalleryItem;
