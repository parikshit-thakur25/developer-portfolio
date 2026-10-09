document.addEventListener('DOMContentLoaded', () => {
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

    // Cyber Terminal Input Handler
    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Echo Command
                appendTerminalLine(`parikshit@local:~$ ${cmd}`, 'term-line');

                // Execute Command
                switch (cmd) {
                    case 'help':
                        appendTerminalLine('> Available commands: whoami, projects, skills, contact, status, domain, clear', 'term-response cyan');
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

                // Scroll to bottom
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

    // Smooth Scroll for Nav Links
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
