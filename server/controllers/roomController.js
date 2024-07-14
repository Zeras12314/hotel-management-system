const RoomData = require("../models/roomModel");
const mongoose = require('mongoose')

// GET ALL ROOMS
const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomData.find({});
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ROOM BY ID
const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the ID format (optional, but recommended for added safety)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const room = await RoomData.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

module.exports = {
  getAllRooms, getRoom
};
