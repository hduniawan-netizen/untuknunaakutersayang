// script.js

// Love Particle Effect

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedY = Math.random() * 3 + 1;
    this.color = 'rgba(255, 0, 0, 0.8)';
}

Particle.prototype.update = function() {
    this.y += this.speedY;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function createParticles(e) {
    const xPos = e.x;
    const yPos = e.y;
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.y > canvas.height) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', createParticles);
animate();

// Button Click Handlers
function onClick() {
    // Interactive animations on "Jatuhkan Cinta" button click
    createParticles(event);
    playSound();
}

// Sound Effect Functions
const audio = new Audio('sound_effect.mp3');
function playSound() {
    audio.play();
}

// Sound Toggle Functionality
let soundOn = true;
function toggleSound() {
    soundOn = !soundOn;
    soundOn ? audio.play() : audio.pause();
}

// Reset Functionality
function reset() {
    particles = [];
}

document.getElementById('jatuhkanCinta').addEventListener('click', onClick);

document.getElementById('toggleSound').addEventListener('click', toggleSound);

document.getElementById('resetButton').addEventListener('click', reset);
