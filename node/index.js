require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const pdfProxy = require("./routes/pdfProxy");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`🚀 Express server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

app.get("/db-info", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const dbName = db.databaseName;
    const collections = await db
      .listCollections({}, { nameOnly: true })
      .toArray();
    const collectionNames = collections.map((c) => c.name);

    console.log("📂 Connected to Database:", dbName);
    console.log("📄 Collections:");
    collectionNames.forEach((name) => console.log("  -", name));

    res.json({
      database: dbName,
      collections: collectionNames,
    });
  } catch (err) {
    console.error("❌ Error retrieving DB info:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/sample-data/:collectionName", async (req, res) => {
  const { collectionName } = req.params;

  try {
    const db = mongoose.connection.db;

    // Fetch first 10 documents for preview
    const sampleDocs = await db
      .collection(collectionName)
      .find()
      .limit(10)
      .toArray();

    res.json({
      collection: collectionName,
      count: sampleDocs.length,
      documents: sampleDocs,
    });
  } catch (err) {
    console.error(
      `❌ Failed to fetch data from ${req.params.collectionName}:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
});

app.get("/transaction-intelligence/:rm_id", async (req, res) => {
  const { rm_id } = req.params;

  try {
    const db = mongoose.connection.db;

    const matchingDocs = await db
      .collection("transaction_details") // fixed collection name
      .find({ RM_ID: rm_id }) // filter by RM_ID
      .toArray();

    res.json({
      collection: "transaction_details",
      count: matchingDocs.length,
      documents: matchingDocs,
    });
  } catch (err) {
    console.error(`❌ Failed to fetch data for RM_ID ${rm_id}:`, err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/customer_profile/:rm_id", async (req, res) => {
  const { rm_id } = req.params;

  try {
    const db = mongoose.connection.db;

    const matchingDocs = await db
      .collection("customer_profile") // fixed collection name
      .find({ RM_ID: rm_id })
      .limit(10) // filter by RM_ID
      .toArray();

    res.json({
      collection: "customer_profile",
      count: matchingDocs.length,
      documents: matchingDocs,
    });
  } catch (err) {
    console.error(`❌ Failed to fetch data for RM_ID ${rm_id}:`, err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/workflow-cards", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const matchingDocs = await db
      .collection("workflow_cards") // fixed collection name
      .find()
      .toArray();

    res.json({
      collection: "workflow_cards",
      count: matchingDocs.length,
      documents: matchingDocs,
    });
  } catch (err) {
    console.error(`❌ Failed to fetch data for RM_ID ${rm_id}:`, err);
    res.status(500).json({ error: err.message });
  }
});

connect();

const masHistoryRoutes = require("./routes/masHistoryRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
app.use("/api/mas-history", masHistoryRoutes);
app.use("/api", pdfProxy);
