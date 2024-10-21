import Feedback from "../models/feedback.js";

export function createFeedback(req, res) {
    const { userId, roomId, comment } = req.body; // Ensure these are sent in the request body

    const feedback = new Feedback({
        user: userId,
        room: roomId,
        comment
    });

    feedback
        .save()
        .then(() => {
            res.json({ message: "Feedback submitted successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to submit feedback", error: error.message });
        });
}

export function approveFeedback(req, res) {
    const user = req.user; // Middleware should provide the authenticated user

    if (!user || user.type !== "admin") {
        return res.status(403).json({ message: "Only Admin can approve feedback" });
    }

    const { feedbackId } = req.params;

    Feedback.findByIdAndUpdate(feedbackId, { isApproved: true }, { new: true })
        .then((feedback) => {
            if (!feedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.json({ message: "Feedback approved successfully", feedback });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to approve feedback", error: error.message });
        });
}

export function getAllFeedback(req, res) {
    Feedback.find()
        .populate('user') // Populate user information
        .populate('room') // Populate room information
        .then((feedbacks) => {
            res.json({ feedbacks });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve feedback", error: error.message });
        });
}
