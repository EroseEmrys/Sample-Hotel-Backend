import Room from "../models/room.js";

export function createRoom(req, res) {
  const user = req.user; // Middleware should provide the authenticated user

  if (!user || user.type !== "admin") {
    return res.status(403).json({ message: "Only Admin can add Rooms" });
  }

  const roomData = req.body;
  const newRoom = new Room(roomData);

  newRoom
    .save()
    .then(() => {
      res.json({ message: "Room added successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to add Room", error: error.message });
    });
}

export function getRoomById(req, res) {
    const { roomId } = req.params;
  
    Room.findById(roomId)
      .then((room) => {
        if (!room) {
          return res.status(404).json({ message: "Room not found" });
        }
        res.json({ room });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error fetching room" });
      });
  }
 
  export function disableRoom(req, res) {
    const user = req.user; // Middleware should provide the authenticated user
  
    if (!user || user.type !== "admin") {
      return res.status(403).json({ message: "Only Admin can disable Rooms" });
    }
  
    const { roomId } = req.params;
  
    Room.findByIdAndUpdate(roomId, { isDisabled: true })
      .then((room) => {
        if (!room) {
          return res.status(404).json({ message: "Room not found" });
        }
        res.json({ message: "Room disabled for maintenance" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to disable Room", error: error.message });
      });
  }

  export function activateRoom(req, res) {
    const user = req.user; // Middleware should provide the authenticated user

    if (!user || user.type !== "admin") {
        return res.status(403).json({ message: "Only Admin can activate Rooms" });
    }

    const { roomId } = req.params;

    Room.findByIdAndUpdate(roomId, { isDisabled: false }, { new: true }) // { new: true } returns the updated document
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.json({ message: "Room activated successfully", room });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to activate Room", error: error.message });
        });
}
