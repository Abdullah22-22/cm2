const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the user
    email: { type: String, required: true, unique: true }, // Unique username for login
    password: {
      type: String,
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    phone_number: { type: String, required: true }, // Contact phone number
    gender: { type: String, required: true }, // Gender of the user
    address: {
      street: { type: String, required: false }, // Street address
      city: { type: String, required: false }, // City
      zipCode: { type: String, required: false }, // Postal/ZIP code
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("User", userSchema);