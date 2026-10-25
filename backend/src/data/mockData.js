// Realistic demonstration datasets for AGRINOVA pilot regions: Tamil Nadu & Maharashtra
// NOTE: Clearly labeled as demo data. Coordinates and values are illustrative.

export const initialFarms = [
  {
    id: "FARM-TN-001",
    name: "Kongu Green Farms",
    farmerName: "Murugan Selvam",
    state: "Tamil Nadu",
    district: "Coimbatore",
    village: "Thondamuthur",
    area: 6.5,
    areaUnit: "Acres",
    soilType: "Red Sandy Loam",
    irrigationType: "Precision Drip",
    mainCrop: "Cotton (Bt Hybrid)",
    registrationDate: "2025-08-15",
    healthStatus: "Optimal",
    healthScore: 88,
    dataCompleteness: 92,
    coordinates: { lat: 10.9984, lng: 76.8450 },
    notes: "Demonstration site for sensor-guided precision drip irrigation."
  },
  {
    id: "FARM-TN-002",
    name: "Cauvery Delta Agri Heritage",
    farmerName: "Kavitha Rajendran",
    state: "Tamil Nadu",
    district: "Thanjavur",
    village: "Papanasam",
    area: 4.8,
    areaUnit: "Acres",
    soilType: "Alluvial Clay Loam",
    irrigationType: "Controlled Canal & Alternate Wetting",
    mainCrop: "Paddy (CR 1009)",
    registrationDate: "2025-09-02",
    healthStatus: "Attention Needed",
    healthScore: 68,
    dataCompleteness: 85,
    coordinates: { lat: 10.9250, lng: 79.2810 },
    notes: "AWD water-saving trial in delta canal irrigation command."
  },
  {
    id: "FARM-MH-001",
    name: "Sahyadri Valley Horticulture",
    farmerName: "Sanjay Balasaheb Deshmukh",
    state: "Maharashtra",
    district: "Nashik",
    village: "Dindori",
    area: 8.2,
    areaUnit: "Acres",
    soilType: "Medium Black Soil",
    irrigationType: "Automated Drip with Fertigation",
    mainCrop: "Table Grapes & Sugarcane",
    registrationDate: "2025-07-20",
    healthStatus: "Optimal",
    healthScore: 94,
    dataCompleteness: 95,
    coordinates: { lat: 20.2014, lng: 73.8340 },
    notes: "High value export crop trial with dual soil moisture + micro-climate node."
  },
  {
    id: "FARM-MH-002",
    name: "Shivneri Millets & Oilseed Reserve",
    farmerName: "Anand Pandurang Shinde",
    state: "Maharashtra",
    district: "Pune",
    village: "Baramati",
    area: 5.0,
    areaUnit: "Acres",
    soilType: "Deep Black Cotton Soil",
    irrigationType: "Micro Sprinkler",
    mainCrop: "Pearl Millet (Bajra) & Groundnut",
    registrationDate: "2025-10-05",
    healthStatus: "Warning",
    healthScore: 54,
    dataCompleteness: 72,
    coordinates: { lat: 18.1520, lng: 74.5770 },
    notes: "Dryland crop monitoring under low rainfall conditions."
  }
];

export const initialFields = [
  {
    id: "FLD-TN01-A",
    farmId: "FARM-TN-001",
    name: "North Block - Drip Sector 1",
    area: 3.5,
    crop: "Cotton (Bt Hybrid)",
    cropStage: "Flowering & Boll Formation",
    soilMoistureTarget: { min: 45, max: 70 },
    sensorCount: 3,
    status: "Healthy"
  },
  {
    id: "FLD-TN01-B",
    farmId: "FARM-TN-001",
    name: "South Block - Intercrop Plot",
    area: 3.0,
    crop: "Groundnut (VRI 8)",
    cropStage: "Peg Formation",
    soilMoistureTarget: { min: 40, max: 65 },
    sensorCount: 2,
    status: "Optimal"
  },
  {
    id: "FLD-TN02-A",
    farmId: "FARM-TN-002",
    name: "Kuruvai Wet Field 1",
    area: 2.8,
    crop: "Paddy (CR 1009)",
    cropStage: "Panicle Initiation",
    soilMoistureTarget: { min: 70, max: 95 },
    sensorCount: 2,
    status: "Attention Needed"
  },
  {
    id: "FLD-TN02-B",
    farmId: "FARM-TN-002",
    name: "Thaladi Nursery Plot",
    area: 2.0,
    crop: "Blackgram (VBN 6)",
    cropStage: "Vegetative",
    soilMoistureTarget: { min: 35, max: 60 },
    sensorCount: 1,
    status: "Healthy"
  },
  {
    id: "FLD-MH01-A",
    farmId: "FARM-MH-001",
    name: "Grape Canopy Sector A",
    area: 4.5,
    crop: "Table Grapes (Thompson Seedless)",
    cropStage: "Berry Development",
    soilMoistureTarget: { min: 50, max: 75 },
    sensorCount: 4,
    status: "Optimal"
  },
  {
    id: "FLD-MH01-B",
    farmId: "FARM-MH-001",
    name: "Cane Terrace Sector B",
    area: 3.7,
    crop: "Sugarcane (Co 86032)",
    cropStage: "Grand Growth",
    soilMoistureTarget: { min: 60, max: 85 },
    sensorCount: 2,
    status: "Healthy"
  },
  {
    id: "FLD-MH02-A",
    farmId: "FARM-MH-002",
    name: "Rainfed Millet Parcel",
    area: 5.0,
    crop: "Pearl Millet (Bajra)",
    cropStage: "Grain Filling",
    soilMoistureTarget: { min: 30, max: 55 },
    sensorCount: 2,
    status: "Moisture Stress"
  }
];

export const initialSensors = [
  {
    id: "SNS-SM-01",
    name: "Root-Zone Capacitive Moisture Probe #1",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    type: "Soil Moisture",
    unit: "%",
    latestReading: 58.4,
    thresholdMin: 45,
    thresholdMax: 70,
    status: "Online",
    battery: 92,
    lastUpdated: "2026-10-24T14:15:00Z",
    installationDate: "2025-08-18",
    hardwareUid: "AGRI-ESP32-SM-9021"
  },
  {
    id: "SNS-AT-02",
    name: "Microclimate Air Temp & Rh Node",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    type: "Air Temperature",
    unit: "°C",
    latestReading: 31.8,
    thresholdMin: 18,
    thresholdMax: 36,
    status: "Online",
    battery: 88,
    lastUpdated: "2026-10-24T14:20:00Z",
    installationDate: "2025-08-18",
    hardwareUid: "AGRI-ESP32-TH-4412"
  },
  {
    id: "SNS-RH-03",
    name: "Canopy Relative Humidity Sensor",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    type: "Relative Humidity",
    unit: "%",
    latestReading: 62.0,
    thresholdMin: 40,
    thresholdMax: 85,
    status: "Online",
    battery: 88,
    lastUpdated: "2026-10-24T14:20:00Z",
    installationDate: "2025-08-18",
    hardwareUid: "AGRI-ESP32-TH-4412"
  },
  {
    id: "SNS-PH-04",
    name: "Electrochemical Soil pH Probe",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-B",
    fieldName: "South Block - Intercrop Plot",
    type: "Soil pH",
    unit: "pH",
    latestReading: 6.8,
    thresholdMin: 6.0,
    thresholdMax: 7.5,
    status: "Online",
    battery: 81,
    lastUpdated: "2026-10-24T13:40:00Z",
    installationDate: "2025-08-20",
    hardwareUid: "AGRI-PH-7719"
  },
  {
    id: "SNS-SM-05",
    name: "Paddy Subsurface Water Table Probe",
    farmId: "FARM-TN-002",
    farmName: "Cauvery Delta Agri Heritage",
    fieldId: "FLD-TN02-A",
    fieldName: "Kuruvai Wet Field 1",
    type: "Soil Moisture",
    unit: "%",
    latestReading: 41.2,
    thresholdMin: 70,
    thresholdMax: 95,
    status: "Warning",
    battery: 65,
    lastUpdated: "2026-10-24T14:00:00Z",
    installationDate: "2025-09-05",
    hardwareUid: "AGRI-SM-5510"
  },
  {
    id: "SNS-NPK-06",
    name: "Multi-parameter Soil Nitrogen Probe",
    farmId: "FARM-TN-002",
    farmName: "Cauvery Delta Agri Heritage",
    fieldId: "FLD-TN02-A",
    fieldName: "Kuruvai Wet Field 1",
    type: "Nitrogen (N)",
    unit: "mg/kg",
    latestReading: 124.0,
    thresholdMin: 140,
    thresholdMax: 280,
    status: "Online",
    battery: 74,
    lastUpdated: "2026-10-24T12:00:00Z",
    installationDate: "2025-09-06",
    hardwareUid: "AGRI-NPK-8123"
  },
  {
    id: "SNS-SM-07",
    name: "Grape Zone Multi-Depth Probe",
    farmId: "FARM-MH-001",
    farmName: "Sahyadri Valley Horticulture",
    fieldId: "FLD-MH01-A",
    fieldName: "Grape Canopy Sector A",
    type: "Soil Moisture",
    unit: "%",
    latestReading: 66.8,
    thresholdMin: 50,
    thresholdMax: 75,
    status: "Online",
    battery: 95,
    lastUpdated: "2026-10-24T14:30:00Z",
    installationDate: "2025-07-25",
    hardwareUid: "AGRI-GSM-1092"
  },
  {
    id: "SNS-LUX-08",
    name: "Photosynthetic Solar Radiation Meter",
    farmId: "FARM-MH-001",
    farmName: "Sahyadri Valley Horticulture",
    fieldId: "FLD-MH01-A",
    fieldName: "Grape Canopy Sector A",
    type: "Light Intensity",
    unit: "lux",
    latestReading: 64200,
    thresholdMin: 20000,
    thresholdMax: 95000,
    status: "Online",
    battery: 91,
    lastUpdated: "2026-10-24T14:30:00Z",
    installationDate: "2025-07-25",
    hardwareUid: "AGRI-PAR-2201"
  },
  {
    id: "SNS-SM-09",
    name: "Baramati Dryland Moisture Node",
    farmId: "FARM-MH-002",
    farmName: "Shivneri Millets & Oilseed Reserve",
    fieldId: "FLD-MH02-A",
    fieldName: "Rainfed Millet Parcel",
    type: "Soil Moisture",
    unit: "%",
    latestReading: 26.5,
    thresholdMin: 30,
    thresholdMax: 55,
    status: "Warning",
    battery: 42,
    lastUpdated: "2026-10-24T13:55:00Z",
    installationDate: "2025-10-08",
    hardwareUid: "AGRI-DRY-3319"
  },
  {
    id: "SNS-EC-10",
    name: "Soil Electrical Conductivity Sensor",
    farmId: "FARM-MH-002",
    farmName: "Shivneri Millets & Oilseed Reserve",
    fieldId: "FLD-MH02-A",
    fieldName: "Rainfed Millet Parcel",
    type: "Soil EC",
    unit: "dS/m",
    latestReading: 1.45,
    thresholdMin: 0.5,
    thresholdMax: 2.5,
    status: "Online",
    battery: 60,
    lastUpdated: "2026-10-24T13:55:00Z",
    installationDate: "2025-10-08",
    hardwareUid: "AGRI-EC-9014"
  },
  {
    id: "SNS-P-11",
    name: "Phosphorus Ion Sensor",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    type: "Phosphorus (P)",
    unit: "mg/kg",
    latestReading: 18.2,
    thresholdMin: 15,
    thresholdMax: 35,
    status: "Online",
    battery: 79,
    lastUpdated: "2026-10-24T11:00:00Z",
    installationDate: "2025-08-22",
    hardwareUid: "AGRI-P-6110"
  },
  {
    id: "SNS-K-12",
    name: "Potassium Ion Sensor",
    farmId: "FARM-TN-001",
    farmName: "Kongu Green Farms",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    type: "Potassium (K)",
    unit: "mg/kg",
    latestReading: 142.0,
    thresholdMin: 120,
    thresholdMax: 250,
    status: "Offline",
    battery: 12,
    lastUpdated: "2026-10-23T18:00:00Z",
    installationDate: "2025-08-22",
    hardwareUid: "AGRI-K-6111"
  }
];

export const initialRecommendations = [
  {
    id: "REC-2026-001",
    farmId: "FARM-TN-002",
    fieldId: "FLD-TN02-A",
    category: "Irrigation",
    priority: "High",
    title: "Canal Water Scheduling: Soil Moisture Dropped Below 45%",
    explanation: "Kuruvai Wet Field 1 moisture is currently at 41.2%, which is 28.8% below the recommended threshold of 70% for the panicle initiation stage of Paddy (CR 1009).",
    supportingMeasurements: "Soil Moisture: 41.2% (Target: 70-95%), Ambient Temp: 32.4°C, Last irrigation 5 days ago.",
    suggestedAction: "Initiate controlled wetting cycle for 2.5 hours via canal inlet gate. Target water depth: 3-5 cm.",
    timestamp: "2026-10-24T14:05:00Z",
    status: "New",
    ruleTriggered: "RULE-PADDY-AWD-01"
  },
  {
    id: "REC-2026-002",
    farmId: "FARM-MH-002",
    fieldId: "FLD-MH02-A",
    category: "Environmental Risk",
    priority: "Critical",
    title: "Severe Moisture Deficit on Bajra Grain Filling",
    explanation: "Root zone sensor reports 26.5% moisture against 30% baseline. High evapotranspiration risk detected under midday sun.",
    supportingMeasurements: "Soil Moisture: 26.5%, Soil EC: 1.45 dS/m, Solar Radiation: 68,000 lux.",
    suggestedAction: "Apply emergency supplemental micro-sprinkler irrigation of approximately 25 mm early evening to avert grain shrinkage.",
    timestamp: "2026-10-24T14:10:00Z",
    status: "New",
    ruleTriggered: "RULE-DRYLAND-STRESS-04"
  },
  {
    id: "REC-2026-003",
    farmId: "FARM-TN-001",
    fieldId: "FLD-TN01-A",
    category: "Resource Efficiency",
    priority: "Medium",
    title: "Optimal Drip Cycle Reached — Pause Fertigation",
    explanation: "Moisture currently at 58.4% within comfortable 45-70% band. Boll formation nutrient demand is stable.",
    supportingMeasurements: "Soil Moisture: 58.4%, Ambient Temp: 31.8°C, Humidity: 62%.",
    suggestedAction: "Pause drip pumping for the next 18 hours. Review soil moisture trend at 06:00 tomorrow.",
    timestamp: "2026-10-24T13:30:00Z",
    status: "Accepted",
    ruleTriggered: "RULE-COTTON-DRIP-OPT-02"
  },
  {
    id: "REC-2026-004",
    farmId: "FARM-TN-002",
    fieldId: "FLD-TN02-A",
    category: "Soil Condition",
    priority: "Medium",
    title: "Sub-Optimal Available Nitrogen Detected",
    explanation: "Nitrogen reading at 124 mg/kg is below the 140 mg/kg minimum required for panicle elongation in alluvial soils.",
    supportingMeasurements: "Available N: 124 mg/kg (Target 140-280 mg/kg), pH: 7.1.",
    suggestedAction: "Plan split dose application of neem-coated urea or bio-fertilizer Azospirillum at 25 kg/acre during next wetting.",
    timestamp: "2026-10-24T12:15:00Z",
    status: "Reviewed",
    ruleTriggered: "RULE-SOIL-NUTRIENT-N-01"
  },
  {
    id: "REC-2026-005",
    farmId: "FARM-TN-001",
    fieldId: "FLD-TN01-A",
    category: "Data Quality",
    priority: "Low",
    title: "Potassium Sensor Offline for Over 20 Hours",
    explanation: "SNS-K-12 battery dropped below 15% threshold; sensor has stopped pinging the IoT gateway.",
    supportingMeasurements: "Last ping: 2026-10-23T18:00Z, Battery: 12%.",
    suggestedAction: "Replace 3.7V 18650 Li-ion battery or inspect solar trickle charger harness.",
    timestamp: "2026-10-24T08:00:00Z",
    status: "New",
    ruleTriggered: "RULE-DEVICE-HEARTBEAT-01"
  }
];

export const initialRisks = [
  {
    id: "RSK-001",
    farmId: "FARM-MH-002",
    fieldId: "FLD-MH02-A",
    category: "Moisture Stress",
    severity: "High",
    title: "Prolonged Soil Moisture Depletion in Black Cotton Soil",
    supportingData: "Moisture 26.5% vs threshold 30%. No rain forecasted.",
    detectionTime: "2026-10-24T13:55:00Z",
    suggestedAction: "Run micro-sprinkler irrigation immediately.",
    status: "Active"
  },
  {
    id: "RSK-002",
    farmId: "FARM-TN-002",
    fieldId: "FLD-TN02-A",
    category: "Paddy Moisture Stress",
    severity: "Medium",
    title: "AWD Threshold Breached in Panicle Initiation Stage",
    supportingData: "Moisture 41.2% (Target min 70%).",
    detectionTime: "2026-10-24T14:00:00Z",
    suggestedAction: "Release canal water into Kuruvai Block.",
    status: "Active"
  },
  {
    id: "RSK-003",
    farmId: "FARM-TN-001",
    fieldId: "FLD-TN01-A",
    category: "Telemetry Incomplete",
    severity: "Low",
    title: "Potassium Sensor Offline - Nutrient Telemetry Incomplete",
    supportingData: "SNS-K-12 battery depleted (12%).",
    detectionTime: "2026-10-23T18:00:00Z",
    suggestedAction: "Field officer battery replacement visit.",
    status: "Acknowledged"
  }
];

export const initialIrrigationLogs = [
  {
    id: "IRR-001",
    farmId: "FARM-TN-001",
    fieldId: "FLD-TN01-A",
    fieldName: "North Block - Drip Sector 1",
    date: "2026-10-22",
    method: "Drip Irrigation",
    durationMinutes: 120,
    waterQuantityLiters: 4800,
    isEstimated: false,
    notes: "Applied alongside soluble potassium nitrate fertigation batch."
  },
  {
    id: "IRR-002",
    farmId: "FARM-TN-002",
    fieldId: "FLD-TN02-A",
    fieldName: "Kuruvai Wet Field 1",
    date: "2026-10-19",
    method: "Canal Inflow",
    durationMinutes: 180,
    waterQuantityLiters: 15000,
    isEstimated: true,
    notes: "Canal sluice opened for 3 hours; flood level maintained at 4 cm."
  },
  {
    id: "IRR-003",
    farmId: "FARM-MH-001",
    fieldId: "FLD-MH01-A",
    fieldName: "Grape Canopy Sector A",
    date: "2026-10-23",
    method: "Sub-surface Micro Drip",
    durationMinutes: 90,
    waterQuantityLiters: 3200,
    isEstimated: false,
    notes: "Routine canopy morning hydration. Soil moisture restored from 51% to 68%."
  }
];

export const initialConsents = [
  {
    id: "CNS-001",
    farmId: "FARM-TN-001",
    dataCategories: ["Soil Sensor Telemetry", "Crop Cycle & Harvest Estimates", "Irrigation Logs"],
    recipientName: "NABARD Agri-Credit Pilot Initiative (Sample Demo)",
    purpose: "Pre-qualification assessment for concessional solar-pump credit scheme",
    requestedDurationDays: 90,
    status: "Active",
    createdAt: "2025-11-10T10:00:00Z",
    revokedAt: null,
    isDemoOnly: true
  },
  {
    id: "CNS-002",
    farmId: "FARM-MH-001",
    dataCategories: ["Digital Farm Profile", "Soil Quality Index", "Field Coordinates"],
    recipientName: "Sahyadri Farmers Producer Company Ltd (FPO Demo)",
    purpose: "Collective organic fertilizer procurement and export traceability audit",
    requestedDurationDays: 180,
    status: "Active",
    createdAt: "2025-09-15T09:30:00Z",
    revokedAt: null,
    isDemoOnly: true
  },
  {
    id: "CNS-003",
    farmId: "FARM-TN-002",
    dataCategories: ["Full Farm Historical Sensors"],
    recipientName: "AgriTech Crop Insurance Consortium (Sample Demo)",
    purpose: "Index-based drought insurance verification demonstration",
    requestedDurationDays: 60,
    status: "Revoked",
    createdAt: "2025-10-01T11:20:00Z",
    revokedAt: "2025-10-18T16:45:00Z",
    isDemoOnly: true
  }
];

export const initialDocuments = [
  {
    id: "DOC-001",
    farmId: "FARM-TN-001",
    name: "Patta_Chitta_Land_Extract_Sample.pdf",
    type: "Land Ownership Record",
    fileSize: "1.2 MB",
    uploadDate: "2025-08-16",
    status: "Farmer-Provided (Unverified)",
    notes: "Demonstration revenue record copy provided by farmer."
  },
  {
    id: "DOC-002",
    farmId: "FARM-TN-001",
    name: "TNAU_Soil_Testing_Laboratory_Report_2025.pdf",
    type: "Soil Health Card",
    fileSize: "2.4 MB",
    uploadDate: "2025-08-25",
    status: "Third-Party Certified (Sample)",
    notes: "Baseline micro-nutrient laboratory report from Tamil Nadu Agricultural University."
  },
  {
    id: "DOC-003",
    farmId: "FARM-MH-001",
    name: "Nashik_FPO_Membership_Certificate.pdf",
    type: "FPO Shareholder Proof",
    fileSize: "850 KB",
    uploadDate: "2025-07-22",
    status: "Verified by FPO Officer",
    notes: "Active shareholder record with Sahyadri Farmers Producer Company."
  }
];

export const cropLibrary = [
  {
    name: "Paddy (Rice)",
    season: "Kharif / Thaladi",
    optimalSoil: ["Alluvial Clay Loam", "Clay Loam"],
    phRange: [5.5, 7.5],
    tempRange: [20, 38],
    moistureRequirement: "High (65-95%)",
    growthDurationDays: "120-140",
    waterNeed: "High (Canal / AWD)",
    keyStates: ["Tamil Nadu", "Andhra Pradesh", "West Bengal", "Punjab"],
    description: "Staple cereal requiring saturated soil conditions, especially during panicle initiation."
  },
  {
    name: "Cotton",
    season: "Kharif / Winter Comb",
    optimalSoil: ["Deep Black Cotton Soil", "Red Sandy Loam"],
    phRange: [6.0, 8.0],
    tempRange: [21, 35],
    moistureRequirement: "Moderate (45-70%)",
    growthDurationDays: "150-180",
    waterNeed: "Moderate (Drip preferred)",
    keyStates: ["Maharashtra", "Gujarat", "Tamil Nadu", "Telangana"],
    description: "Major commercial fiber crop susceptible to waterlogging. Thrives in well-drained loam and black soils."
  },
  {
    name: "Sugarcane",
    season: "Perennial / Annual",
    optimalSoil: ["Medium Black Soil", "Alluvial Loam"],
    phRange: [6.0, 7.8],
    tempRange: [20, 38],
    moistureRequirement: "High (60-85%)",
    growthDurationDays: "300-360",
    waterNeed: "High (Drip or Furrow)",
    keyStates: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka"],
    description: "High biomass crop demanding consistent irrigation scheduling and high organic matter."
  },
  {
    name: "Pearl Millet (Bajra)",
    season: "Kharif / Summer",
    optimalSoil: ["Sandy Loam", "Medium Black Soil", "Red Soil"],
    phRange: [6.5, 8.5],
    tempRange: [24, 40],
    moistureRequirement: "Low (30-55%)",
    growthDurationDays: "75-90",
    waterNeed: "Low (Drought-tolerant)",
    keyStates: ["Maharashtra", "Rajasthan", "Gujarat", "Tamil Nadu"],
    description: "Nutritious climate-resilient millet suitable for semi-arid rainfed zones with low water footprint."
  },
  {
    name: "Groundnut (Peanut)",
    season: "Kharif / Rabi",
    optimalSoil: ["Red Sandy Loam", "Light Alluvial"],
    phRange: [6.0, 7.2],
    tempRange: [22, 32],
    moistureRequirement: "Moderate (40-65%)",
    growthDurationDays: "105-125",
    waterNeed: "Moderate (Sprinkler / Drip)",
    keyStates: ["Tamil Nadu", "Gujarat", "Andhra Pradesh", "Maharashtra"],
    description: "Oilseed legume that fixes atmospheric nitrogen; requires friable light soil for peg penetration."
  },
  {
    name: "Maize (Corn)",
    season: "Kharif / Rabi",
    optimalSoil: ["Well-drained Loam", "Red Sandy Loam"],
    phRange: [5.8, 7.5],
    tempRange: [18, 35],
    moistureRequirement: "Moderate to High (50-75%)",
    growthDurationDays: "95-115",
    waterNeed: "Moderate (Furrow / Drip)",
    keyStates: ["Karnataka", "Madhya Pradesh", "Tamil Nadu", "Maharashtra"],
    description: "High yielding cereal responsive to balanced NPK and timely irrigation during silking."
  },
  {
    name: "Pulses (Blackgram / Greengram)",
    season: "Rabi / Summer rice fallow",
    optimalSoil: ["Clay Loam", "Red Loam", "Black Soil"],
    phRange: [6.5, 7.8],
    tempRange: [25, 35],
    moistureRequirement: "Low to Moderate (35-60%)",
    growthDurationDays: "65-75",
    waterNeed: "Low to Moderate",
    keyStates: ["Tamil Nadu", "Maharashtra", "Madhya Pradesh"],
    description: "Short-duration pulse that enriches soil biology and fits smoothly in rice-fallow cropping."
  }
];

export const initialNotifications = [
  {
    id: "NTF-01",
    title: "Critical Moisture Stress Detected",
    message: "Rainfed Millet Parcel at Shivneri Reserve has dropped to 26.5% moisture.",
    farmId: "FARM-MH-002",
    type: "Critical",
    timestamp: "2026-10-24T14:10:00Z",
    read: false,
    link: "/irrigation"
  },
  {
    id: "NTF-02",
    title: "AWD Irrigation Advisory",
    message: "Cauvery Delta Agri Heritage requires canal water cycle within 12 hours.",
    farmId: "FARM-TN-002",
    type: "Warning",
    timestamp: "2026-10-24T14:05:00Z",
    read: false,
    link: "/irrigation"
  },
  {
    id: "NTF-03",
    title: "Sensor SNS-K-12 Battery Low",
    message: "Potassium probe battery has depleted to 12% at Kongu Green Farms.",
    farmId: "FARM-TN-001",
    type: "Warning",
    timestamp: "2026-10-24T08:00:00Z",
    read: true,
    link: "/sensors"
  },
  {
    id: "NTF-04",
    title: "Digital Farm Profile at 95%",
    message: "Sahyadri Valley Horticulture profile is finance-ready with 3 verified documents.",
    farmId: "FARM-MH-001",
    type: "Success",
    timestamp: "2026-10-23T15:00:00Z",
    read: true,
    link: "/digital-profiles"
  }
];

export const demoUsers = [
  {
    id: "USR-01",
    name: "Murugan Selvam",
    email: "murugan@agrinova.demo",
    role: "Farmer",
    phone: "+91 98421 54321",
    preferredLanguage: "Tamil",
    state: "Tamil Nadu",
    district: "Coimbatore",
    farmId: "FARM-TN-001"
  },
  {
    id: "USR-02",
    name: "Dr. Arvind Kulkarni",
    email: "fpo.director@sahyadri.demo",
    role: "FPO Administrator",
    phone: "+91 94220 88712",
    preferredLanguage: "Marathi",
    state: "Maharashtra",
    district: "Nashik",
    fpoName: "Sahyadri Farmers Producer Company"
  },
  {
    id: "USR-03",
    name: "Priya Sundaram",
    email: "officer.tn@agrinova.demo",
    role: "Field Officer",
    phone: "+91 97890 23411",
    preferredLanguage: "Tamil",
    state: "Tamil Nadu",
    district: "Thanjavur"
  },
  {
    id: "USR-04",
    name: "Admin AGRINOVA",
    email: "admin@agrinova.org",
    role: "Platform Administrator",
    phone: "+91 91100 00001",
    preferredLanguage: "English",
    state: "All India",
    district: "Central Operations"
  }
];

// Helper to generate 24-hour time series for sensors
export function generate24HourReadings(baseVal, variance, unit) {
  const points = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000);
    // Controlled sinusoidal fluctuation
    const hour = d.getHours();
    const cycle = Math.sin((hour / 24) * 2 * Math.PI) * variance;
    const noise = (Math.random() - 0.5) * (variance * 0.4);
    const rawVal = baseVal + cycle + noise;
    const value = Math.max(0, parseFloat(rawVal.toFixed(1)));
    points.push({
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: d.toISOString(),
      value: unit === 'lux' ? Math.round(value) : value
    });
  }
  return points;
}
