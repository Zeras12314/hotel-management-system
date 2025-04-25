const express = require("express");
const cors = require("cors");
const roomRoute = require("../routes/roomRoute");
const userRoute = require("../routes/userRoute");
const guestRoute = require("../routes/guestRoute");
const mongoose = require("mongoose");

const app = express();

const port = 4000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/guest", guestRoute);

app.get("/login", (req, res) => {
  res.json("login");
});

const connect = mongoose.connect(
  "mongodb+srv://chickentaba01:EuTu2XiQsURoSsk9@cluster0.rbvedxm.mongodb.net/HotelManagement?retryWrites=true&w=majority&appName=Cluster0"
);

connect
  .then(() => {
    console.log("MongoDB Successfully Connected");
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
