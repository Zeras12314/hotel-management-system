const GuestData = require("../models/guestModel");
const mongoose = require("mongoose");

//GET ALL GUESTS
const getAllGuests = async (req, res) => {
  try {
    const guest = await GuestData.find({});
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

// GET GUEST BY ID
const getGuest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invaid product ID" });
    }
    const guest = await GuestData.findById(id);
    res.status(200).json(guest);
  } catch {
    res.status(500);
    throw new Error(error.message);
  }
};

// CREATE GUEST
const createGuest = async (req, res) => {
  try {
    const guest = await GuestData.create(req.body);
    res.status(200).json(guest);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// DELETE GUEST
const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invaid product ID" });
    }
    const guest = await GuestData.findByIdAndDelete(id);
    if (!guest) {
      return res.status(404).json(`cannot find any guest with ID ${id}`);
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// UPDATE GUEST
const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invaid product ID" });
    }
    const guest = await GuestData.findByIdAndUpdate(id, req.body);
    if (!guest) {
      return res.status(404).json(`cannot find any guest with ID ${id}`);
    }

    const updateGuest = await GuestData.findById(id);
    res.status(200).json(updateGuest);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllGuests,
  createGuest,
  getGuest,
  deleteGuest,
  updateGuest
};
