// user registration and login controllers
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(400).json({ message: "Invalid password" });
    }
    jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json({ message: "Login successful", user, token });
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Server error" });
  }
};

const UserRegistery = async (req, res) => {
  try {
    const { name, email, password, gender, phone_number, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userchecker = await User.findOne({ email });
    if (userchecker) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      gender,
      phone_number,
      address,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  UserLogin,
  UserRegistery,
};
