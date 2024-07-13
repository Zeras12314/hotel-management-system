const RoomData = require('../models/roomModel');

// get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomData.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






module.exports = {
    getAllRooms,
}