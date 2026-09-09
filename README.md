# Historical Event Map & Timeline

A web application for visualizing historical events geographically and chronologically. Built with React, Leaflet, Mantine UI, and Zustand, the app allows users to explore events across space and time, supporting both pinpoint-accurate map markers and regional/approximate event displays.

## Tech Stack

- **Frontend Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Components & Styling:** [Mantine UI](https://mantine.dev/)
- **Map & Spatial Data:** [Leaflet](https://leafletjs.com/) / [React-Leaflet](https://react-leaflet.js.org/)
- **Geospatial Boundaries:** [OpenStreetMap API](https://www.openstreetmap.org/) (OSM GeoJSON boundaries)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Tabler Icons React](https://tabler.io/icons)
- **Database:** [Supabase](https://supabase.com/)

## Features

- **Interactive Map Visualization:** Render location markers with custom popups for events with a known geoposition or HUD for events without exact coordinates.
- **Dynamic Boundary Highlighting:** Search for countries or administrative regions to asynchronously fetch and highlight OpenStreetMap polygon boundaries.
- **Time Navigation:** Integrated timeline slider to step through historical events sequentially.

## Getting Started

### Prerequisites

- **Node.js** (v18.x or higher)
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/alex-mardare/history-timeline.git
cd historical-event-map
```

2. **Install dependencies:**

```bash
npm install
```

or

```bash
pnpm install
```

3. **Run the application locally:**

```bash
npm run dev
```
