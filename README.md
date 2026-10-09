# ⚡ Parikshit Thakur — Developer Portfolio & Cyber Terminal Platform

[![Live Portfolio](https://img.shields.io/badge/Live_Domain-parikshit07.tech-06b6d4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.parikshit07.tech)
[![GitHub Repository](https://img.shields.io/badge/GitHub_Repo-developer--portfolio-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/parikshit-thakur25/developer-portfolio)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

A production-grade, ultra-aesthetic **Full-Stack Developer Portfolio & Cyber Terminal Platform** engineered for **Parikshit Thakur** (Full-Stack MERN Developer & Machine Learning Engineer). Featuring modern dark-mode ambiance, handwriting splash preloader, interactive CLI terminal, Owner Admin Mode security lock, PDF resume manager, and dynamic credential verification.

---

## 🛠️ Comprehensive Tech Stack & Architectural Use Description

### 1. 💻 Frontend Architecture & UI Logic
- **HTML5 (Semantic Web Structure)**:
  - Organizes content using semantic elements (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`).
  - Implements accessible form input attributes, ARIA roles, and responsive metadata for fast rendering and search indexing.
- **Vanilla CSS3 & Custom Design System (`style.css`)**:
  - **CSS Custom Properties (Variables)**: Standardizes colors (`--bg-dark: #050711`, `--accent-cyan: #06b6d4`, `--accent-violet: #8b5cf6`, `--accent-crimson: #f43f5e`), font families, and container dimensions.
  - **Glassmorphic UI Engine**: Combines semi-transparent background fills (`rgba(14, 18, 36, 0.72)`), subtle borders (`rgba(255, 255, 255, 0.09)`), and backdrop filters (`backdrop-filter: blur(12px)`) for a 3D glass aesthetic.
  - **Ambient Lighting Mesh**: Uses fixed blur elements (`.ambient-orb`) with radial color gradients and subtle CSS Keyframe animation pulses (`@keyframes splashPulse`).
- **ES6+ Vanilla JavaScript (`script.js`)**:
  - **DOM Manipulation & Event Listeners**: Powers interactive modals, smooth scrolling (`scrollIntoView`), and live component toggles without third-party framework overhead.
  - **Web Storage API (`localStorage`)**: Persists custom settings across browser sessions, including custom LinkedIn profile URLs, uploaded resume PDF metadata, and the customized Owner Admin PIN.

---

### 2. ✍️ Full-Screen Intro Splash Preloader Engine
- **Handwriting Calligraphy Typography (`Google Font Caveat`)**:
  - Delivers a fluid handwriting animation sequence (`"hello ,"` ➔ `"parikshit"`).
- **Asynchronous Typing & Deleting Controller**:
  - Built using recursive `setTimeout` timers to simulate real human typing speeds (75ms/char) and rapid deletion (40ms/char).
- **Curtain Exit & Keyboard Override**:
  - Smooth slide-up exit transition (`transform: translateY(-100%)`) with cubic-bezier timing (`cubic-bezier(0.77, 0, 0.175, 1)`).
  - Listens for keyboard triggers (`Enter`, `Escape`, `Space`) or clicks on the `SKIP ↵` button to skip the intro instantly.

---

### 3. 💻 Cyber Terminal Widget (`parikshit@tech-lab:~`)
- **CLI Emulator Engine**:
  - Intercepts user keyboard inputs (`keydown` on `#terminalInput`).
  - Supports command evaluation: `whoami`, `skills`, `projects`, `contact`, `status`, `domain`, `help`, and `clear`.
  - Appends styled terminal response lines (`term-response cyan/green`) dynamically and auto-scrolls terminal output.

---

### 4. 🔐 Owner Admin Mode & Security System
- **PIN Authentication (`1234` default)**:
  - Secures administrative features behind client-side PIN validation.
  - Toggles `.owner-only` UI elements (`Upload PDF 📤`, `Upload Certificate ➕`, `Edit ✏️ LinkedIn`, `Delete 🗑️`) dynamically.
- **Dynamic Admin Password Modification (`🔑 Change Admin Password`)**:
  - Allows the site owner to update the admin PIN anytime. The new password is saved directly in `localStorage` (`parikshit_admin_pin`).

---

### 5. 📄 Dynamic PDF Resume Uploader & Reader
- **HTML5 `FileReader` API Integration**:
  - Converts uploaded PDF files into Data URLs (`readAsDataURL`) for instantaneous local viewing without requiring server backends.
- **State Controller & Local Storage**:
  - Stores resume filename (`parikshit_resume_name`) and Data URL payload (`parikshit_resume_data`).
  - Toggles clean placeholder (`"No Resume PDF Uploaded Yet"`) and active resume state (`View PDF ↗` / `Delete 🗑️`).

---

### 6. 🌐 Hosting, Cloud & Security Infrastructure
- **GitHub Pages**:
  - Serves static assets from the `main` branch.
- **Custom Domain Routing (`parikshit07.tech`)**:
  - Custom domain claimed via GitHub Student Developer Pack on `get.tech`.
  - Linked using CNAME and 4 GitHub Anycast A records (`185.199.108.153`, `.109.`, `.110.`, `.111.`).
- **Automated SSL/TLS Encryption (Let's Encrypt)**:
  - Secures all HTTP traffic with automated HTTPS encryption.

---

## 📂 Directory Structure

```text
developer-portfolio/
├── CNAME               # Custom domain configuration (parikshit07.tech)
├── LICENSE             # MIT License file
├── README.md           # Comprehensive project documentation
├── index.html          # Primary semantic HTML5 structure & layout
├── style.css           # Core CSS design system, ambient lighting, glassmorphism
├── script.js           # Interactive splash animation, cyber terminal, admin PIN lock
└── scripts/
    └── setup.sh        # Automated local server launch & environment verification script
```

---

## 🚀 Quick Start & Local Setup

### Option 1: Using the Automated Setup Script
```bash
# Clone the repository
git clone https://github.com/parikshit-thakur25/developer-portfolio.git
cd developer-portfolio

# Run the automated setup script
./scripts/setup.sh
```

### Option 2: Manual Python HTTP Server
```bash
python3 -m http.server 8000
```
Open your browser and visit `http://localhost:8000`.

---

## 👤 Author & Contact

**Parikshit Thakur**  
- **Email**: `work.parikshit07@gmail.com`  
- **Domain**: [parikshit07.tech](https://www.parikshit07.tech)  
- **GitHub**: [@parikshit-thakur25](https://github.com/parikshit-thakur25)  
- **LinkedIn**: [parikshit-thakur-1a098a2a3](https://www.linkedin.com/in/parikshit-thakur-1a098a2a3)  

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
