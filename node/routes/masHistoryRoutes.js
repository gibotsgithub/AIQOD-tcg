const express = require("express");
const router = express.Router();
const MasHistoryController = require("../controller/masHistoryController");

// Save MAS history
router.post("/save", MasHistoryController.saveMasHistory);

// Get all MAS history
router.get("/all", MasHistoryController.getAllHistory);

// Get MAS history by user_name
router.get("/user/:user_name", MasHistoryController.getHistoryByUser);

// Check if MAS history exists
router.post("/check-if-exists", MasHistoryController.checkIfExists);

router.delete('/:id', MasHistoryController.deleteMasHistoryById);

module.exports = router;
