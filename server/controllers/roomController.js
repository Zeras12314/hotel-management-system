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

// CREATE NEW ROOM
const createRoom = async(req, res) => {
  try {
    const extistingRoom = await RoomData.findOne({roomNumber: req.body.roomNumber});
    if (extistingRoom) {
      return res.status(400).json({message: "Room number already exists"});
    }
    const room = await RoomData.create(req.body);
    res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Eror(error.message)
  }
}

// DEELETE EXISTING ROOM
const deleteRoom = async(req, res) => {
  try {
    const { id } = req.params;
     // Validate the ID format (optional, but recommended for added safety)
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const room = await RoomData.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json(`cannot find any room with ID ${id}`)
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message) 
  }
}

// UPDATE ROOM BY ID
const updateRoom = async(req, res) => {
  try {
    const { id } = req.params;
     // Validate the ID format (optional, but recommended for added safety)
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const room = await RoomData.findByIdAndUpdate(id, req.body);
    if (!room) {
      return res.status(404).json(`cannot find any room with ID ${id}`)
    }

    const updateRoom = await RoomData.findById(id);
    res.status(200).json(updateRoom);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}

module.exports = {
  getAllRooms, getRoom, createRoom, deleteRoom, updateRoom
};
