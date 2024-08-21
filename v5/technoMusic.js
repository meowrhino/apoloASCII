
let audioCtx = null;

function createTechnoMusic() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(130, audioCtx.currentTime); // Nota base
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    // Detener la música después de un tiempo
    setTimeout(() => {
        oscillator.stop();
    }, 5000); // 5 segundos de duración
}
