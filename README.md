<h1 align="center">SaveBirds.app Metrics Frontend</h1>

## 1. Introduction
This project is the frontend implementation of the Metrics page for SaveBirds.app. It allows users to analyze bird survey data across different geographic areas and time periods, displaying results on an interactive map.

## 2. Technology Stack
- Vue 3
- Bootstrap 5
- Leaflet.js
- Vite

## 3. Project Structure
- `src/views/MetricsView.vue` - The main component for the Metrics page
- `src/router/index.js` - Vue Router configuration
- `src/App.vue` - Root Vue component
- `src/main.js` - Application entry point

## 4. Features
- Year range selection (1966 to present)
- Problem type selection (Single/Multiple polygons)
- Geographic area selection
- Interactive map with OpenStreetMap integration
- Responsive design for both desktop and mobile

## 5. Setup and Running

### 5.1 Installation
```bash
npm install
```

### 5.2 Development Server
```bash
npm run dev
```

### 5.3 Production Build
```bash
npm run build
```

## 6. Implementation Notes
This implementation follows the specifications provided in the 3-metrics.md document, creating a fully functional frontend interface for the Metrics tool.