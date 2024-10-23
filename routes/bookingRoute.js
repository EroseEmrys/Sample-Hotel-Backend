import express from 'express';
import { createBooking, cancelBooking, getBookingsByUser, getAllBookings } from '../controllers/bookingController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js'; // Ensure user is authenticated

const bookingRouter = express.Router();

// Routes for booking
bookingRouter.post('/', authenticateUser, createBooking); // Make a booking
bookingRouter.patch('/:bookingId/cancel', authenticateUser, cancelBooking); // Cancel a booking

// User's own bookings
bookingRouter.get('/myBookings', authenticateUser, getBookingsByUser); // View your bookings

// Admin routes
bookingRouter.get('/all', authenticateUser, getAllBookings); // Admin: View all bookings

export default bookingRouter;
