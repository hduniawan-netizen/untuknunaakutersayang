class HeartParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5;
        this.alpha = 1;
        this.gravity = 0.1;
        this.velocityY = Math.random() * -2 - 1;
    }

    update() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.alpha -= 0.02;
        if (this.alpha < 0) this.alpha = 0;
    }

    render(ctx) {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let heartSound, successSound;
let soundEnabled = true;

function loadSounds() {
    heartSound = new Audio('path/to/heart-sound.mp3');
    successSound = new Audio('path/to/success-sound.mp3');
}

function playSound(sound) {
    if (soundEnabled) {
        sound.currentTime = 0;
        sound.play();
    }
}

function setupButtonHandlers() {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');

    yesButton.addEventListener('click', () => {
        playSound(successSound);
        // Additional visual effects for 'Yes' button
    });

    noButton.addEventListener('click', () => {
        playSound(heartSound);
        // Additional visual effects for 'No' button
    });
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    // Update sound toggle visual
}

function createHeartParticle(x, y) {
    const heartParticle = new HeartParticle(x, y);
    heartParticles.push(heartParticle);
}

function handlePointerEvent(event) {
    const x = event.clientX;
    const y = event.clientY;
    createHeartParticle(x, y);
}

function handleResize() {
    // Handle window resize
}

const heartParticles = [];
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartParticles.forEach((particle, index) => {
        particle.update();
        particle.render(ctx);
        if (particle.alpha <= 0) {
            heartParticles.splice(index, 1);
        }
    });
}

window.addEventListener('click', handlePointerEvent);
window.addEventListener('touchstart', handlePointerEvent);
window.addEventListener('resize', handleResize);
loadSounds();
animate();