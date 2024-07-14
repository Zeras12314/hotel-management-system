const express = require("express");
const cors = require("cors");
const roomRoute = require('../routes/roomRoute');
const userRoute = require('../routes/userRoute');

const app = express();

const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use('/api/room', roomRoute);
app.use('/api/user', userRoute );


app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
