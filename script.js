document.addEventListener('DOMContentLoaded', () => {
    // Full-Screen Intro Splash Screen Preloader
    initIntroSplash();

    // Typewriter Greeting
    initTypewriterGreeting();

    // Resume Upload & Delete Handler
    initResumeUpload();

    // PIN Admin Modal Elements
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

        const changePinBtn = document.getElementById('changePinBtn');
        if (changePinBtn) {
            changePinBtn.addEventListener('click', () => {
                const currentPin = localStorage.getItem('parikshit_admin_pin') || '1234';
                const inputOld = prompt('Enter your current Admin Password / PIN:');
                if (inputOld === currentPin) {
                    const newPin = prompt('Enter your NEW Admin Password / PIN (at least 4 characters):');
                    if (newPin && newPin.trim().length >= 4) {
                        localStorage.setItem('parikshit_admin_pin', newPin.trim());
                        alert('🔑 Success! Your Admin Password has been updated successfully.');
                    } else if (newPin !== null) {
                        alert('Invalid password! Password must be at least 4 characters.');
                    }
                } else if (inputOld !== null) {
                    alert('❌ Incorrect current Admin password!');
                }
            });
        }
    }

    function handlePinVerification() {
        const enteredPin = ownerPinInput.value.trim();
        const storedPin = localStorage.getItem('parikshit_admin_pin') || '1234';
        
        if (enteredPin === storedPin) {
            unlockOwnerMode();
            pinModal.classList.add('hidden');
            ownerPinInput.value = '';
            pinError.classList.add('hidden');
        } else {
            pinError.classList.remove('hidden');
            ownerPinInput.value = '';
            ownerPinInput.focus();
        }
    }

    function unlockOwnerMode() {
        isOwnerUnlocked = true;
        lockIcon.textContent = '🔓';
        lockStateText.textContent = 'Owner Admin Mode';
        ownerLockBtn.style.borderColor = '#a855f7';
        ownerLockBtn.style.background = 'rgba(168, 85, 247, 0.25)';
        
        if (ownerAdminBanner) {
            ownerAdminBanner.classList.remove('hidden');
        }

        // Show owner upload & delete elements
        document.querySelectorAll('.owner-only').forEach(el => {
            el.classList.remove('hidden');
        });
    }

    function lockOwnerMode() {
        isOwnerUnlocked = false;
        lockIcon.textContent = '🔒';
        lockStateText.textContent = 'Visitor Mode';
        ownerLockBtn.style.borderColor = 'rgba(168, 85, 247, 0.3)';
        ownerLockBtn.style.background = 'rgba(168, 85, 247, 0.1)';

        if (ownerAdminBanner) {
            ownerAdminBanner.classList.add('hidden');
        }

        // Hide owner elements
        document.querySelectorAll('.owner-only').forEach(el => {
            el.classList.add('hidden');
        });
    }

    // Copy Email to Clipboard Handler
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = 'Copied! ✅';
                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                }, 2000);
            });
        });
    }

    // Interactive Cyber Terminal Logic
    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                if (command === '') return;

                // Log user command line
                appendTerminalLine(`parikshit@local:~$ ${command}`, 'term-line');
                processCommand(command);

                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                appendTerminalLine('> Available Commands: whoami, status, skills, projects, contact, clear', 'term-response cyan');
                break;
            case 'whoami':
                appendTerminalLine('> Parikshit Thakur — Exploring Full-Stack Web Dev & Machine Learning', 'term-response cyan');
                break;
            case 'status':
                appendTerminalLine('> Status: 🟢 Actively Building Projects & Learning New Technologies', 'term-response green');
                break;
            case 'skills':
                appendTerminalLine('> Stack: MERN (MongoDB, Express, React, Node.js), JavaScript, HTML5, CSS3, Python, Scikit-Learn, Flask', 'term-response cyan');
                break;
            case 'projects':
                appendTerminalLine('> Projects: CardioVision AI (Heart Disease Risk Predictor with Python & Scikit-Learn)', 'term-response green');
                break;
            case 'contact':
                appendTerminalLine('> Email: work.parikshit07@gmail.com | Website: parikshit07.tech', 'term-response cyan');
                break;
            case 'clear':
                terminalOutput.innerHTML = `
                    <p class="term-line"><span class="term-prompt">parikshit@local:~$</span> clear</p>
                    <p class="term-response green">&gt; Terminal cleared.</p>
                `;
                break;
            default:
                appendTerminalLine(`> Command not recognized: '${cmd}'. Type 'help' for available commands.`, 'term-response red');
                break;
        }
    }

    function appendTerminalLine(text, className) {
        const p = document.createElement('p');
        p.className = className;
        p.innerHTML = text;
        terminalOutput.appendChild(p);
    }
});

/* Cursive Handwriting Intro Splash Screen Sequence */
function initIntroSplash() {
    const splashOverlay = document.getElementById('introSplash');
    const splashText = document.getElementById('splashText');
    const skipSplashBtn = document.getElementById('skipSplashBtn');

    if (!splashOverlay || !splashText) return;

    let hasExited = false;

    function exitSplash() {
        if (hasExited) return;
        hasExited = true;
        splashOverlay.classList.add('splash-exit-anim');
        setTimeout(() => {
            splashOverlay.style.display = 'none';
        }, 850);
    }

    if (skipSplashBtn) {
        skipSplashBtn.addEventListener('click', exitSplash);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
            exitSplash();
        }
    });

    const phase1 = "hello ,";
    const phase2 = "parikshit";

    let charIdx = 0;
    const typeSpeed = 80;
    const deleteSpeed = 50;

    function typePhase1() {
        if (hasExited) return;
        if (charIdx < phase1.length) {
            splashText.textContent += phase1.charAt(charIdx);
            charIdx++;
            setTimeout(typePhase1, typeSpeed);
        } else {
            setTimeout(deletePhase1, 700);
        }
    }

    function deletePhase1() {
        if (hasExited) return;
        if (splashText.textContent.length > 0) {
            splashText.textContent = splashText.textContent.slice(0, -1);
            setTimeout(deletePhase1, deleteSpeed);
        } else {
            charIdx = 0;
            setTimeout(typePhase2, 300);
        }
    }

    function typePhase2() {
        if (hasExited) return;
        if (charIdx < phase2.length) {
            splashText.textContent += phase2.charAt(charIdx);
            charIdx++;
            setTimeout(typePhase2, typeSpeed);
        } else {
            setTimeout(exitSplash, 900);
        }
    }

    setTimeout(typePhase1, 300);
}

/* Live Word-by-Word Typewriter Greeting */
function initTypewriterGreeting() {
    const textEl = document.getElementById('typewriterText');
    if (!textEl) return;

    const phrases = [
        "Welcome to Parikshit Thakur's Tech Lab 🚀",
        "Exploring Full-Stack Web Development & ML 🫀",
        "Building CardioVision AI & Modern Web Apps ⚡"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            textEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            textEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 40 : 70;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeLoop, speed);
    }

    typeLoop();
}

/* Resume PDF Upload & Delete Handler */
function initResumeUpload() {
    const resumeFileInput = document.getElementById('resumeFileInput');
    const noResumePlaceholder = document.getElementById('noResumePlaceholder');
    const activeResumeContainer = document.getElementById('activeResumeContainer');
    const activeResumeName = document.getElementById('activeResumeName');
    const activeResumeDate = document.getElementById('activeResumeDate');
    const viewActiveResumeBtn = document.getElementById('viewActiveResumeBtn');
    const deleteActiveResumeBtn = document.getElementById('deleteActiveResumeBtn');

    function renderResumeState() {
        const storedPdfData = localStorage.getItem('parikshit_resume_data');
        const storedPdfName = localStorage.getItem('parikshit_resume_name');

        if (storedPdfData && storedPdfName) {
            if (noResumePlaceholder) noResumePlaceholder.classList.add('hidden');
            if (activeResumeContainer) activeResumeContainer.classList.remove('hidden');

            if (activeResumeName) activeResumeName.textContent = storedPdfName;
            if (activeResumeDate) activeResumeDate.textContent = 'Active PDF Document • Verified ✅';
            if (viewActiveResumeBtn) viewActiveResumeBtn.href = storedPdfData;
        } else {
            if (noResumePlaceholder) noResumePlaceholder.classList.remove('hidden');
            if (activeResumeContainer) activeResumeContainer.classList.add('hidden');
        }
    }

    renderResumeState();

    if (resumeFileInput) {
        resumeFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.type !== 'application/pdf') {
                alert('Please upload a valid PDF file (.pdf)!');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const pdfDataUrl = event.target.result;
                localStorage.setItem('parikshit_resume_data', pdfDataUrl);
                localStorage.setItem('parikshit_resume_name', file.name);

                alert(`📄 Resume "${file.name}" uploaded successfully!`);
                renderResumeState();
            };
            reader.readAsDataURL(file);
        });
    }

    if (deleteActiveResumeBtn) {
        deleteActiveResumeBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your uploaded resume PDF?')) {
                localStorage.removeItem('parikshit_resume_data');
                localStorage.removeItem('parikshit_resume_name');
                renderResumeState();
                alert('🗑️ Resume deleted successfully.');
            }
        });
    }
}
