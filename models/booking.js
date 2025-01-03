import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
    adminApproval: {
        type: Boolean,
        default: false,
    },
    cancellationReason: {
        type: String,
        default: '',
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
