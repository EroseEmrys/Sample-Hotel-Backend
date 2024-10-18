import mongoose from "mongoose";

const galleryItemSchema = mongoose.Schema({
  name: {
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
