<div align="center">

<br />

<img src="https://img.shields.io/badge/SmartHealth-Reports-1BDADD?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEyaC00bC0zIDlMOSAzIDYgMTJIMiIvPjwvc3ZnPg==&logoColor=white" alt="SmartHealth" height="40"/>

# SmartHealth Reports

### *The Web3 Era of Health — Reimagined.*

A **premium, full-stack healthcare management platform** built for patients, doctors, hospitals, labs, pharmacies, and insurers. Beautifully designed, lightning fast, and powered by AI.

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

</div>

---

## ✨ Overview

**SmartHealth Reports** is an all-in-one digital health infrastructure platform that eliminates scattered paper records and fragmented health data. Built with a focus on **cinematic UX**, **AI-powered insights**, and **enterprise-grade security**, it connects every stakeholder in the healthcare lifecycle — from patients at home to governments monitoring public health.

---

## 🖥️ Live Demo

> 🚀 Coming soon — check back after deployment!

---

## 📸 Screenshots

| Landing Page | Patient Dashboard |
|:---:|:---:|
| *Preloader → Hero reveal animation* | *AI-powered health profile* |

| Prescription Manager | Doctor Console |
|:---:|:---:|
| *Digital QR-verified prescriptions* | *Consultation & diagnostics* |

---

## 🌟 Key Features

### 🏠 Landing Page
- **Cinematic Preloader** — Pulsing logo that fades before revealing the page
- **Letter-by-letter Hero Animation** — Character stagger reveal synced with preloader exit
- **Floating Pill Navbar** — Morphs into a glassmorphic rounded pill on scroll with scrollspy active-link highlighting
- **3D Scroll-driven Timeline** — Horizontal parallax health timeline with perspective depth
- **Parallax Section Headers** — Blur-fade reveal titles that drift on scroll across all sections
- **Magnetic Buttons** — Gravity-defying interactive CTAs

### 🧑‍⚕️ Patient Portal
- **Digital Health Vault** — Chronological, full-lifetime health records
- **AI Medical Report Reader** — OCR + NLP to extract diagnoses and vitals from uploaded files
- **Prescription Manager** — QR-code verified prescriptions with pharmacy sync broadcast
- **Disease Tracking** — Longitudinal tracking for diabetes, hypertension, and more
- **AI Nutritionist** — Personalized diet plans derived from lab results
- **Menstruation & Pregnancy Tracker** — Cycle insights with fetal development milestones
- **Family Health Profiles** — Manage health data for your entire household
- **3D Health Timeline** — Visual journey of your entire medical history

### 👨‍⚕️ Doctor Console
- **Smart Patient List** — Full history, vitals, and AI pre-analysis at a glance
- **Prescription Editor** — Rich-text digital prescriptions with institutional signatures
- **Telemedicine Portal** — Live consultation with integrated video and chat
- **Consultation History** — Searchable visit logs with AI summaries

### 🏥 Hospital / Admin
- **User & Department Management** — Role-based access control (RBAC) for all staff
- **AI Settings Dashboard** — Configure and monitor AI modules per department
- **Immutable Audit Logs** — Every data access event recorded for HIPAA compliance
- **Population Analytics** — Real-time macro health dashboards for public health teams

### 🧪 Lab & Pharmacy
- **Lab Dashboard** — Push digital reports directly to patient vaults, zero paper
- **Pharmacy Dashboard** — Receive and fulfill digital prescriptions with chain-of-custody tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion 11 |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **QR Codes** | `qrcode.react` |
| **State** | React Context API |
| **PDF Handling** | Custom print & download engine |

---

## 🗂️ Project Structure

```
smart-health-reports/
├── public/
│   └── assets/               # Static images (imaging, food assets)
├── src/
│   ├── components/
│   │   ├── landing/          # All landing page sections
│   │   │   ├── ui/           # Shared UI: MagneticButton, AnimatedSectionHeader
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SmartAIEngine.tsx
│   │   │   ├── HealthTimelineShowcase.tsx
│   │   │   ├── SecurityVault.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   └── ...
│   │   ├── clinical/         # BMI gauge, imaging visualizer, camera scanner
│   │   └── ui/               # Global shared components
│   ├── context/
│   │   ├── AuthContext.tsx   # Authentication & role management
│   │   └── HealthContext.tsx  # Global health data state
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── patient/          # Patient-facing pages
│   │   ├── doctor/           # Doctor-facing pages
│   │   ├── admin/            # Admin & hospital pages
│   │   ├── laboratory/       # Lab dashboard
│   │   ├── pharmacy/         # Pharmacy dashboard
│   │   ├── billing/          # Billing & invoicing
│   │   └── shared/           # Cross-role pages (Live Consultation)
│   ├── layouts/
│   │   └── MainLayout.tsx    # Shell with sidebar navigation
│   └── App.tsx               # Root router configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shahdhiraj/smart-health-reports.git
cd smart-health-reports

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Credentials

Use any of the following to explore different role portals:

| Role | Email | Password |
|---|---|---|
| **Patient** | `patient@demo.com` | `demo123` |
| **Doctor** | `doctor@demo.com` | `demo123` |
| **Admin** | `admin@demo.com` | `demo123` |
| **Lab** | `lab@demo.com` | `demo123` |
| **Pharmacy** | `pharmacy@demo.com` | `demo123` |

---

## 🔒 Security & Compliance

- 🛡️ **256-bit AES Encryption** for all health data at rest and in transit
- 🏥 **HIPAA & GDPR Compliant** architecture
- 🔑 **Biometric Clinical Authentication** flows
- 📋 **Dynamic Consent Management** — patients control exactly who sees what
- 🔍 **Immutable Audit Trails** — every action is logged and tamper-proof

---

## 🗺️ Roadmap

- [ ] Backend integration (Node.js / Supabase)
- [ ] Real AI model integration (OCR + NLP via Google Cloud)
- [ ] Mobile apps (React Native)
- [ ] FHIR / HL7 standard compliance
- [ ] National Health ID integration
- [ ] Wearable device sync (Apple Watch, Fitbit)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: describe your change"

# Push and open a PR
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **Dhiraj Shah**

⭐ **Star this repo** if you find it useful!

[![GitHub stars](https://img.shields.io/github/stars/shahdhiraj/smart-health-reports?style=social)](https://github.com/shahdhiraj/smart-health-reports)

</div>
