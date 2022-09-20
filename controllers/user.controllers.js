const User = require("../models/users.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      password: hash,
      role,
    });
    const new_user = await newUser.save();
    return res
      .status(201)
      .json({ message: "User added successfully", new_user: new_user._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "User Not Created" });
  }
};

exports.userLogin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    if (!name && password) {
      return res.status(400).json({ message: "Please Fill All Fields" });
    }
    const checkUser = await User.findOne({ name: name });
    if (!checkUser) {
      return res.status(404).json({ message: "User Not found" });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const payload = {
      _id: checkUser._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.cookie("access-token", token);
    return res
      .status(202)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};
