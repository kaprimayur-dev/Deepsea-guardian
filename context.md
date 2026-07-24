# DeepSea Guardian — Canonical HackOcean Round 2 Context

> **Status:** Selected for HackOcean Round 2 (Grand Finale)  
> **Phase:** 12-hour frontend build-and-ship sprint  
> **Problem Statement:** PS03 — DeepSea Guardian | AI-Powered Deep Ocean Pollution & Biodiversity Monitoring  
> **Canonical product idea:** **Mission Control for the Ocean**

This document is the canonical context for DeepSea Guardian going into HackOcean Round 2. The PPT-selection phase is complete. From this point forward, decisions should optimize for building, polishing, deploying, and demonstrating the strongest possible frontend experience within the 12-hour hackathon.

---

# 1. THE CORE PROBLEM

The ocean does not suffer from a lack of data.

It suffers from **fragmented intelligence**.

Ocean information is collected through multiple independent systems:

- Satellites
- Underwater drones
- Sonar systems
- IoT sensors and buoys
- Scientific surveys
- Research datasets

Conceptually:

```text
Satellites
    +
Underwater Drones
    +
Sonar Systems
    +
IoT Sensors
    +
Scientific Surveys
    +
Research Datasets

        ↓

Massive Marine Data
```

But these observations often exist across different platforms, formats, organizations, and interfaces.

There is no simple unified environment through which a user can understand:

> **What is happening in the ocean right now?**

---

# 2. WHY THAT MATTERS

Fragmentation makes environmental monitoring harder.

Important events include:

- Plastic accumulation
- Coral bleaching
- Ghost fishing nets
- Illegal dumping
- Species decline
- Habitat degradation

Conceptually:

```text
Plastic Accumulation
        │
Coral Bleaching
        │
Ghost Fishing Nets
        │
Illegal Dumping
        │
Species Decline
        │
Habitat Degradation
```

When information is difficult to combine and interpret, environmental threats can be understood **too late**, after damage has already occurred.

Therefore, the deeper problem is not simply:

> "Detect plastic."

or:

> "Track coral."

It is:

## **Fragmented Ocean Intelligence**

---

# 3. THE GOOGLE MAPS ANALOGY

Imagine Google Maps if:

```text
Roads          → Platform A
Traffic        → Platform B
Satellite      → Platform C
Weather        → Platform D
Navigation     → Platform E
Locations      → Platform F
```

Even if every platform contained excellent information, the experience would be terrible.

Google Maps becomes powerful because these layers become **one interactive environment**.

DeepSea Guardian applies that philosophy to ocean intelligence.

---

# 4. OUR SOLUTION

# DeepSea Guardian

### An Interactive Ocean Intelligence & Mission Control Platform

DeepSea Guardian brings fragmented marine observations together into a **single interactive digital environment**.

Conceptually:

```text
        SATELLITES
             │
             │
DRONES ──────┤
             │
SONAR ───────┤
             │
IoT ─────────┤
             │
RESEARCH ────┤
             ▼

     DEEPSEA GUARDIAN

             │
             ▼

   UNIFIED OCEAN VIEW

             │
             ▼

 Monitor • Explore • Understand
   Detect • Analyze • Respond
```

Instead of forcing users to interpret scattered datasets and reports, DeepSea Guardian turns them into an intuitive visual experience.

---

# 5. THE PRODUCT PHILOSOPHY

We are **not building another dashboard filled with charts**.

We are building something that feels like:

> **Mission Control for the Ocean.**

The user should feel like they are operating an actual environmental intelligence system.

Think:

```text
NASA Mission Control
        ×
Google Earth
        ×
Marine Research Platform
        ×
Modern SaaS UI
```

---

# 6. WHO IS IT FOR?

The long-term platform could serve:

### Researchers
Explore marine conditions and environmental observations.

### Conservation Organizations
Monitor threatened ecosystems and biodiversity.

### Government & Policymakers
Understand environmental risks and prioritize intervention.

### Marine Authorities
Investigate suspicious activities and environmental incidents.

### General Public
Understand ocean ecosystems through accessible visualizations.

---

# 7. WHAT WE ARE BUILDING FOR HACKOCEAN

HackOcean Round 2 is a **frontend hackathon** with a roughly **12-hour build window**.

Therefore:

## We are NOT building the complete production infrastructure.

We are building the **interactive frontend experience of that future system**.

The hackathon version uses realistic **dummy/simulated data**.

```text
Simulated Ocean Data

        ↓

Frontend Data Layer

        ↓

DeepSea Guardian

        ↓

Interactive Ocean Intelligence
```

Later:

```text
Real Satellites
Real Sensors
Real Drones
Real Ocean APIs
ML Models

        ↓

Same DeepSea Guardian Interface
```

The frontend should therefore be architected so the data source can eventually change without redesigning the entire product.

---

# 8. PRODUCT EXPERIENCE

DeepSea Guardian has two sides.

## Public Experience

A cinematic introduction explaining:

- the ocean
- environmental threats
- fragmented marine intelligence
- what DeepSea Guardian does

Then:

## **ENTER MISSION CONTROL**

## Mission-Control Experience

Once inside, the user gets an interactive environment containing:

```text
Ocean Map / Globe

Threat Intelligence

Environmental Risk

Marine Biodiversity

Drone Missions

Sensor Network

Ocean Analytics

Reports
```

---

# 9. CORE FEATURE — OCEAN INTELLIGENCE MAP

This is potentially our **hero feature**.

The user sees an interactive representation of the ocean.

Different intelligence layers can be enabled:

```text
☑ Plastic Pollution

☑ Coral Bleaching

☑ Ghost Fishing Nets

☑ Illegal Dumping

☑ Biodiversity

☑ Sensor Network

☑ Environmental Risk
```

The map changes based on the selected layer.

---

# 10. THREAT HOTSPOTS

Threats appear geographically.

Example:

```text
        ● CRITICAL

   Coral Bleaching


             ● HIGH

       Plastic Accumulation


    ● MEDIUM

      Ghost Net
```

Clicking a hotspot opens a detailed panel.

Example:

```text
MARINE EVENT #DS-2048

Location
Indian Ocean — Sector 17

Threat
Ghost Fishing Net

Severity
HIGH

Confidence
94%

Detected By
Underwater Drone + Sonar

Status
ACTIVE

Last Updated
4 minutes ago
```

The data is simulated during HackOcean.

The **interaction is real**.

---

# 11. ENVIRONMENTAL RISK MAP

The official problem specifically mentions predictive environmental risk maps.

Therefore, we visualize environmental risk geographically.

```text
GREEN
Low Risk

YELLOW
Moderate

ORANGE
High

RED
Critical
```

Clicking a region could show:

```text
ENVIRONMENTAL RISK

87 / 100

Risk Trend
↑ 14%

Primary Drivers

Plastic Density       42%
Coral Stress          31%
Illegal Activity      17%
Other                 10%
```

During the hackathon, these values come from simulated data.

We should **not falsely claim that a production AI model generated them**.

---

# 12. THREAT INTELLIGENCE

A dedicated interface provides environmental incidents such as:

```text
Illegal Dumping
       ↓
Plastic Accumulation
       ↓
Ghost Fishing Nets
       ↓
Coral Bleaching
       ↓
Habitat Damage
```

Users can filter:

```text
ALL

CRITICAL

HIGH

MEDIUM

LOW
```

Each incident contains:

- location
- severity
- detection source
- timestamp
- status
- environmental impact
- recommended response

---

# 13. BIODIVERSITY EXPLORER

Ocean monitoring is not only about pollution.

The official challenge explicitly includes **biodiversity monitoring and endangered species**.

Therefore, DeepSea Guardian includes a biodiversity layer.

Example:

```text
BLUE WHALE

Conservation Status
ENDANGERED

Recent Sightings
24

Population Trend
↓

Habitat
Indian Ocean

Threat Exposure
MODERATE
```

Potential species:

- Blue Whale
- Green Sea Turtle
- Whale Shark
- Dolphins
- Manta Ray
- Coral Species

This also gives us an opportunity to create one of the most visually beautiful sections of the website.

---

# 14. UNDERWATER DRONE MISSIONS

Underwater drones become part of the experience.

Example:

```text
AUV-07

STATUS
● ACTIVE

MISSION
Plastic Survey

DEPTH
2,847 m

SPEED
4.2 knots

BATTERY
74%

SIGNAL
GOOD
```

Its position can move slowly across the ocean map.

This creates the impression of a **living monitoring system** rather than a static dashboard.

---

# 15. IoT / SENSOR NETWORK

Sensor locations can appear on the map.

Selecting one reveals environmental measurements.

```text
SENSOR DS-184

STATUS
● ONLINE

Depth
1,240 m

Temperature
3.8°C

pH
7.91

Dissolved Oxygen
5.7 mg/L

Pressure
124 bar
```

Again:

**simulated data now → real sensors later.**

---

# 16. LIVE MISSION MODE

This is one of our potential **WOW features**.

Button:

## ▶ START LIVE MISSION

Instead of asking the judge to explore everything manually, the product demonstrates itself.

Example sequence:

```text
MISSION DS-07 STARTED

        ↓

AUV-07 entering Sector 14

        ↓

Sonar Scan Initiated

        ↓

Anomaly Detected

        ↓

Analyzing...

        ↓

Ghost Fishing Net Identified

        ↓

Confidence: 94%

        ↓

Environmental Risk Updated

72 → 81

        ↓

Conservation Alert Generated
```

Meanwhile:

- map zooms
- drone moves
- sonar pulse appears
- threat marker appears
- information panel opens
- risk score changes

This turns the website into its own **interactive product demo**.

---

# 17. SOUND DESIGN

Because the product is a Mission Control experience, subtle sound can reinforce interaction.

Possible sounds:

```text
Enter Mission Control
        ↓
Deep sonar ping

Threat Detected
        ↓
Low alert tone

Select Hotspot
        ↓
Sonar pulse

Toggle Layer
        ↓
Soft digital click

Start Mission
        ↓
Mission initialization sound
```

Sound must always be optional.

Provide:

```text
🔊 SOUND ON

🔇 SOUND OFF
```

It should enhance the experience rather than annoy the judge.

---

# 18. MICROINTERACTIONS

The visual experience is extremely important because this is specifically a frontend competition.

Potential interactions:

```text
Threat Marker
→ subtle pulse

Map Hotspot Click
→ smooth zoom

Layer Toggle
→ hotspots transition

Statistics
→ count-up animation

Threat Drawer
→ spring animation

Charts
→ animate into view

Drone
→ slowly moves

Critical Alert
→ subtle warning pulse

Page Navigation
→ smooth transitions
```

These small details can differentiate DeepSea Guardian from generic AI-generated hackathon websites.

---

# 19. WEBSITE STRUCTURE

Current proposed route structure:

```text
/

Landing / Storytelling Experience


/mission-control

Main Ocean Command Center


/ocean-map

Interactive Ocean Intelligence Map


/threats

Threat Intelligence


/biodiversity

Marine Species Explorer


/reports

Environmental Reports
```

Not every route needs equal complexity.

---

# 20. PRIORITY SYSTEM

Because we only have 12 hours:

## P0 — MUST SHIP

```text
Mission Control

Interactive Ocean Map

Threat Layers

Threat Details

Responsive Design

Deployment
```

Without these, DeepSea Guardian does not feel like DeepSea Guardian.

## P1 — STRONGLY DESIRED

```text
Environmental Risk Map

Biodiversity Explorer

Drone Monitoring

Sensor Monitoring

Ocean Analytics

Landing Experience
```

## P2 — WOW FEATURES

```text
Live Mission Mode

Sound Design

Animated Drone

Advanced Map Animations

Beautiful Page Transitions

Advanced Microinteractions
```

## P3 — DO NOT WASTE TIME

```text
Authentication

User Profiles

Admin Panel

Actual Backend

Database

Actual ML Training

Real Satellite Processing

Complex CRUD

Chatbot

Settings System
```

If P0 is not perfect, P3 does not exist.

---

# 21. FRONTEND TECH STACK

Current direction:

```text
React
    +
Vite
    +
Tailwind CSS
    +
Framer Motion / Motion
    +
MapLibre / Leaflet
    +
Three.js where valuable
    +
Recharts
    +
Lucide Icons
```

Data:

```text
JSON
```

Deployment:

```text
Vercel
```

Choose reliability over unnecessary technical complexity.

---

# 22. MOCK DATA STRUCTURE

Something approximately like:

```text
src/

  data/

      threats.json

      species.json

      sensors.json

      drones.json

      regions.json

      missions.json
```

Components should not become tightly coupled to these files.

---

# 23. FRONTEND ARCHITECTURE

Build the frontend as if real APIs will eventually arrive.

```text
UI Components

      ↓

Feature Modules

      ↓

Hooks / State

      ↓

Service Layer

      ↓

Data Provider

      ↓

Mock Data Provider
      NOW

      │

      └─────────────→ Real API Provider
                       FUTURE
```

Therefore, something like:

```text
ThreatService.getThreats()
```

provides data.

Today it reads JSON.

Tomorrow it could call an API.

The UI should not care.

---

# 24. WHY THIS MATTERS AFTER THE HACKATHON

We deliberately separate:

## HackOcean Version

```text
Frontend
+
Simulated Data
```

from:

## Future DeepSea Guardian

```text
Real Ocean APIs
+
Satellite Data
+
IoT Infrastructure
+
Underwater Drone Feeds
+
Geospatial Database
+
AI / ML Models
+
Predictive Analytics
+
Real-Time Processing
```

Therefore, the hackathon project does not need to die after the competition.

It becomes the **frontend prototype for a much larger system**.

---

# 25. THE 12-HOUR BUILD PHILOSOPHY

Our goal is NOT:

> Build as many features as possible.

Our goal is:

> **Build the smallest product that creates the strongest possible DeepSea Guardian experience.**

Therefore:

```text
QUALITY

>

QUANTITY
```

A spectacular Mission Control with five working interactions beats fifteen unfinished pages.

---

# 26. THE EXPERIENCE WE WANT THE JUDGE TO HAVE

```text
Judge Opens Website

        ↓

Beautiful Ocean Experience

        ↓

"The Ocean Is Speaking."

        ↓

ENTER MISSION CONTROL

        ↓

*Sonar Ping*

        ↓

Ocean Intelligence Map Appears

        ↓

Threat Markers Pulse

        ↓

Judge Enables
"Coral Bleaching"

        ↓

Ocean Visualization Changes

        ↓

Judge Selects Critical Region

        ↓

Detailed Environmental Intelligence Appears

        ↓

START LIVE MISSION

        ↓

Drone Moves

        ↓

Sonar Scans

        ↓

Ghost Net Detected

        ↓

Environmental Risk Changes

        ↓

Alert Generated
```

At that moment, the judge should not merely think:

> "Nice frontend."

They should think:

## **"I understand exactly how this product would work."**

---

# 27. OUR CORE USP

Not:

> AI.

Everyone says AI.

Not:

> Dashboard.

Everyone builds dashboards.

Not:

> Beautiful UI.

That is expected in a frontend hackathon.

Our strongest product idea is:

## **Unified Ocean Intelligence + Mission-Control Experience**

We turn fragmented marine information into something humans can **see, explore, and act upon**.

---

# 28. THE ONE-LINE PITCH

> **DeepSea Guardian is an interactive Ocean Intelligence platform that transforms fragmented marine observations from satellites, underwater drones, sonar, and IoT sensors into a unified environment for monitoring threats, exploring biodiversity, and understanding environmental risk.**

---

# 29. THE SHORTER PITCH

If someone asks:

> "What did you build?"

Answer:

## **We're building Mission Control for the Ocean.**

Then explain the rest.

---

# 30. THE NORTH STAR

Everything built during those 12 hours should pass one test:

> **Does this make DeepSea Guardian feel more like a real Ocean Mission Control system?**

If yes → build it.

If no → probably cut it.

---

# ROUND 2 EXECUTION REMINDER

The PPT-selection phase is over.

The current project state is:

```text
ROUND 1
Sell the Vision
      ↓
SELECTED ✅
      ↓
ROUND 2
Build → Polish → Test → Deploy → Demo → Ship
```

For the 12-hour sprint, prioritize:

1. Mission Control
2. Interactive Ocean Map
3. Threat layers and hotspot interaction
4. Threat detail experience
5. Responsive and polished UI
6. Reliable deployment
7. Risk, biodiversity, drones, and sensors
8. Live Mission + sound + advanced microinteractions only after the core experience is stable

Do not burn hackathon hours on backend infrastructure, authentication, databases, real ML pipelines, or real satellite ingestion.

---

## Canonical Identity

**Project:** DeepSea Guardian  
**Hackathon:** HackOcean — National-Level Frontend Hackathon  
**Current phase:** Round 2 / Grand Finale  
**Build window:** 12 hours  
**Product identity:** Interactive Ocean Intelligence & Mission Control Platform  
**Core problem:** Fragmented Ocean Intelligence  
**Core experience:** Unified Ocean Intelligence + Mission-Control Experience  
**Data strategy:** Realistic simulated/dummy data during HackOcean  
**North-star phrase:** **Mission Control for the Ocean**
