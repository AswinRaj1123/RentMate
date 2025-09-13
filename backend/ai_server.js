import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cosineSimilarity from "cosine-similarity";

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://aswinraj868_db_user:4MIltIc2G4onDB2j@rentmate.wtblwkg.mongodb.net/?retryWrites=true&w=majority&appName=RentMate";
// -------------------- DB Connection --------------------
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// -------------------- Schema --------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  budget: Number,
  location: String,
  sleep_schedule: String,
  cleanliness: Number,
  food: String,
  social_level: Number,
});
const User = mongoose.model("User", userSchema);

// -------------------- Helper Function --------------------
function encodeUser(user) {
  return [
    user.budget,
    user.cleanliness,
    user.social_level,
    user.sleep_schedule === "early" ? 1 : 0,
    user.food === "veg" ? 1 : 0,
  ];
}

// -------------------- API Endpoints --------------------

// 1. Register User
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "✅ User created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to create user" });
  }
});

// 2. Get Roommate Recommendations
app.get("/api/recommend/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    const targetVec = encodeUser(targetUser);
    const candidates = await User.find({ _id: { $ne: userId } });

    if (candidates.length === 0) {
      return res.json({ message: "No candidates available" });
    }

    // Debug log
    console.log("Target vector:", targetVec);
    console.log("Candidates:", candidates);

    const scored = candidates
      .filter(c =>
        typeof c.budget === "number" &&
        typeof c.cleanliness === "number" &&
        typeof c.social_level === "number" &&
        typeof c.sleep_schedule === "string" &&
        typeof c.food === "string"
      )
      .map((c) => {
        const score = cosineSimilarity(targetVec, encodeUser(c));
        const safeScore = typeof score === "number" && !isNaN(score) ? score : 0;
        return {
          name: c.name,
          budget: c.budget,
          location: c.location,
          compatibilityScore: Number(safeScore.toFixed(2)),
        };
      });

    scored.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json({ recommendations: scored.slice(0, 3) });
  } catch (err) {
    console.error("Recommend API error:", err);
    res.status(500).json({ error: "❌ Failed to fetch recommendations" });
  }
});

// -------------------- Start Server --------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));