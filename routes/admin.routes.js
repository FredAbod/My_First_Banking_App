const express = require("express");
const {
  adminSignUp,
  adminLogin,
  getAllUsers,
  getAllWallets,
  getUserWallets,
  getAllTransactions,
  getDebitTransactions,
  getCreditTransactions,
} = require("../controllers/admin.controllers");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router.post("/signup", adminSignUp);
router.post("/login", adminLogin);
router.get("/getallusers", getAllUsers);
router.get("/getallwallets", getAllWallets);
router.get("/getuserwallets",isAuth, getUserWallets);
router.get("/getalltransactions",isAuth, getAllTransactions);
router.get("/getdebittransactions",isAuth, getDebitTransactions);
router.get("/getcredittransactions",isAuth, getCreditTransactions);

module.exports = router;
