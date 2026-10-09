document.addEventListener('DOMContentLoaded', () => {
    // Canvas 3D Particle System
    initAmbientCanvas();

    // 3D Tilt Cards Effect
    init3DTilt();

    // Editable LinkedIn Handle System
    initLinkedInHandler();

    // Resume Modal
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

    // PIN Admin Modal
    const pinModal = document.getElementById('pinModal');
    const ownerLockBtn = document.getElementById('ownerLockBtn');
    const closePinModal = document.getElementById('closePinModal');
    const verifyPinBtn = document.getElementById('verifyPinBtn');
    const ownerPinInput = document.getElementById('ownerPinInput');
    const pinError = document.getElementById('pinError');
    const lockIcon = document.getElementById('lockIcon');
    const lockStateText = document.getElementById('lockStateText');
    const ownerAdminBanner = document.getElementById('ownerAdminBanner');
    const lockNowBtn = document.getElementById('lockNowBtn');

    // Copy Email Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');

    // Cyber Terminal Elements
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    let isOwnerUnlocked = false;

    // Toggle Resume Modal
    if (openResumeBtn && resumeModal && closeResumeBtn) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('hidden');
        });

        closeResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('hidden');
        });

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.add('hidden');
            }
        });
    }

    // Owner Lock / Unlock Logic
    if (ownerLockBtn && pinModal) {
        ownerLockBtn.addEventListener('click', () => {
            if (isOwnerUnlocked) {
                lockOwnerMode();
            } else {
                pinModal.classList.remove('hidden');
                ownerPinInput.focus();
            }
        });

        closePinModal.addEventListener('click', () => {
            pinModal.classList.add('hidden');
            pinError.classList.add('hidden');
        });

        verifyPinBtn.addEventListener('click', handlePinVerification);
        ownerPinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handlePinVerification();
        });

        if (lockNowBtn) {
            lockNowBtn.addEventListener('click', lockOwnerMode);
        }
    }

    function handlePinVerification() {
        const pin = ownerPinInput.value.trim();
        // Default PIN: 1234
        if (pin === '1234') {
            unlockOwnerMode();
            pinModal.classList.add('hidden');
            ownerPinInput.value = '';
            pinError.classList.add('hidden');
        } else {
            pinError.classList.remove('hidden');
        }
    }

    function unlockOwnerMode() {
        isOwnerUnlocked = true;
        lockIcon.textContent = '🔓';
        lockStateText.textContent = 'Owner Admin Mode';
        ownerLockBtn.style.borderColor = '#10b981';
        ownerLockBtn.style.color = '#10b981';

        if (ownerAdminBanner) ownerAdminBanner.classList.remove('hidden');

        document.querySelectorAll('.owner-only').forEach(el => {
            el.classList.remove('hidden');
        });
    }

    function lockOwnerMode() {
        isOwnerUnlocked = false;
        lockIcon.textContent = '🔒';
        lockStateText.textContent = 'Visitor Mode';
        ownerLockBtn.style.borderColor = 'var(--card-border)';
        ownerLockBtn.style.color = 'var(--text-main)';

        if (ownerAdminBanner) ownerAdminBanner.classList.add('hidden');

        document.querySelectorAll('.owner-only').forEach(el => {
            el.classList.add('hidden');
        });
    }

    // 1-Click Copy Email
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = 'Copied! ✅';
                copyEmailBtn.style.background = '#10b981';
                copyEmailBtn.style.color = '#fff';
                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                    copyEmailBtn.style.color = 'var(--text-main)';
                }, 2000);
            });
        });
    }

    // Editable LinkedIn URL Handler
    function initLinkedInHandler() {
        const editLinkedinBtn = document.getElementById('editLinkedinBtn');
        const linkedinBtn = document.getElementById('linkedinBtn');
        const linkedinDisplay = document.getElementById('linkedinDisplay');

        const savedUrl = localStorage.getItem('parikshit_linkedin_url');
        if (savedUrl && linkedinBtn && linkedinDisplay) {
            linkedinBtn.href = savedUrl;
            linkedinDisplay.textContent = savedUrl.replace('https://', '');
        }

        if (editLinkedinBtn) {
            editLinkedinBtn.addEventListener('click', () => {
                const newUrl = prompt('Enter your LinkedIn profile URL (e.g., https://linkedin.com/in/yourname):', linkedinBtn ? linkedinBtn.href : '');
                if (newUrl && newUrl.trim() !== '') {
                    const formattedUrl = newUrl.startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`;
                    localStorage.setItem('parikshit_linkedin_url', formattedUrl);
                    if (linkedinBtn) linkedinBtn.href = formattedUrl;
                    if (linkedinDisplay) linkedinDisplay.textContent = formattedUrl.replace('https://', '');
                }
            });
        }
    }

    // Cyber Terminal Handler
    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                appendTerminalLine(`parikshit@local:~$ ${cmd}`, 'term-line');

                switch (cmd) {
                    case 'help':
                        appendTerminalLine('> Commands: whoami, projects, skills, contact, status, domain, clear', 'term-response cyan');
                        break;
                    case 'whoami':
                        appendTerminalLine('> Parikshit Thakur — Machine Learning & Software Engineer', 'term-response cyan');
                        break;
                    case 'projects':
                        appendTerminalLine('> 🚀 CardioVision AI — Clinical Heart Disease Risk Engine (Render Deployed)', 'term-response green');
                        break;
                    case 'skills':
                        appendTerminalLine('> ML: Scikit-Learn, SVM, Random Forest | Web: Flask, REST APIs, HTML5/CSS3/JS', 'term-response');
                        break;
                    case 'contact':
                        appendTerminalLine('> ✉️ work.parikshit07@gmail.com | 🌐 parikshit07.tech | 🐙 github.com/parikshit-thakur25', 'term-response green');
                        break;
                    case 'status':
                        appendTerminalLine('> 🟢 Open for Software Engineering & ML Roles / Internships', 'term-response green');
                        break;
                    case 'domain':
                        appendTerminalLine('> 🌐 parikshit07.tech — Claimed via GitHub Student Pack', 'term-response cyan');
                        break;
                    case 'clear':
                        terminalOutput.innerHTML = '';
                        break;
                    default:
                        appendTerminalLine(`> Command not recognized: '${cmd}'. Type 'help' for available commands.`, 'term-response');
                        break;
                }

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    function appendTerminalLine(text, className) {
        const p = document.createElement('p');
        p.className = className;
        p.textContent = text;
        terminalOutput.appendChild(p);
    }

    // 3D Ambient Particle Canvas Animation
    function initAmbientCanvas() {
        const canvas = document.getElementById('ambientCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = 45;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        let mouseX = width / 2;
        let mouseY = height / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
                ctx.fill();

                // Draw connecting lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // 3D Card Tilt Effect
    function init3DTilt() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (centerY - y) / 18;
                const rotateY = (x - centerX) / 18;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
