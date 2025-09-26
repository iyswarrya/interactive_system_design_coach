
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow React frontend (localhost:3000)
app.use(cors({
  origin: "http://localhost:3000", // React dev server
  methods: ["GET", "POST", "OPTIONS"], // Allow preflight
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Dummy expected requirements
const expectedRequirements = {
  "Design a URL Shortener like Bitly": [
    "shorten long URLs",
    "redirect to original URL",
    "track click analytics"
  ],
  "Design a File Storage System like Google Drive": [
    "upload/download files",
    "folder structure",
    "share files with users"
  ]
};

// POST endpoint to validate requirements
app.post("/validate", (req, res) => {
  const { question, requirements } = req.body;
  res.json({ message: "CORS test OK" });

  if (!question || !requirements) {
    return res.status(400).json({ message: "Missing question or requirements." });
  }

  const userReqs = requirements
    .split("\n")
    .map(r => r.trim().toLowerCase())
    .filter(r => r.length > 0);

  const expected = expectedRequirements[question] || [];

  const matched = expected.filter(req =>
    userReqs.some(userReq => userReq.includes(req))
  );
  const missing = expected.filter(req => !matched.includes(req));

  const score = expected.length
    ? ((matched.length / expected.length) * 100).toFixed(0)
    : 0;

  res.json({
    message: `You matched ${matched.length} of ${expected.length} requirements (${score}%)`,
    matchedRequirements: matched,
    missingRequirements: missing
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
