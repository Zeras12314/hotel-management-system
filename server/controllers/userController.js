const bcrypt = require('bcrypt');
const UserData = require('../models/userModel')

const signup = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };

    //check if the user already exists in database
    const existingUser = await UserData.findOne({ username: data.username });
    if (existingUser) {
      res
        .status(500)
        .json("User already exists. Please choose a different username.");
    } else {
      // hash the password using bcrypt
      const saltRounds = 10; // Number of salt round for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; // Replace the hash password with original password

      const userdata = await UserData.create(data);
      res.status(200).json(userdata);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};


const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserData.findOne({ username: username });
  
      if (!user) {
        return res.status(404).json({ message: "username doesnt exist" });
      }
  
      // compare the hash password from the database with the plain text
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (isPasswordMatch) {
        return res.status(200).json({ message: "Successfully logged in" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports = { signup, login };