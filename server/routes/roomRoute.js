const express = require('express');
const router = express.Router();
const { getAllRooms, getRoom, createRoom, deleteRoom, updateRoom } = require('../controllers/roomController');

// GET ALL ROOMS
router.get('/', getAllRooms);

// GET ROOM BY ID
router.get('/:id', getRoom);

// CREATE ROOM
router.post('/', createRoom )

//DELETE EXISTING ROOM
router.delete('/:id', deleteRoom)

//UPDATE ROOM
router.put('/:id', updateRoom)

module.exports = router;