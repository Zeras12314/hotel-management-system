const express = require("express");
const router = express.Router();
const { getAllGuests, createGuest, getGuest, deleteGuest, updateGuest } = require("../controllers/guestController");

// GET ALL GUEST
router.get("/", getAllGuests);

// GET GUEST BY ID
router.get("/:id", getGuest);

// CREATE GUEST
router.post("/", createGuest);

// DELETE GUEST
router.delete("/:id", deleteGuest);

// UPDATE GUEST
router.put("/:id", updateGuest);



module.exports = router;
