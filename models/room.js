import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  uniqueNumber: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  maxGuests: { type: Number, required: true },
  photos: [{ type: String }],
  specialDescription: { type: String },
  isDisabled: { type: Boolean, default: false },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
