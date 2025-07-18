const MasHistory = require("../models/MasHistory");

class MasHistoryController {
  // POST /api/mas-history/save
  static async saveMasHistory(req, res) {
    try {
      const { user_name, query, detailed_results } = req.body;

      const confidence_score = detailed_results?.[0]?.confidence_score;

      // Check if a document with same user, query, and confidence already exists
      const duplicate = await MasHistory.findOne({
        user_name,
        "detailed_results.confidence_score": confidence_score,
        // optional: if you store query as a field too (add to schema)
        query: query,
      });

      if (duplicate) {
        console.log("⚠️ Duplicate entry found. Skipping save.");
        return res.status(200).json({ message: "Duplicate entry. Not saved." });
      }

      // If not duplicate, save it
      const newEntry = new MasHistory(req.body);
      await newEntry.save();
      res.status(201).json({ message: "MAS history saved successfully" });
    } catch (error) {
      console.error("Error saving MAS history:", error);
      res.status(500).json({ error: "Failed to save MAS history" });
    }
  }

  // POST /api/mas-history/check-if-exists
  static async checkIfExists(req, res) {
    try {
      const { user_name, input_document, query } = req.body;

      const existing = await MasHistory.findOne({
        user_name,
        input_document,
        query,
      });

      if (existing) {
        res.status(200).json({ exists: true, result: existing });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (err) {
      console.error("Error checking MAS history:", err);
      res.status(500).json({ error: "Check failed" });
    }
  }

  // GET /api/mas-history/all
  static async getAllHistory(req, res) {
    try {
      const entries = await MasHistory.find().sort({ generated_at: -1 });
      res.status(200).json(entries);
    } catch (error) {
      console.error("Error fetching MAS history:", error);
      res.status(500).json({ error: "Failed to fetch MAS history" });
    }
  }

  // GET /api/mas-history/user/:user_name
  static async getHistoryByUser(req, res) {
    const { user_name } = req.params;
    // console.log(user_name);
    try {
      const entries = await MasHistory.find({ user_name }).sort({
        generated_at: -1,
      });
      // console.log(entries);
      res.status(200).json(entries);
    } catch (error) {
      console.error("Error fetching history for user:", error);
      res.status(500).json({ error: "Failed to fetch MAS history for user" });
    }
  }
  static async deleteMasHistoryById(req, res) {
    try {
      const { id } = req.params;
      const result = await MasHistory.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting MAS history entry:", error);
      res.status(500).json({ error: "Failed to delete MAS history entry" });
    }
  }
}

module.exports = MasHistoryController;
