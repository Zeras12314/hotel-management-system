const mongoose = require("mongoose");

const RoomCategoryEnum = ["Single", "Double", "Suite"];

const roomDataSchema = mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Please enter a room number"],
    },
    category: {
      type: String,
      enum: RoomCategoryEnum,
      required: [true, "Please enter a room category"],
    },
    capacity: {
      type: Number,
      required: false,
    },
    pricePerNight: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'roomData'
  }
);

const RoomData = mongoose.model("roomData", roomDataSchema);

module.exports = RoomData;