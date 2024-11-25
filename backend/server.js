const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Pass_Man_DB";

app.use(bodyParser.json());
app.use(cors());

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
})();

app.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error retrieving data");
  }
});

app.post("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.insertOne(req.body);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

app.put("/", async (req, res) => {
  try {
    const { id, site, username, password } = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.updateOne(
      { id },
      { $set: { site, username, password } }
    );
    res.json({ success: result.modifiedCount > 0 });
  } catch (err) {
    res.status(500).send("Error updating data");
  }
});

app.delete("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.deleteOne({ id: req.body.id });
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send("Error deleting data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
