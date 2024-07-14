const RoomData = require('../models/roomModel');

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


module.exports = {
    getAllRooms,
}