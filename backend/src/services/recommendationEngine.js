// Rule-Based Decision Engine for AGRINOVA
// Transparently generates agricultural intelligence based on crop thresholds, soil moisture, and microclimate

export function evaluateFieldConditions(farm, field, sensors) {
  const recommendations = [];
  const risks = [];

  // Find sensors relevant to this field
  const fieldSensors = sensors.filter(s => s.fieldId === field.id || s.farmId === farm.id);
  const moistureSensor = fieldSensors.find(s => s.type === "Soil Moisture");
  const tempSensor = fieldSensors.find(s => s.type === "Air Temperature");
  const nitrogenSensor = fieldSensors.find(s => s.type === "Nitrogen (N)");

  if (moistureSensor) {
    const val = moistureSensor.latestReading;
    const targetMin = field.soilMoistureTarget?.min || 40;
    const targetMax = field.soilMoistureTarget?.max || 70;

    if (val < targetMin) {
      const deficit = (targetMin - val).toFixed(1);
      const isCritical = val < targetMin * 0.75;
      
      recommendations.push({
        id: `REC-${Date.now()}-IRR`,
        farmId: farm.id,
        fieldId: field.id,
        category: "Irrigation",
        priority: isCritical ? "Critical" : "High",
        title: `Soil Moisture Deficit (${val}%) for ${field.crop}`,
        explanation: `Field '${field.name}' is currently at ${val}% moisture, which is ${deficit}% below the minimum target of ${targetMin}% for ${field.cropStage || 'growth stage'}.`,
        supportingMeasurements: `Sensor: ${moistureSensor.name} (${val}%). Safe Band: ${targetMin}% - ${targetMax}%.`,
        suggestedAction: `Schedule an irrigation cycle within the next 6-12 hours. Recommended volume: ${isCritical ? '35-45 mm' : '20-30 mm'}.`,
        timestamp: new Date().toISOString(),
        status: "New",
        ruleTriggered: "RULE-MOISTURE-DEFICIT-01"
      });

      risks.push({
        id: `RSK-${Date.now()}-M`,
        farmId: farm.id,
        fieldId: field.id,
        category: "Moisture Stress",
        severity: isCritical ? "Critical" : "High",
        title: `Soil Moisture Stress in ${field.name}`,
        supportingData: `Reading: ${val}% (Target min: ${targetMin}%)`,
        detectionTime: new Date().toISOString(),
        suggestedAction: "Initiate prompt irrigation.",
        status: "Active"
      });
    } else if (val > targetMax) {
      recommendations.push({
        id: `REC-${Date.now()}-SAT`,
        farmId: farm.id,
        fieldId: field.id,
        category: "Resource Efficiency",
        priority: "Medium",
        title: `Field Soil Approaching Saturation (${val}%)`,
        explanation: `Field moisture exceeds the upper target of ${targetMax}%. Prolonged waterlogging can induce root hypoxia in ${field.crop}.`,
        supportingMeasurements: `Sensor: ${moistureSensor.name} (${val}% vs max ${targetMax}%).`,
        suggestedAction: "Suspend active irrigation and ensure drainage sluices are unobstructed.",
        timestamp: new Date().toISOString(),
        status: "New",
        ruleTriggered: "RULE-MOISTURE-EXCESS-02"
      });
    }
  }

  if (tempSensor && tempSensor.latestReading > 36) {
    recommendations.push({
      id: `REC-${Date.now()}-HEAT`,
      farmId: farm.id,
      fieldId: field.id,
      category: "Environmental Risk",
      priority: "Medium",
      title: `High Ambient Canopy Temperature (${tempSensor.latestReading}°C)`,
      explanation: `Ambient temperature has breached 36°C, elevating evapotranspiration and thermal stress risk.`,
      supportingMeasurements: `Ambient Temp: ${tempSensor.latestReading}°C`,
      suggestedAction: "Plan late afternoon or night drip cycle to reduce daytime evaporation losses.",
      timestamp: new Date().toISOString(),
      status: "New",
      ruleTriggered: "RULE-THERMAL-STRESS-03"
    });
  }

  if (nitrogenSensor && nitrogenSensor.latestReading < 130) {
    recommendations.push({
      id: `REC-${Date.now()}-NUT`,
      farmId: farm.id,
      fieldId: field.id,
      category: "Soil Condition",
      priority: "Medium",
      title: `Low Available Nitrogen in Soil (${nitrogenSensor.latestReading} mg/kg)`,
      explanation: `Sensor measurement indicates available nitrogen is below the optimal threshold for current crop vegetative demand.`,
      supportingMeasurements: `Available N: ${nitrogenSensor.latestReading} mg/kg (Standard baseline: 140-280 mg/kg)`,
      suggestedAction: "Consider split fertigation of nitrogenous amendment (e.g., neem urea or fermented organic jeevamrut).",
      timestamp: new Date().toISOString(),
      status: "New",
      ruleTriggered: "RULE-SOIL-NUTRIENT-N"
    });
  }

  return { recommendations, risks };
}
