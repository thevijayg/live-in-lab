# MASTER DEVELOPMENT PROMPT: AGRINOVA SMART AGRICULTURE WEB APPLICATION

## 1. ROLE AND RESPONSIBILITY

Act as a senior full-stack developer, AI engineer, IoT architect, UI/UX designer, data visualization specialist, and smart agriculture product strategist.

Build a complete, modern, responsive, functional web application named AGRINOVA based on the project abstract provided below.

Do not create only a landing page or a static UI mockup.

Develop a working prototype with connected pages, reusable components, realistic sample data, functional interactions, responsive layouts, charts, forms, and a consistent application architecture.

Make the application suitable for a college project demonstration, innovation competition, hackathon presentation, and future real-world agricultural deployment.

## 2. PROJECT ABSTRACT

AGRINOVA is an AI- and IoT-enabled smart agriculture system designed to help farmers make data-driven decisions at the field level.

The system uses low-cost sensors to collect real-time information such as soil moisture, temperature, humidity, light, and nutrient conditions.

This field data is processed through an intelligent decision layer to generate irrigation alerts, crop recommendations, and risk indicators, reducing dependence on guesswork and improving resource management.

The system further converts farm information into a Digital Farm Profile, which can support consent-based integration with relevant agricultural digital infrastructure.

AGRINOVA follows a three-layer approach: Sense, Decide, and Finance, connecting physical field conditions with actionable intelligence and a structured digital representation of the farm.

The proposed system will initially be piloted in Tamil Nadu and Maharashtra, with a focus on scalable adoption through farmers, FPOs, government programmes, and field demonstrations.

The overall objective is to create a sustainable and scalable digital agriculture solution that transforms farm data into meaningful decisions for improved agricultural productivity, resource efficiency, and farmer support.

## 3. CORE DEVELOPMENT OBJECTIVE

Build AGRINOVA as an intelligent digital agriculture platform that connects:

1. Physical agricultural fields.
2. IoT-based sensor monitoring.
3. Intelligent agricultural decision-making.
4. Irrigation and resource optimization.
5. Crop suitability recommendations.
6. Farm risk identification.
7. Digital Farm Profile generation.
8. Farmer and FPO management.
9. Consent-based data sharing.
10. Finance-readiness and farm documentation.

The platform must communicate the complete journey from collecting farm data to generating useful decisions and maintaining structured farm information.

## 4. TECHNOLOGY STACK

Use the following technology stack unless the existing project already has a suitable structure.

Frontend:
- React with Vite.
- JavaScript or TypeScript.
- Tailwind CSS for styling.
- Lucide React for icons.
- Recharts for charts and analytics.
- React Router for page navigation.
- React Hook Form where useful for complex forms.

Backend:
- Node.js.
- Express.js.
- REST API architecture.
- Modular route, controller, service, and middleware structure.

Database:
- Use Supabase for persistent storage if the required credentials are available.
- Otherwise implement a working local demo data layer with realistic sample records and browser persistence where appropriate.
- Keep database access abstracted so a real database can be integrated later.

Authentication:
- Build a login and registration interface.
- Use secure server-side authentication if a backend is configured.
- Never store plaintext passwords.
- Never expose secret API keys in frontend code.

Charts:
- Use Recharts for time-series sensor measurements, farm comparisons, crop analytics, and resource utilization.

Maps:
- Use a suitable map library only when its setup is available.
- Otherwise create a clean farm location panel with coordinates and a map placeholder.

Deployment:
- Prepare the frontend for deployment on Vercel or Netlify.
- Keep the backend deployable separately if required.
- Provide a README with setup and deployment instructions.

## 5. DESIGN SYSTEM AND BRAND IDENTITY

Create a premium agricultural technology SaaS design.

Brand name: AGRINOVA.

Brand tagline: "Sense the Field. Decide Intelligently. Grow Sustainably."

Alternative short tagline: "From Field Data to Smart Decisions."

Primary color: Deep forest green #174C35.

Secondary color: Agricultural green #2F855A.

Accent color: Fresh lime #A3D977.

Background color: Soft ivory #F7F8F2.

Card background: White #FFFFFF.

Primary text: Dark charcoal #1F2933.

Secondary text: Muted slate #667085.

Warning color: Amber #E9A23B.

Danger color: #DC5555.

Success color: #2F855A.

Use a clean typography system such as Inter or Manrope.

Use generous spacing, consistent alignment, rounded cards, subtle borders, restrained shadows, and clear visual hierarchy.

Avoid excessive gradients, overly bright colors, and unnecessary animations.

Use subtle animations for card loading, page transitions, chart updates, and interactive elements.

Use consistent button sizes, input heights, icon dimensions, border radii, and spacing.

Design a simple AGRINOVA logo combining a leaf, crop field, and technology-inspired visual element.

Make the brand recognizable across the sidebar, login screen, browser title, and landing page.

## 6. APPLICATION ARCHITECTURE

Build the application with a reusable component-based architecture.

Create a public landing page and a separate authenticated dashboard experience.

Use a persistent dashboard sidebar on desktop.

Use a collapsible sidebar or mobile navigation drawer on smaller screens.

Create a reusable top navigation bar containing:
- Page title.
- Search control.
- Notification icon.
- Current farm selector.
- User profile menu.

Create reusable components for:
- Metric cards.
- Sensor status cards.
- Chart panels.
- Data tables.
- Alert banners.
- Farm information cards.
- Recommendation cards.
- Form fields.
- Modal dialogs.
- Loading indicators.
- Empty states.
- Error messages.
- Confirmation dialogs.
- Status badges.
- Page headers.

Organize files into components, pages, hooks, services, utilities, assets, and backend modules where applicable.

Avoid placing the entire application in one component.

Use meaningful filenames and consistent naming conventions.

## 7. PUBLIC LANDING PAGE

Create a premium public-facing homepage introducing AGRINOVA.

The hero section must include:
- AGRINOVA logo.
- Navigation links.
- A strong headline about intelligent agriculture.
- A supporting description based on the project abstract.
- A primary "Explore Dashboard" button.
- A secondary "Discover How It Works" button.
- A smart agriculture illustration or suitable agricultural visual.
- Small highlights for IoT, AI, and Digital Farm Profiles.

Use the headline:

"Transform Every Farm into a Data-Driven Farm."

Use supporting text:

"AGRINOVA connects real-time field sensing, intelligent agricultural decisions, and structured digital farm information to support more productive and sustainable farming."

Create a clear call to action.

Include a three-layer architecture section explaining Sense, Decide, and Finance.

Include an explanation of how AGRINOVA works in five steps:
1. Register the farm.
2. Connect or simulate field sensors.
3. Collect agricultural data.
4. Generate intelligent recommendations.
5. Build a Digital Farm Profile.

Add a benefits section describing:
- Better irrigation planning.
- Improved resource efficiency.
- Earlier identification of farm risks.
- Crop suitability insights.
- Structured farm documentation.
- Better access to relevant agricultural support.

Add an impact section covering farmers, Farmer Producer Organizations, government programmes, and field demonstrations.

Mention the planned pilot regions: Tamil Nadu and Maharashtra.

Do not claim that the platform has already been deployed in these regions.

Include a project architecture section.

Include a footer with project information, navigation, and contact placeholders.

## 8. AUTHENTICATION AND USER ROLES

Create a login page with AGRINOVA branding.

Create a registration page with:
- Full name.
- Email address.
- Phone number.
- Password.
- User role.
- Preferred language.
- State.
- District.

Support the following application roles:
- Farmer.
- FPO administrator.
- Field officer.
- Platform administrator.

Create a role selection interface.

Create a demo login option for project evaluation.

If backend authentication is unavailable, clearly label the login as demo authentication.

Do not present demo authentication as production-secure authentication.

Protect dashboard routes appropriately for the selected authentication setup.

Provide logout functionality.

Create a profile menu with user details and role.

Use secure session handling when a real authentication backend is configured.

## 9. DASHBOARD OVERVIEW

Build the main dashboard as the central workspace of AGRINOVA.

The dashboard must contain a welcome message and selected farm information.

Display the following metric cards:
- Total registered farms.
- Total cultivated area.
- Active sensor devices.
- Farms requiring attention.
- Irrigation recommendations.
- Farm data completeness.

Use realistic sample values.

Label sample data as demo data.

Do not imply that simulated sensor values are genuine live measurements.

Display an overall farm health indicator.

Show a recent sensor activity chart.

Show soil moisture trends.

Show temperature and humidity trends.

Display an irrigation status panel.

Display the most recent agricultural alerts.

Display a crop recommendation summary.

Display Digital Farm Profile completion statistics.

Display recent activity, including farm registration and sensor updates.

Include quick-action buttons:
- Add New Farm.
- View Sensor Data.
- Generate Recommendations.
- Create Farm Profile.
- View Alerts.

Ensure all buttons navigate to a relevant page or perform a meaningful action.

## 10. SENSE LAYER: IOT SENSOR MANAGEMENT

Create a complete Sensor Management page.

Display registered sensor devices in a searchable table or responsive card layout.

Each sensor record should contain:
- Sensor ID.
- Sensor name.
- Farm name.
- Field name.
- Sensor type.
- Device status.
- Latest reading.
- Measurement unit.
- Last updated timestamp.
- Battery status, if applicable.

Support these sensor types:
- Soil moisture.
- Air temperature.
- Relative humidity.
- Light intensity.
- Soil pH.
- Soil electrical conductivity.
- Nitrogen.
- Phosphorus.
- Potassium.

Show the correct units for each sensor.

Use percentage for soil moisture and relative humidity.

Use degrees Celsius for temperature.

Use lux for light intensity.

Use pH values for soil acidity.

Use appropriate units for nutrient and conductivity readings.

Allow users to filter sensors by farm, field, sensor type, and status.

Add a search box for sensor IDs and names.

Provide an Add Sensor button.

The Add Sensor form must include sensor name, type, farm, field, installation date, and device identifier.

Provide a sensor details page or modal.

Show historical readings for the selected sensor.

Show a line chart for readings over time.

Display sensor connectivity status.

Use statuses such as Online, Offline, Warning, and Maintenance.

Provide a clearly labeled simulated sensor mode.

In simulated mode, generate plausible sample measurements with controlled variation.

Update simulated measurements through a safe, bounded timer or a manual refresh mechanism.

Ensure timers are cleaned up correctly when components unmount.

Add a manual "Refresh Readings" button.

Display the last updated timestamp.

Show an empty state when no sensors are registered.

Provide meaningful validation and error handling.

Do not claim to read real hardware unless an actual device integration has been configured.

## 11. SENSE LAYER: FARM MANAGEMENT

Create a Farm Management page.

Display all registered farms.

Each farm must contain:
- Farm ID.
- Farm name.
- Farmer name.
- State.
- District.
- Village.
- Farm area.
- Area unit.
- Soil type.
- Irrigation type.
- Main crop.
- Registration date.
- Farm health status.

Support the initial pilot geography of Tamil Nadu and Maharashtra.

Include realistic demo locations from both states.

Provide a state selector and district field.

Allow farmers or authorized staff to register a new farm.

Provide an Add Farm form with validation.

Allow editing farm details.

Allow viewing farm details.

Allow deleting demo records only after a confirmation dialog.

Ensure changes update the application state and persistent storage when configured.

Display farm information in a clean card or table layout.

Include a farm detail view with tabs:
- Overview.
- Sensors.
- Crops.
- Irrigation.
- Recommendations.
- Digital Farm Profile.

Display a visual farm location panel.

Allow coordinates to be recorded when available.

Do not invent exact real-world coordinates for actual farmers.

Clearly mark demonstration locations as illustrative.

## 12. FIELD-LEVEL MONITORING

Create a Field Monitoring page.

Allow each farm to contain multiple fields.

Show field names, cultivated area, crop type, and sensor coverage.

Provide a field selector.

Display current field conditions.

Show soil moisture, temperature, humidity, light intensity, and nutrient measurements when available.

Use metric cards and time-series charts.

Display the field's latest update time.

Provide a field condition summary.

Allow users to compare multiple fields within the same farm.

Highlight measurements that fall outside configurable thresholds.

Display warnings when readings are missing or stale.

Use neutral wording when data is unavailable.

Do not treat missing readings as healthy conditions.

## 13. DECIDE LAYER: AGRICULTURAL INTELLIGENCE

Create an Agricultural Intelligence page.

The objective is to convert sensor data into actionable recommendations.

Build a transparent rule-based decision engine as the default working implementation.

Create a separate service layer so a real AI model or external API can be integrated later.

The recommendation engine must consider:
- Soil moisture.
- Temperature.
- Humidity.
- Crop type.
- Crop growth stage.
- Soil characteristics.
- Recent sensor readings.
- Rainfall information when available.
- Irrigation history when available.

Generate recommendations in these categories:
- Irrigation.
- Crop suitability.
- Soil condition.
- Resource efficiency.
- Environmental risk.
- Data quality.

Each recommendation must contain:
- Recommendation ID.
- Farm ID.
- Field ID.
- Recommendation category.
- Priority.
- Title.
- Explanation.
- Supporting measurements.
- Suggested action.
- Generation timestamp.
- Recommendation status.

Possible priorities:
- Low.
- Medium.
- High.
- Critical.

Possible statuses:
- New.
- Reviewed.
- Accepted.
- Dismissed.
- Completed.

Show the reason behind every recommendation.

For example, when soil moisture is below a configured crop-specific threshold, generate a potential irrigation recommendation.

Use crop-specific thresholds from configurable demo rules rather than presenting one threshold as suitable for every crop.

If rainfall forecasts are unavailable, do not claim to have considered upcoming rainfall.

If soil nutrient measurements are unavailable, explain that nutrient recommendations are limited.

Do not invent machine learning accuracy scores.

Do not label a rule-based recommendation as a machine learning prediction.

Provide a clear "How was this recommendation generated?" explanation.

Allow users to review recommendations.

Allow users to mark recommendations as accepted, dismissed, or completed.

Save recommendation status changes.

Add filters for farm, field, category, priority, and status.

Display recommendation history.

## 14. IRRIGATION ADVISORY MODULE

Create a dedicated Irrigation Advisory page.

Display current soil moisture and recent trends.

Show the selected crop and its growth stage.

Show the configured irrigation threshold.

Display a status such as:
- Moisture Adequate.
- Monitor Moisture.
- Irrigation May Be Needed.
- Sensor Data Unavailable.

Generate a recommendation based on configured rules and available measurements.

Explain why the recommendation was generated.

Display the latest measurement timestamp.

Show recent soil moisture readings on a line chart.

Include an irrigation log.

Allow users to record:
- Irrigation date.
- Field.
- Watering method.
- Duration.
- Water quantity, if known.
- Notes.

Show irrigation history.

Display estimated water usage only when sufficient data exists.

Distinguish measured water usage from user-entered or estimated values.

Do not automatically operate pumps or irrigation equipment.

Do not claim that a recommendation guarantees crop health or water savings.

Allow irrigation thresholds to be adjusted by an authorized user.

## 15. CROP RECOMMENDATION MODULE

Create a Crop Recommendation page.

Allow users to select a farm and field.

Collect the following available information:
- Soil type.
- Soil pH.
- Temperature.
- Moisture.
- Nutrient measurements.
- Water availability.
- Cultivated area.
- Season.
- Existing crop.
- Farmer preferences.

Generate crop suitability suggestions using configurable agricultural rules.

Use a transparent scoring system for demonstration purposes.

Show:
- Suggested crop.
- Suitability score.
- Supporting conditions.
- Missing data.
- Potential constraints.
- Suggested next step.

Clearly identify scores as illustrative rule-based suitability scores.

Do not represent demo scores as scientifically validated yield predictions.

Do not guarantee crop yield, profitability, or market demand.

Include a crop information library with sample entries for common Indian crops.

Potential example crops include paddy, maize, groundnut, cotton, sugarcane, pulses, and millets.

Use crop requirements that can be edited in a configuration file.

Explain that local agricultural expertise and current seasonal information should be considered before making planting decisions.

## 16. FARM RISK INDICATORS

Create a Farm Risk Monitoring page.

Identify potential risks based on available data.

Possible indicators:
- Low soil moisture.
- Excessive temperature.
- Unusual humidity.
- Soil pH outside the configured crop range.
- Missing sensor readings.
- Offline sensor devices.
- Incomplete farm information.
- Potential nutrient imbalance when measurements support the conclusion.

Display each risk with:
- Risk category.
- Severity.
- Affected farm or field.
- Supporting data.
- Detection time.
- Suggested action.
- Current status.

Clearly distinguish an observed measurement from a possible risk.

Do not claim to detect pests, diseases, or extreme weather without relevant data and a suitable model or external information source.

Provide a risk history table.

Allow users to acknowledge and resolve risks.

## 17. DIGITAL FARM PROFILE

Build Digital Farm Profile as a major feature of AGRINOVA.

Create a structured digital representation of each farm.

Include the following sections:
- Farm identity.
- Farmer-provided details.
- Farm location.
- Land area.
- Field boundaries or location information, if available.
- Soil characteristics.
- Crop information.
- Irrigation details.
- Sensor inventory.
- Sensor observation history.
- Agricultural recommendations.
- Farm activity history.
- Documentation records.
- Consent and data-sharing settings.

Show the profile completeness percentage.

Calculate completeness from defined required fields rather than a hardcoded number.

Identify missing information.

Allow authorized users to edit profile information.

Provide a profile preview page.

Generate a printable farm profile report.

Allow export to JSON or CSV where appropriate.

Use a clear schema version for exported profiles.

Include a profile generation timestamp.

Distinguish farmer-entered information from sensor-generated measurements.

Distinguish estimated values from verified information.

Never fabricate farmer identity, land ownership, government registration, or financial records.

## 18. CONSENT-BASED DATA SHARING

Build a dedicated Consent and Data Sharing page.

Explain that the Digital Farm Profile may support future consent-based integration with relevant agricultural digital infrastructure.

Do not claim that an official government integration is active.

Create a consent management interface.

Allow users to review:
- Data categories.
- Intended recipient.
- Purpose of sharing.
- Requested access duration.
- Consent status.
- Consent creation date.
- Revocation status.

Use sample recipient organizations for demonstration only.

Do not imply that sample organizations have authorized access.

Provide explicit actions to grant or revoke demo consent.

Ask for confirmation before changing consent status.

Record consent changes in an audit log when backend persistence is configured.

Design the architecture so access control is enforced on the backend.

Do not treat hiding a frontend button as sufficient authorization.

Do not expose farm data through public URLs.

Avoid collecting unnecessary personal information.

Explain that a consent interface alone does not establish compliance with every applicable privacy law.

## 19. FINANCE LAYER: FARM FINANCE READINESS

Create a Finance Readiness page.

The objective is to organize farm information that may be useful when a farmer chooses to engage with a bank, FPO, or agricultural support programme.

Do not build an actual lending decision engine.

Do not claim guaranteed loan eligibility.

Display a structured Farm Documentation Checklist.

Include:
- Farm profile completeness.
- Cultivation information.
- Crop history.
- Irrigation records.
- Available soil reports.
- Sensor history.
- Farmer-uploaded documents.
- Available farm activity records.

Allow farmers to upload supporting documents.

Support common formats such as PDF, PNG, JPG, and CSV where safe.

Validate file size and file type.

Use private storage when backend storage is configured.

Do not expose uploaded documents publicly.

Show document name, type, upload date, and status.

Allow authorized users to preview or remove documents.

Clearly identify documents as farmer-provided and unverified unless a genuine verification process exists.

Create a finance-readiness checklist score based on the completion of defined documentation fields.

Label this as documentation completeness, not creditworthiness.

Do not calculate or display a fabricated credit score.

Do not promise loans, subsidies, insurance, or government benefits.

Provide a section explaining that financial institutions make their own independent assessments.

## 20. FPO AND FIELD OFFICER MANAGEMENT

Create an FPO Management page.

Allow an authorized FPO administrator to view farms associated with the organization.

Display:
- Total registered member farms.
- Combined recorded cultivated area.
- Active sensor devices.
- Pending recommendations.
- Incomplete Digital Farm Profiles.
- Farms requiring attention.

Allow farm filtering by state, district, crop, and status.

Create a field officer workspace.

Allow authorized field officers to:
- Register farms.
- Update permitted farm details.
- Review sensor status.
- Add field visit notes.
- Record farmer feedback.
- Review recommendations.
- Identify incomplete records.

Use role-based permissions.

Ensure one farmer cannot access another farmer's private records unless explicitly authorized.

Ensure FPO administrators only see the data they are permitted to access.

## 21. ALERTS AND NOTIFICATIONS

Create a centralized notification center.

Display alerts for:
- Low soil moisture.
- Offline sensors.
- Missing measurements.
- High-priority recommendations.
- Incomplete farm profiles.
- Pending consent reviews.
- Pending documentation.

Each alert must include a timestamp and relevant farm or field.

Allow users to mark alerts as read.

Allow users to filter alerts by priority and type.

Add a notification count badge.

Provide a settings page for alert preferences.

Do not send real SMS, email, or push notifications unless the corresponding provider is configured.

For the demo, display in-app notifications only.

## 22. ANALYTICS AND REPORTS

Create an Analytics and Reports page.

Include the following visualizations:
- Soil moisture over time.
- Temperature over time.
- Humidity over time.
- Sensor availability.
- Crop distribution.
- Farm area distribution.
- Irrigation activity.
- Recommendation categories.
- Farm profile completeness.
- Risk severity distribution.

Allow filtering by farm, field, sensor type, and date range where relevant.

Use clear legends, axis labels, tooltips, and units.

Ensure charts respond to selected filters.

Do not use random chart values on every render.

Use consistent demo datasets.

Create report generation controls.

Provide CSV exports for tabular farm and sensor information.

Provide printable reports for farm summaries and Digital Farm Profiles.

Handle missing data without breaking charts.

Display a clear message when there is insufficient data for a chart.

## 23. FARMER PROFILE AND PREFERENCES

Create a Farmer Profile page.

Include:
- Name.
- Contact information.
- Preferred language.
- State.
- District.
- Associated farms.
- Farm role.
- Account settings.

Allow editing of permitted fields.

Provide English as the default interface language.

Prepare a translation structure for Tamil and Marathi.

If full translations are not implemented, clearly indicate which language options are available.

Do not translate agricultural advice automatically in a way that changes its meaning.

Include notification preferences and privacy settings.

## 24. SEARCH, FILTERS, AND NAVIGATION

Implement a consistent sidebar with the following navigation:

1. Overview.
2. Farms.
3. Field Monitoring.
4. Sensors.
5. Agricultural Intelligence.
6. Irrigation Advisory.
7. Crop Recommendations.
8. Risk Monitoring.
9. Digital Farm Profiles.
10. Consent and Data Sharing.
11. Finance Readiness.
12. FPO Management.
13. Analytics and Reports.
14. Notifications.
15. Settings.

Show only relevant navigation items for each role.

Add global search for farms, fields, and sensors.

Make active navigation states visually clear.

Preserve appropriate filter state when navigating between related views.

Ensure browser back and forward navigation work.

Avoid dead links and placeholder buttons that do nothing.

## 25. DATA MODEL AND BACKEND API

Design clear data models for:

- Users.
- Organizations.
- Farms.
- Fields.
- Sensors.
- Sensor readings.
- Crops.
- Irrigation logs.
- Recommendations.
- Risk indicators.
- Digital Farm Profiles.
- Documents.
- Consent records.
- Notifications.
- Audit logs.
- Field visit records.

Use unique identifiers.

Use consistent timestamps.

Use foreign-key relationships when using a relational database.

Validate incoming API data.

Use proper HTTP status codes.

Return consistent API response structures.

Implement error-handling middleware.

Add request validation.

Add pagination for large data tables.

Add sorting and filtering to relevant endpoints.

Avoid embedding business logic directly in route handlers.

Keep the rule engine separate from the HTTP layer.

## 26. SUGGESTED API ENDPOINTS

Implement the following endpoints where the backend is configured.

GET /api/health

GET /api/farms

POST /api/farms

GET /api/farms/:id

PUT /api/farms/:id

DELETE /api/farms/:id

GET /api/farms/:id/fields

POST /api/farms/:id/fields

GET /api/sensors

POST /api/sensors

GET /api/sensors/:id

GET /api/sensors/:id/readings

POST /api/sensors/:id/readings

GET /api/recommendations

POST /api/recommendations/generate

PATCH /api/recommendations/:id/status

GET /api/risks

GET /api/digital-farm-profiles

GET /api/digital-farm-profiles/:id

POST /api/digital-farm-profiles

GET /api/consents

POST /api/consents

PATCH /api/consents/:id/revoke

GET /api/irrigation-logs

POST /api/irrigation-logs

GET /api/analytics/overview

GET /api/notifications

PATCH /api/notifications/:id/read

Implement only endpoints supported by the actual data model.

Validate resource ownership and user permissions on every protected endpoint.

Never rely exclusively on frontend validation.

## 27. DEMO DATA AND SIMULATION

Seed the application with realistic but fictional demonstration data.

Include multiple farms in Tamil Nadu and Maharashtra.

Include different crops and soil types.

Include several fields per selected farm.

Include different sensor types.

Create sensor readings over a consistent sample time range.

Include normal and warning-level conditions.

Create examples of high, medium, and low-priority recommendations.

Include incomplete and complete Digital Farm Profiles.

Include a small number of sample irrigation logs.

Include demonstration consent records.

Include documentation checklist examples.

Mark all simulated information clearly.

Use a fixed sample dataset or deterministic generation so the dashboard remains consistent.

Allow the user to reset the demo data.

Do not use real farmers' personal data.

Do not present fictional statistics as actual field trial results.

## 28. RESPONSIVE DESIGN

Make the web application responsive across:
- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

Use responsive grid layouts.

Make tables horizontally scrollable or adapt them into cards on smaller screens.

Ensure forms fit mobile screens.

Ensure charts remain readable.

Use appropriate touch targets.

Avoid horizontal overflow.

Ensure the mobile sidebar can be opened and closed.

Maintain sufficient contrast and readable text sizes.

Test the application at common viewport widths.

## 29. ACCESSIBILITY AND USABILITY

Use semantic HTML.

Provide accessible form labels.

Use keyboard-accessible navigation.

Provide visible focus indicators.

Ensure buttons have meaningful labels.

Use text labels alongside status colors.

Do not communicate risk solely through color.

Provide alternative text for meaningful images.

Use accessible modal behavior.

Ensure error messages explain how to correct invalid input.

Use loading indicators for asynchronous operations.

Provide empty states and retry controls.

Avoid unnecessary pop-ups.

Keep the interface understandable to farmers with limited technical experience.

Use plain language for agricultural recommendations.

## 30. SECURITY AND PRIVACY

Implement authentication only through a suitable configured authentication provider or secure backend.

Hash passwords using a suitable password-hashing library if implementing password authentication.

Use environment variables for secrets.

Create an .env.example file containing placeholders only.

Never commit actual API keys or passwords.

Validate uploaded files.

Restrict document access.

Implement role-based authorization on the backend.

Validate user permissions before accessing or modifying farm records.

Use secure session handling.

Apply suitable CORS configuration.

Avoid exposing stack traces in production responses.

Add rate limiting to sensitive endpoints when appropriate.

Do not expose private farmer data in logs.

Implement audit records for important consent and administrative changes when persistence is configured.

Follow privacy-by-design principles.

## 31. ERROR HANDLING AND EDGE CASES

Handle missing sensor data.

Handle offline sensors.

Handle stale sensor