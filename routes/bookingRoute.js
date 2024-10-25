// routes/bookingRoute.js
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js'; // Ensure there's no duplicate
import {
    createBooking,
    cancelBooking,
    getBookingsByUser,
    getAllBookings,
    approveBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

// Protecting the routes with the authentication middleware
router.post('/bookings', authenticateUser, createBooking);
router.delete('/bookings/:bookingId', authenticateUser, cancelBooking);
router.get('/bookings/user', authenticateUser, getBookingsByUser);
router.get('/bookings', authenticateUser, getAllBookings);
router.put('/bookings/approve/:bookingId', authenticateUser, approveBooking); // Use PUT or PATCH consistently

export default router;
