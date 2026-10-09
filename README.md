# ⚡ Parikshit Thakur — Personal Developer Portfolio & Cyber Terminal

[![Live Portfolio](https://img.shields.io/badge/Live_Domain-parikshit07.tech-06b6d4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.parikshit07.tech)
[![GitHub Repository](https://img.shields.io/badge/GitHub_Repo-developer--portfolio-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/parikshit-thakur25/developer-portfolio)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

Welcome to the source repository of my personal developer portfolio and interactive terminal! Built completely from scratch using vanilla HTML5, CSS3, and JavaScript — no heavy frameworks or external dependencies required.

---

## 🔥 Features & Key Highlights

- **✍️ Cursive Handwriting Intro Splash**: A smooth handwriting preloader (`"hello ,"` ➔ `"parikshit"`) built with custom typing logic and a quick `SKIP ↵` option.
- **💻 Interactive Cyber Terminal (`parikshit@tech-lab:~`)**: A built-in CLI simulator supporting commands like `whoami`, `skills`, `projects`, `contact`, `status`, `domain`, `help`, and `clear`.
- **🔐 Owner Admin Mode & Security**: PIN-protected control panel (`1234` default) allowing me to manage resume uploads and certificates directly on the live page, complete with a `🔑 Change Admin Password` feature.
- **📄 PDF Resume Upload & Viewer**: Upload, store, view, or replace resume PDFs locally using the HTML5 `FileReader` API without needing any external server database.
- **🧠 Featured Machine Learning & Web Projects**: Includes real project cards like **CardioVision AI** (Heart Disease Risk Predictor built with Python, Scikit-Learn, and Flask) with clean white action buttons and direct GitHub repo links.
- **🌐 Custom Domain Setup**: Hosted on GitHub Pages with custom domain routing ([parikshit07.tech](https://www.parikshit07.tech)) and automated SSL/TLS encryption.

---

## 🛠️ Tech Stack & How It Works

| Module | Tech Used | Description |
| :--- | :--- | :--- |
| **Structure & Layout** | HTML5 | Clean, semantic structure with accessible tags and responsive meta setup. |
| **Styling & Theme** | CSS3 (Vanilla) | Ambient glow mesh, dark mode glassmorphism, responsive grid layouts, smooth CSS keyframes. |
| **Client Scripting** | JavaScript (ES6+) | Handles terminal emulation, typing animations, modal state, and `localStorage` persistence. |
| **Resume & Data Storage** | HTML5 `FileReader` + `localStorage` | Client-side file uploading and instant PDF rendering without backend dependencies. |
| **Hosting & SSL** | GitHub Pages + `get.tech` | Custom domain configuration (`parikshit07.tech`) secured with Let's Encrypt HTTPS. |

---

## 📁 Repository Structure

```text
developer-portfolio/
├── CNAME               # Custom domain configuration (parikshit07.tech)
├── LICENSE             # MIT License open-source permission file
├── README.md           # Developer documentation & project breakdown
├── index.html          # Main HTML structure & portfolio contents
├── style.css           # Custom CSS design system, dark glassmorphism, animations
├── script.js           # Preloader script, terminal logic, admin PIN & uploader
└── scripts/
    └── setup.sh        # Quick bash setup script for local testing
```

---

## 🚀 Quick Start & Running Locally

### Method 1: Using the Automated Setup Script
```bash
# Clone this repository
git clone https://github.com/parikshit-thakur25/developer-portfolio.git
cd developer-portfolio

# Make the setup script executable and run it
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Method 2: Python Local Server
```bash
# Launch a local development server on port 8000
python3 -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

---

## 👤 Author & Connect

**Parikshit Thakur**  
- **Website**: [parikshit07.tech](https://www.parikshit07.tech)  
- **Email**: [work.parikshit07@gmail.com](mailto:work.parikshit07@gmail.com)  
- **GitHub**: [@parikshit-thakur25](https://github.com/parikshit-thakur25)  
- **LinkedIn**: [parikshit-thakur-1a098a2a3](https://www.linkedin.com/in/parikshit-thakur-1a098a2a3)  

---

## 📜 License
Handcrafted & Designed with ❤️ by **Parikshit Thakur**. Distributed under the [MIT License](LICENSE).
