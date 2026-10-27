
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) =>
    console.log("MongoDB connection failed:", err.message)
  );

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// API to submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error storing feedback",
    });
  }
});

// API to get all feedback
app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      submittedAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving feedback",
    });
  }
});

// Start the server after MongoDB connects
const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
