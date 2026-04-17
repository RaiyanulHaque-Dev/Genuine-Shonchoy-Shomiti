import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. HIGH-PRIORITY CORS (Your exact Vercel URL)
app.use(cors({
  origin: "https://genuine-shonchoy-shomiti.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// 2. API ROUTES
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@shomiti.com" && password === "admin123") {
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, user: { email, role: "admin" } });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// 3. SERVE FRONTEND (This handles the 'dist' folder on Railway)
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// 4. SPA CATCH-ALL
// If a request isn't for an API, send the frontend index.html
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(distPath, "index.html"));
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
