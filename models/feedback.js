import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  message: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
