function createTechnoMusic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(130, audioCtx.currentTime); // Nota base
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    // Cambiar la frecuencia periódicamente para simular un ritmo techno
    setInterval(() => {
        oscillator.frequency.setValueAtTime(130 + Math.random() * 50, audioCtx.currentTime);
    }, 200);
}

createTechnoMusic();
