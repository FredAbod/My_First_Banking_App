const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
     unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    role: {
      type: String,
      enum:["user","admin"],
      default: "user",
    },
  },
  {
    collection: "user_info",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
