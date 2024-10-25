import Room from "../models/room.js";
import Booking from "../models/booking.js";
// import { sendEmail } from "./mailer.js"; // Import the email function (commented out)

export async function createBooking(req, res) {
    const { userEmail, roomId, guests, checkInDate, checkOutDate } = req.body;
    const user = req.user;

    try {
        // Validate check-in and check-out dates
        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "Check-in and check-out dates are required" });
        }

        const checkIn = new Date(checkInDate);
        const now = new Date();

        // Check if check-in date is in the past
        if (checkIn < now) {
            return res.status(400).json({ message: "Check-in date cannot be in the past" });
        }

        // Find the room
        const room = await Room.findById(roomId).populate("category");
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Validate guest count and duration
        if (guests > room.maxGuests) {
            return res.status(400).json({ message: `Room only accommodates up to ${room.maxGuests} guests` });
        }

        const checkOut = new Date(checkOutDate);
        if (checkOut <= checkIn) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }

        const numberOfDays = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        const totalPrice = numberOfDays * room.category.price;

        // Create the booking with admin approval pending
        const newBooking = new Booking({
            user: user._id,
            userEmail,
            room: room._id,
            guests,
            checkInDate,
            checkOutDate,
            totalPrice,
            adminApproval: false,
        });

        await newBooking.save();
        res.status(201).json({
            message: "Booking created successfully. Waiting for admin approval.",
            booking: newBooking,
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Failed to create booking", error: error.message });
    }
}

// Approve a booking (Admin Only)
export async function approveBooking(req, res) {
    const { bookingId } = req.params;
    const user = req.user;

    if (user.type !== "admin") {
        return res.status(403).json({ message: "Only admin can approve bookings" });
    }

    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, { adminApproval: true, status: 'confirmed' }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send approval email
        /*
        await sendEmail(booking.userEmail, "Booking Approved", "Your booking has been approved.");
        */

        res.json({ message: "Booking approved successfully", booking });
    } catch (error) {
        console.error("Error approving booking:", error);
        res.status(500).json({ message: "Failed to approve booking", error: error.message });
    }
}

// Cancel booking with cancellation reason
export async function cancelBooking(req, res) {
    const user = req.user;
    const { bookingId } = req.params;
    const { cancellationReason } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (user.type !== "admin" && booking.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You do not have permission to cancel this booking" });
        }

        booking.status = "canceled";
        booking.cancellationReason = cancellationReason;
        await booking.save();

        // Send cancellation email
        /*
        await sendEmail(booking.userEmail, "Booking Canceled", `Your booking has been canceled. Reason: ${cancellationReason}`);
        */

        res.json({ message: "Booking canceled successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to cancel booking", error: error.message });
    }
}

// Get bookings for a specific user (e.g., for viewing their booking history)
export async function getBookingsByUser(req, res) {
    const user = req.user;

    try {
        const bookings = await Booking.find({ user: user._id }).populate("room");
        res.json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve bookings", error: error.message });
    }
}

// Admin: Get all bookings
export async function getAllBookings(req, res) {
    const user = req.user;

    if (user.type !== "admin") {
        return res.status(403).json({ message: "Only admin can view all bookings" });
    }

    try {
        const bookings = await Booking.find().populate("user room");
        res.json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve bookings", error: error.message });
    }
}

// Get a booking by ID
export async function getBookingById(req, res) {
    const { bookingId } = req.params; // Extract booking ID from request parameters

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId).populate("user room");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve booking", error: error.message });
    }
}
