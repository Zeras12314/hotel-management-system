require("mongoose-type-email");
const mongoose = require("mongoose");

const guestDataSchema = mongoose.Schema(
    {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
},
{
    timestamps: true,
    collection: 'guestData'
});

const GuestData = mongoose.model("guestData", guestDataSchema);
module.exports = GuestData;
