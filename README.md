# Vantix ✦ SaaS UI Kit
### High-Fidelity Modern Dashboard & Design System

Vantix is a premium, futuristic SaaS UI boilerplate designed for developers and designers who want to jumpstart their application's frontend with elite aesthetics. It features a "Neural-Design" aesthetic, optimized for high-performance dashboards and enterprise interfaces.

> [!NOTE]  
> This is a **Frontend-Only** UI project. It provides high-fidelity mockups and interactive components (mocked AI chat, simulated analytics) but does not include a backend or actual AI model integrations.

![Vantix Preview](https://raw.githubusercontent.com/Sidspidy/vantix-saas-ui/main/public/preview.png)

## 🌌 Premium UI Sections

### ✦ Interactive Dashboard Mockups
A pre-built operational overview featuring KPI cards, team activity trackers, and sleek project grids—all using modern CSS glassmorphism and smooth hover states.

### ✦ Simulated AI Assistant (UI)
A highly polished chat interface designed to demonstrate AI integrations. It includes "Command Mode" styling, message threading, and responsive sidebar log management (simulated).

### ✦ Visual Data Mastery
Custom-built SVG sparklines and multi-layered charts that respond to theme changes. Designed to show how cluster performance and regional data can be visualized beautifully.

### ✦ Full Design System
- **Theme Hub**: Perfectly calibrated **Dark (Electric Blue × Violet)** and **Light** modes.
- **Micro-Animations**: Extensive use of Framer Motion for structural "flowing" transitions.
- **Component Library**: Reusable Buttons, Modals, Cards, and Badges with a consistent 24px premium radius.

## 🛠 Frontend Tech Stack

- **Core**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables (Design Tokens)
- **Architecture**: Vite (for lightning-fast HMR)
- **Animations**: Framer Motion
- **Iconography**: Lucide React
- **State Hub**: Zustand (Theme & UI states)

## 🚀 Usage

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sidspidy/vantix-saas-ui.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```

### Customization
- **Colors**: Modify `src/index.css` to update the global design tokens (`--accent`, `--violet`, etc.).
- **Typography**: Change fonts in `tailwind.config.js` and `index.css`.
- **Layouts**: Adjust `AppLayout.tsx` to modify the global sidebar/topbar structures.

## 📂 Project Structure

- `src/pages`: UI mocks for Dashboard, Analytics, Teams, and Settings.
- `src/components`: The core UI library (Cards, Buttons, Modals).
- `src/layouts`: Navigation shells for Public and Private views.
- `src/store`: Logic for handling theme transitions and UI states.

---

**Designed for visionaries. Built for developers.**  
© 2026 Vantix UI Kit. High-fidelity frontend reference.
