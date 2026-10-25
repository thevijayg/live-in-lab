import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌾 AGRINOVA Smart Agriculture Backend Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌱 Pilot Regions: Tamil Nadu & Maharashtra`);
  console.log(`📊 Mode: REST API & Pilot Simulation Engine`);
  console.log(`====================================================`);
});
