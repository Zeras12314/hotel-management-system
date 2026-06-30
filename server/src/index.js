const express = require("express");
const cors = require("cors");
const roomRoute = require("../routes/roomRoute");
const userRoute = require("../routes/userRoute");
const guestRoute = require("../routes/guestRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/guest", guestRoute);

app.get("/login", (req, res) => {
  res.json("login");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((error) => console.log(error.message));

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on Port: ${port}`));
}
