/**
 * Web Audio API module for WAPA WhatsApp demo sounds.
 * All sounds are generated programmatically -- no audio files needed.
 */

const VOLUME = 0.25;

let audioContext: AudioContext | null = null;
let soundEnabled = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playSent(ctx: AudioContext): void {
  const duration = 0.2;
  const now = ctx.currentTime;

  // White noise burst through a bandpass filter
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2000;
  bandpass.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(VOLUME, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  source.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
  source.stop(now + duration);
}

function playReceived(ctx: AudioContext): void {
  const duration = 0.3;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 880;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(VOLUME, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

function playComplete(ctx: AudioContext): void {
  const duration = 0.4;
  const now = ctx.currentTime;

  // First tone: C5 (523 Hz)
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 523;

  const gain1 = ctx.createGain();
  gain1.gain.setValueAtTime(0.001, now);
  gain1.gain.linearRampToValueAtTime(VOLUME, now + 0.01);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + duration);

  // Second tone: E5 (659 Hz), staggered by 100ms
  const stagger = 0.1;

  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 659;

  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0.001, now + stagger);
  gain2.gain.linearRampToValueAtTime(VOLUME, now + stagger + 0.01);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + stagger + duration);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start(now + stagger);
  osc2.stop(now + stagger + duration);
}

export function playSound(type: 'sent' | 'received' | 'complete'): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();

    // Resume suspended context (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    switch (type) {
      case 'sent':
        playSent(ctx);
        break;
      case 'received':
        playReceived(ctx);
        break;
      case 'complete':
        playComplete(ctx);
        break;
    }
  } catch {
    // Gracefully handle browsers that block Web Audio
  }
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}
