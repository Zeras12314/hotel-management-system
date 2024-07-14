const express = require('express');
const router = express.Router();
const { getAllRooms, getRoom } = require('../controllers/roomController');

// GET ALL ROOMS
router.get('/', getAllRooms);

// GET ROOM BY ID
router.get('/:id', getRoom)

module.exports = router;