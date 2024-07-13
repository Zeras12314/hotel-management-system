const express = require('express');
const router = express.Router();
const { getAllRooms } = require('../controllers/roomController');

// get all rooms
router.get('/', getAllRooms);

module.exports = router;