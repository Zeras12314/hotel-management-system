const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://chickentaba01:EuTu2XiQsURoSsk9@cluster0.rbvedxm.mongodb.net/HotelManagement?retryWrites=true&w=majority&appName=Cluster0"
);

connect
  .then(() => {
    console.log("MongoDB Successfully Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

  const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  }, {collection: 'userData'});

  const collection = new mongoose.model('userData', LoginSchema);
  module.exports = collection;
