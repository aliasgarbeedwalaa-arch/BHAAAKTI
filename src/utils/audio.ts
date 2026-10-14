// Web Audio API realistic stadium cheer / applause synthesizer

let audioCtx: AudioContext | null = null;
let isPlayingCheer = false;
let cheerStopFn: (() => void) | null = null;

export function playWhistleSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.15);
    osc.frequency.setValueAtTime(2800, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (err) {
    console.warn('Audio not allowed yet:', err);
  }
}

export function toggleStadiumAmbience(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlayingCheer && cheerStopFn) {
    cheerStopFn();
    isPlayingCheer = false;
    onStateChange?.(false);
    return false;
  }

  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Create pink noise buffer for crowd roar
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate vast open stadium resonance
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.8, audioCtx.currentTime);

    // Filter LFO to create waves of crowd chanting
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.4, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(180, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 1.2);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    whiteNoise.start();
    lfo.start();

    isPlayingCheer = true;
    onStateChange?.(true);

    cheerStopFn = () => {
      try {
        if (audioCtx) {
          masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
          setTimeout(() => {
            try {
              whiteNoise.stop();
              lfo.stop();
              whiteNoise.disconnect();
              filter.disconnect();
              masterGain.disconnect();
            } catch {
              // ignore
            }
          }, 850);
        }
      } catch {
        // ignore
      }
    };

    return true;
  } catch (err) {
    console.warn('Audio context initialization failed:', err);
    return false;
  }
}
