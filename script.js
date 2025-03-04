// Configuration
const targetDate = new Date('2025-04-29T00:00:00');
const elements = {
    message: document.getElementById('secretMessage'),
    debug: document.getElementById('debug'),
    timer: document.getElementById('timer')
};

// Set proper viewport height for mobile
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Add these functions
function createParticles() {
    const particles = ['❤️', '✨', '🎉', '🎂', '🎁', '💖', '🥳'];
    const particleCount = 25;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation properties
        particle.style.animationDuration = Math.random() * 2 + 3 + 's';
        particle.style.animationDelay = Math.random() * 1 + 's';
        particle.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => particle.remove(), 3000);
    }
}

// Add this function to create confetti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`; // Random color
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti container after animation ends
    setTimeout(() => confettiContainer.remove(), 5000);
}

// iOS compatibility
document.addEventListener('touchstart', function() {}, { passive: true });

function updateDisplay() {
    const now = new Date();
    const timeValid = now >= targetDate;
    
    elements.message.classList.toggle('blur-effect', !timeValid);
    
    // Debug info
    elements.debug.innerHTML = `
        📅 Device Time: ${now.toLocaleString()}<br>
        🎯 Target Date: ${targetDate.toLocaleDateString()}<br>
        🔓 Status: ${timeValid ? 'UNLOCKED! 🎉' : 'Locked until your special day'}
    `;

    // Countdown timer
    if(!timeValid) {
        const diff = targetDate - now;
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        elements.timer.innerHTML = `
            🎂 Reveals in:<br>
            <div class="countdown">
                <div class="countdown-item">
                    <div class="countdown-number">${days}</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${hours.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${minutes.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${seconds.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
        `;
    } else {
        elements.timer.innerHTML = "<b>🎉💖 HAPPY BIRTHDAY! 💖🎉 <br> MY CUTE Eruma Maade </b>";
        elements.message.style.backgroundColor = '#fff0f5';
        // Create confetti when the target date is reached
        createConfetti();

        // Create continuous confetti every 2 seconds
        setInterval(createConfetti, 2000);
    }
}

// Initialize
setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setInterval(updateDisplay, 1000);
updateDisplay();