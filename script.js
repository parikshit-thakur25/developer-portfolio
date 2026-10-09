document.addEventListener('DOMContentLoaded', () => {
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

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
