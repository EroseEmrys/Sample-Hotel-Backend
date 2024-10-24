import Room from "../models/room.js";
import Category from "../models/category.js";
import Booking from "../models/booking.js";

export async function createBooking(req, res) {
    // ... previous code ...
    try {
        // Validate check-in and check-out dates
        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "Check-in and check-out dates are required" });
        }

        // Find the room
        const room = await Room.findById(roomId).populate("category");
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Validate guest count
        if (guests > room.maxGuests) {
            return res.status(400).json({ message: `Room only accommodates up to ${room.maxGuests} guests` });
        }

        // Validate stay duration
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        if (checkOut <= checkIn) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }

        const numberOfDays = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        if (isNaN(numberOfDays) || numberOfDays <= 0) {
            return res.status(400).json({ message: "Invalid stay duration" });
        }

        // Calculate total price
        const totalPrice = numberOfDays * room.category.price;
        if (isNaN(totalPrice)) {
            return res.status(500).json({ message: "Failed to calculate total price" });
        }

        // Create the booking
        const newBooking = new Booking({
            user: user._id,
            room: room._id,
            guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Failed to create booking", error: error.message });
    }
}


// Cancel a booking
export async function cancelBooking(req, res) {
  const user = req.user;
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only allow admin or the user who made the booking to cancel it
    if (
      user.type !== "admin" &&
      booking.user.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You do not have permission to cancel this booking" });
    }

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to cancel booking", error: error.message });
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
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
}

// Admin: Get all bookings
export async function getAllBookings(req, res) {
  const user = req.user;

  if (user.type !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admin can view all bookings" });
  }

  try {
    const bookings = await Booking.find().populate("user room");
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
}
