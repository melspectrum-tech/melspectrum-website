import React, { useRef, useEffect, useState } from 'react';

// Hero animated wave background — multi-layer sine waves, slow drift
export function HeroWave({ intensity = 1, palette = 'indigo' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const palettes = {
      indigo: ['rgba(99,102,241,0.55)', 'rgba(34,211,238,0.40)', 'rgba(139,92,246,0.30)'],
      teal:   ['rgba(20,184,166,0.55)', 'rgba(34,211,238,0.40)', 'rgba(99,102,241,0.30)'],
      violet: ['rgba(139,92,246,0.55)', 'rgba(99,102,241,0.40)', 'rgba(34,211,238,0.30)'],
    };
    const colors = palettes[palette] || palettes.indigo;

    const layers = [
      { amp: 60, freq: 0.0035, speed: 0.00018, phase: 0,    color: colors[0], baseY: 0.78 },
      { amp: 90, freq: 0.0022, speed: 0.00012, phase: 1.2,  color: colors[1], baseY: 0.84 },
      { amp: 120, freq: 0.0014, speed: 0.00008, phase: 2.6, color: colors[2], baseY: 0.90 },
    ];

    const draw = () => {
      const t = reduce ? 0 : (performance.now() - startRef.current);
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w/2, h*0.35, 0, w/2, h*0.35, Math.max(w,h)*0.7);
      grad.addColorStop(0, 'rgba(99,102,241,0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,w,h);

      layers.forEach((L, i) => {
        ctx.beginPath();
        const baseY = h * L.baseY;
        const step = 4;
        for (let x = 0; x <= w; x += step) {
          const y = baseY
            + Math.sin(x * L.freq + t * L.speed + L.phase) * L.amp * intensity
            + Math.sin(x * L.freq * 1.7 + t * L.speed * 0.7 + L.phase * 1.3) * L.amp * 0.35 * intensity;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const fill = ctx.createLinearGradient(0, baseY - L.amp, 0, h);
        fill.addColorStop(0, L.color);
        fill.addColorStop(1, 'rgba(3,5,7,0)');
        ctx.fillStyle = fill;
        ctx.fill();

        if (i === 0) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += step) {
            const y = baseY
              + Math.sin(x * L.freq + t * L.speed + L.phase) * L.amp * intensity
              + Math.sin(x * L.freq * 1.7 + t * L.speed * 0.7 + L.phase * 1.3) * L.amp * 0.35 * intensity;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = 'rgba(165,180,252,0.45)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      if (!reduce) rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, palette]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// Tuner spectrogram-ish railsback visual: animated bars + curve overlay
export function TunerVisual() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      tRef.current += reduce ? 0 : 0.012;
      const t = tRef.current;
      ctx.clearRect(0,0,w,h);

      const bars = 64;
      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const phase = i * 0.18 + t;
        const env = Math.exp(-Math.pow((i - bars/2) / 28, 2));
        const noise = 0.5 + 0.5 * Math.sin(phase * 1.7) * Math.cos(phase * 0.6 + i * 0.05);
        const amp = (0.18 + 0.62 * env * noise) * h * 0.55;
        const x = i * bw + 1;
        const barH = Math.max(2, amp);
        const grad = ctx.createLinearGradient(0, h - barH, 0, h);
        grad.addColorStop(0, 'rgba(94, 234, 212, 0.85)');
        grad.addColorStop(1, 'rgba(13, 148, 136, 0.05)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, h - barH, bw - 2, barH);
      }

      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const k = x / w;
        const cents = -8 * Math.exp(-Math.pow((k-0.18)/0.18, 2))
                      + 14 * Math.exp(-Math.pow((k-0.92)/0.12, 2)) * (k > 0.5 ? 1 : 0)
                      + (k - 0.5) * 6;
        const y = h * 0.32 - cents * 1.6;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([3, 5]);
      ctx.moveTo(0, h * 0.32); ctx.lineTo(w, h * 0.32);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  const notes = [{ n: 'A4', c: -0.3 }, { n: 'C5', c: +0.2 }, { n: 'E5', c: -0.1 }, { n: 'G4', c: +0.4 }, { n: 'A4', c: 0.0 }];
  const [needle, setNeedle] = useState(50);
  const [cents, setCents] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const target = notes[i % notes.length];
      setCents(target.c);
      setNeedle(50 + target.c * 80);
      i++;
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="tuner-canvas" />
      <div className="tuner-readout">
        <span>RAILSBACK · LIVE</span>
        <span className="live"><span className="dot"></span>RECORDING</span>
      </div>
      <div className="tuner-meter">
        <div className="tuner-meter__top">
          <span>NOTE · A4 · 440.00 Hz</span>
          <span className="now">{cents >= 0 ? '+' : ''}{cents.toFixed(2)}¢</span>
        </div>
        <div className="tuner-meter__bar">
          <div className="tuner-meter__needle" style={{ left: `calc(${needle}% - 1.5px)` }} />
        </div>
      </div>
    </>
  );
}

// Somnil visual: spectrogram-style sleep audio + sleep stage bar
export function SomnilVisual() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const offsetRef = useRef(0);
  const [stage, setStage] = useState('REM');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let strip = null;
    const buildStrip = () => {
      const sw = 800, sh = Math.max(60, Math.floor(h));
      const off = document.createElement('canvas');
      off.width = sw * dpr; off.height = sh * dpr;
      const o = off.getContext('2d');
      o.setTransform(dpr,0,0,dpr,0,0);
      const cols = sw, rows = sh;
      const img = o.createImageData(cols, rows);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const ny = y / rows;
          const nx = x / cols;
          const base =
            0.55 * Math.exp(-Math.pow((ny - 0.85) / 0.10, 2)) * (0.6 + 0.4*Math.sin(nx*30 + ny*4)) +
            0.45 * Math.exp(-Math.pow((ny - 0.62) / 0.08, 2)) * (0.5 + 0.5*Math.sin(nx*22 + 2)) +
            0.35 * Math.exp(-Math.pow((ny - 0.40) / 0.07, 2)) * (0.4 + 0.5*Math.cos(nx*16 + 1)) +
            0.20 * Math.exp(-Math.pow((ny - 0.18) / 0.06, 2)) * (0.3 + 0.5*Math.sin(nx*9 + 3));
          const noise = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          const v = Math.max(0, Math.min(1, base + (noise - 0.5) * 0.18));
          const r = Math.floor(20 + v * (139 - 20));
          const g = Math.floor(20 + v * (92 - 20) + v*v * 100);
          const b = Math.floor(40 + v * (246 - 40));
          const a = Math.floor(v * 235);
          const idx = (y * cols + x) * 4;
          img.data[idx] = r; img.data[idx+1] = g; img.data[idx+2] = b; img.data[idx+3] = a;
        }
      }
      const tmp = document.createElement('canvas');
      tmp.width = cols; tmp.height = rows;
      tmp.getContext('2d').putImageData(img, 0, 0);
      return tmp;
    };
    strip = buildStrip();

    const draw = () => {
      if (!reduce) offsetRef.current = (offsetRef.current + 0.6) % strip.width;
      ctx.clearRect(0,0,w,h);
      const sw = strip.width;
      const sx = -offsetRef.current;
      ctx.drawImage(strip, sx, 0, sw, h);
      ctx.drawImage(strip, sx + sw, 0, sw, h);

      const fade = ctx.createLinearGradient(0, 0, 0, h * 0.45);
      fade.addColorStop(0, 'rgba(11,11,20,0.85)');
      fade.addColorStop(1, 'rgba(11,11,20,0)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h * 0.45);
      const fade2 = ctx.createLinearGradient(0, h*0.55, 0, h);
      fade2.addColorStop(0, 'rgba(11,11,20,0)');
      fade2.addColorStop(1, 'rgba(11,11,20,0.92)');
      ctx.fillStyle = fade2;
      ctx.fillRect(0, h*0.55, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  useEffect(() => {
    const stages = ['LIGHT', 'REM', 'DEEP', 'REM', 'WAKE'];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % stages.length;
      setStage(stages[i]);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const segs = [
    { w: 4, c: 'rgba(255,255,255,0.25)' },
    { w: 12, c: 'rgba(99,102,241,0.55)' },
    { w: 14, c: 'rgba(99,102,241,0.95)' },
    { w: 10, c: 'rgba(99,102,241,0.55)' },
    { w: 8, c: 'rgba(139,92,246,0.85)' },
    { w: 12, c: 'rgba(99,102,241,0.55)' },
    { w: 8, c: 'rgba(99,102,241,0.95)' },
    { w: 12, c: 'rgba(139,92,246,0.85)' },
    { w: 14, c: 'rgba(99,102,241,0.55)' },
    { w: 6, c: 'rgba(34,211,238,0.6)' },
  ];

  return (
    <>
      <canvas ref={canvasRef} className="somnil-canvas" />
      <div className="somnil-readout">
        <span>SLEEP ACOUSTICS · 16 KHZ</span>
        <span className="stage">● STAGE · {stage}</span>
      </div>
      <div className="somnil-stages">
        <div className="somnil-stages__bar">
          {segs.map((s, i) => (
            <div key={i} className="somnil-stages__seg" style={{ width: s.w + '%', background: s.c }} />
          ))}
        </div>
        <div className="somnil-stages__labels">
          <span>22:30</span><span>02:00</span><span>06:30</span>
        </div>
      </div>
    </>
  );
}