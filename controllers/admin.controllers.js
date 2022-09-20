const User = require("../models/users.models");
const Transactions = require("../models/transactions");
const Wallets = require('../models/wallets');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.adminSignUp = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;
    if (!(password && name && role)) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newAdmin = new User({
      name,
      password: hash,
      role,
    });
    const new_Admin = await newAdmin.save();
    return res
      .status(201)
      .json({ message: "Admin added successfully", new_Admin: new_Admin._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Admin Not Created" });
  }
};

exports.adminLogin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    if (!name && password) {
      return res.status(400).json({ message: "Please Fill All Fields" });
    }
    const checkAdmin = await User.findOne({ name: name });
    if (!checkAdmin) {
      return res.status(404).json({ message: "Admin Not found" });
    }
    if (checkAdmin.role != "admin") {
        return res.status(400).json({ message: "You're not an admin"});
    }
    const checkPassword = await bcrypt.compare(password, checkAdmin.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const payload = {
      _id: checkAdmin._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.cookie("access-token", token);
    return res
      .status(202)
      .json({ message: "Admin logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({role:"user"});
    return res.status(200).json({
      allUsersData: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
exports.getAllWallets = async (req, res, next) => {
  try {
    const allWallets = await Wallets.find();
    return res.status(200).json({
      allWalletsData: allWallets.length,
      data: allWallets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
exports.getUserWallets = async (req, res, next) => {
  try {
    const id = req.user._id;
    const allWallets = await Wallets.find({userId: id});
    return res.status(200).json({
      allWalletsData: allWallets.length,
      data: allWallets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
exports.getAllTransactions = async (req, res, next) => {
  try {
    const allTransactions = await Transactions.find();
    return res.status(200).json({
      allTransactionsData: allTransactions.length,
      data: allTransactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
exports.getDebitTransactions = async (req, res, next) => {
  try {
    const allDebitTransactions = await Transactions.find({trnxType: "DR"});
    return res.status(200).json({
      allTransactionsData: allDebitTransactions.length,
      data: allDebitTransactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
exports.getCreditTransactions = async (req, res, next) => {
  try {
    const allDebitTransactions = await Transactions.find({trnxType: "CR"});
    return res.status(200).json({
      allTransactionsData: allDebitTransactions.length,
      data: allDebitTransactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


