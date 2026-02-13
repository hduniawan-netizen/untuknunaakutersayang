// sounds.js

// Create a context for the Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate a heart click sound
function heartClickSound() {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Type of sound waveform
    oscillator.frequency.setValueAtTime(900, audioContext.currentTime); // Frequency in hertz
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume

    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start and stop the sound
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Function to generate a romantic sound effect
function romanticSound() {
    const noise = audioContext.createBufferSource();
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
    }
    noise.buffer = buffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    // Connect the nodes
    noise.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start and stop the noise
    noise.start();
    noise.stop(audioContext.currentTime + 0.5);
}

// Export functions for use in the interactive page
export { heartClickSound, romanticSound };