import express from 'express';
import { createRoom, getRoomById, disableRoom, activateRoom } from '../controllers/roomController.js';

const roomRouter = express.Router();

// Route for creating a room
roomRouter.post('/', createRoom);

// Route for getting a room by ID
roomRouter.get('/:roomId', getRoomById);

// Route for disabling a room
roomRouter.patch('/:roomId/disable', disableRoom);

export default roomRouter;

roomRouter.patch('/:roomId/activate', activateRoom);