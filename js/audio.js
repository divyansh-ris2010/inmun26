/* ============================================================
   INMUN 2026 — Web Audio API Synthesizer & Sound Design
   100% self-contained, zero external audio assets required.
   ============================================================ */

class INMUNAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientLfo = null;
    this.ambientPlaying = false;
    this.hasUserInteracted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Resonant wooden gavel strike: Transient mallet tap + resonant soundboard decay
  playGavel() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Transient click (mallet head impact)
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(380, now);
    clickOsc.frequency.exponentialRampToValueAtTime(70, now + 0.06);
    clickGain.gain.setValueAtTime(0.85, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.06);

    // Resonant wooden body (hollow sounding block)
    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(145, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(48, now + 0.45);
    bodyGain.gain.setValueAtTime(0.95, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.ctx.destination);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.5);

    // Deep sub-thud
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(72, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.35);
    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);

    // Hall resonance reflection
    const hallOsc = this.ctx.createOscillator();
    const hallGain = this.ctx.createGain();
    hallOsc.type = 'triangle';
    hallOsc.frequency.setValueAtTime(210, now + 0.03);
    hallOsc.frequency.exponentialRampToValueAtTime(80, now + 0.55);
    hallGain.gain.setValueAtTime(0.2, now + 0.03);
    hallGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    hallOsc.connect(hallGain);
    hallGain.connect(this.ctx.destination);
    hallOsc.start(now + 0.03);
    hallOsc.stop(now + 0.55);
  }

  // Delicate high-tech diplomatic hover chime
  playHover() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1318.5, now); // E6
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Accord / Success chime (when quiz is solved or search matched)
  playSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.035, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.35);
    });
  }

  // Toggle ambient diplomatic drone
  toggleAmbience() {
    this.init();
    if (!this.ctx) return false;
    if (this.ambientPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  startAmbience() {
    if (!this.ctx || this.ambientPlaying) return;
    const now = this.ctx.currentTime;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.0001, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.03, now + 3);

    // Dual soothing harmonic oscillators (warm root and fifth)
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(110.0, now); // A2

    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = 'sine';
    this.ambientOsc2.frequency.setValueAtTime(164.81, now); // E3

    // Low frequency modulation for organic celestial breathing
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, now);
    lfoGain.gain.setValueAtTime(0.008, now);
    lfo.connect(lfoGain.gain);

    this.ambientOsc1.connect(this.ambientGain);
    this.ambientOsc2.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start();
    this.ambientOsc2.start();
    this.ambientPlaying = true;
  }

  stopAmbience() {
    if (!this.ambientPlaying || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    setTimeout(() => {
      try {
        if (this.ambientOsc1) this.ambientOsc1.stop();
        if (this.ambientOsc2) this.ambientOsc2.stop();
      } catch (e) {}
      this.ambientPlaying = false;
    }, 1200);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientPlaying) {
      this.stopAmbience();
    }
    return this.isMuted;
  }
}

window.INMUN_AUDIO = new INMUNAudioEngine();
