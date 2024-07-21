const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "userData",
  }
);

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
