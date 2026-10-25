import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Root informational endpoint
app.get("/", (req, res) => {
  res.json({
    brand: "AGRINOVA",
    tagline: "Sense the Field. Decide Intelligently. Grow Sustainably.",
    status: "Service Operational",
    apiDocumentation: "/api/health",
    pilotRegions: ["Tamil Nadu", "Maharashtra"],
    layers: ["Sense (IoT)", "Decide (Agricultural Intelligence)", "Finance (Digital Farm Profile & Readiness)"]
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal server error occurred",
      status: err.status || 500
    }
  });
});

export default app;
