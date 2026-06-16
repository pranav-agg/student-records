# Student Record Portal Frontend

A React-based user interface application bundled with Vite that provides an intuitive dashboard for viewing and managing student performance metrics. It connects asynchronously to the Spring Boot backend API.

## Tech Stack
* **Library:** React
* **Build Tooling:** Vite
* **Web Server:** Nginx (for containerized static asset serving)

## Key Features
* **Path-Based Routing:** Tailored to work seamlessly behind a reverse proxy/Ingress routing layer.
* **Containerized Environment Injection:** Uses a dynamic runtime script (`replace-env.sh`) to replace environment gateway URLs in the built production assets upon container startup without requiring a code rebuild.

---

## Local Development Setup

### Prerequisites
* Node.js (LTS version recommended)
* npm (comes bundled with Node.js)

### Running Locally
1. Navigate to the frontend directory and install dependencies:
   ```bash
   npm install