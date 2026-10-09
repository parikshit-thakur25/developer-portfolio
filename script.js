document.addEventListener('DOMContentLoaded', () => {
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

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
        lockStateText.textContent = 'Owner Admin';
        ownerLockBtn.style.borderColor = '#10b981';
        ownerLockBtn.style.color = '#10b981';

        if (ownerAdminBanner) ownerAdminBanner.classList.remove('hidden');

        // Show private owner notes on projects
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

        // Hide private owner notes on projects
        document.querySelectorAll('.owner-only').forEach(el => {
            el.classList.add('hidden');
        });
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
