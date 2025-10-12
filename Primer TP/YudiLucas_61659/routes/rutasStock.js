const express = require("express");
const {
  getAllStock,
  getOneStock,
  deleteStock,
  updateStock,
  createStock,
} = require("../controllers/stockController");

const router = express.Router();

