document.addEventListener('DOMContentLoaded', () => {
    // Live Word-by-Word / Letter-by-Letter Typewriter Greeting
    initTypewriterGreeting();

    // Editable LinkedIn Handle System
    initLinkedInHandler();

    // Resume Upload & Download Handlers
    initResumeUpload();

    // Certificate Upload Handler
    initCertUpload();

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

    // Live Word-by-Word Typewriter Greeting Animation
    function initTypewriterGreeting() {
        const textElement = document.getElementById('typewriterText');
        if (!textElement) return;

        const phrases = [
            "Hello & Welcome! I'm Parikshit Thakur — Full-Stack Developer & ML Engineer.",
            "Namaste! 🙏 Building Full-Stack MERN Apps, TailwindCSS Interfaces, REST APIs & Scikit-Learn ML.",
            "Explore my CardioVision AI project & verified credentials below!"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 60;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2500; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }

            setTimeout(type, typingSpeed);
        }

        type();
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

    // Resume Upload & Local Save Handler
    function initResumeUpload() {
        const resumeFileInput = document.getElementById('resumeFileInput');
        const resumeStatusMsg = document.getElementById('resumeStatusMsg');

        if (resumeFileInput && resumeStatusMsg) {
            const savedResumeName = localStorage.getItem('parikshit_resume_filename');
            if (savedResumeName) {
                resumeStatusMsg.textContent = `Uploaded Active Resume: ${savedResumeName} ✅`;
                resumeStatusMsg.classList.remove('hidden');
            }

            resumeFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    localStorage.setItem('parikshit_resume_filename', file.name);
                    resumeStatusMsg.textContent = `New Resume Uploaded: ${file.name} ✅ (Saved locally)`;
                    resumeStatusMsg.classList.remove('hidden');
                    alert(`Successfully uploaded custom resume: ${file.name}!`);
                }
            });
        }
    }

    // Certificate Upload Handler
    function initCertUpload() {
        const certFileInput = document.getElementById('certFileInput');
        const certificatesGrid = document.getElementById('certificatesGrid');

        if (certFileInput && certificatesGrid) {
            certFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const certTitle = prompt('Enter Certificate Title (e.g. AWS Certified Cloud Practitioner):', file.name.split('.')[0]) || file.name;
                    const certIssuer = prompt('Enter Issuer / Institution Name:', 'Verified Institution') || 'Verified Institution';

                    const newCard = document.createElement('div');
                    newCard.className = 'cert-card';
                    newCard.innerHTML = `
                        <div class="cert-badge-icon">🏅</div>
                        <div class="cert-info">
                            <span class="cert-issuer">${certIssuer}</span>
                            <h3>${certTitle}</h3>
                            <p>Custom uploaded credential: ${file.name}</p>
                            <span class="cert-date">Uploaded: Just now • Verified ✅</span>
                        </div>
                    `;
                    certificatesGrid.prepend(newCard);
                    alert(`Certificate "${certTitle}" added to your credentials section!`);
                }
            });
        }
    }

    // Cyber Terminal Input Handler
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
                        appendTerminalLine('> Parikshit Thakur — Full-Stack (MERN) Developer & Machine Learning Engineer', 'term-response cyan');
                        break;
                    case 'projects':
                        appendTerminalLine('> 🚀 CardioVision AI — Clinical Heart Disease Risk Engine (Render Deployed)', 'term-response green');
                        break;
                    case 'skills':
                        appendTerminalLine('> Full-Stack: MERN Stack (MongoDB, Express, React, Node.js), TailwindCSS | ML & Backend: Scikit-Learn, REST APIs, Python 3', 'term-response');
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
