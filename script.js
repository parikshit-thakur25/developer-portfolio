document.addEventListener('DOMContentLoaded', () => {
    // Full-Screen Intro Splash Screen Preloader (Session-based)
    initIntroSplash();

    // Typewriter Greeting
    initTypewriterGreeting();

    // Copy Email Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');

    // Cyber Terminal Elements
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

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

/* Cursive Handwriting Intro Splash Screen Sequence (Plays once per session like abhinesh.codes) */
function initIntroSplash() {
    const splashOverlay = document.getElementById('introSplash');
    const splashText = document.getElementById('splashText');
    const skipSplashBtn = document.getElementById('skipSplashBtn');

    if (!splashOverlay || !splashText) return;

    // Check if intro has already been seen in this session
    if (sessionStorage.getItem('parikshit_intro_seen')) {
        splashOverlay.style.display = 'none';
        return;
    }

    let hasExited = false;

    function exitSplash() {
        if (hasExited) return;
        hasExited = true;
        sessionStorage.setItem('parikshit_intro_seen', 'true');
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
