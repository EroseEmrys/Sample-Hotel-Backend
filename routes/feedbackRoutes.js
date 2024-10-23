import express from 'express';
import { createFeedback, approveFeedback, getAllFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

// Route for creating feedback
feedbackRouter.post('/', createFeedback);

// Route for approving feedback
feedbackRouter.patch('/:feedbackId/approve', approveFeedback);

// Route for getting all feedback
feedbackRouter.get('/', getAllFeedback);

export default feedbackRouter;
