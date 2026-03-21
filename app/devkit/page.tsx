import Link from 'next/link';

const bom = [
  { ref: 'U3', part: 'Seeed Studio XIAO ESP32-S3', role: 'The Brain', connection: 'Main 3.7V Rail' },
  { ref: 'U4', part: 'Raspberry Pi Zero 2W', role: 'The Muscle', connection: '5V Regulator Out' },
  { ref: 'U1', part: 'TP4056 USB-C Module', role: 'Charging', connection: 'Battery / System Rail' },
  { ref: 'U2', part: 'Pololu 5V S13V30F5', role: 'Pi Power', connection: 'Controlled via PI_EN' },
  { ref: 'U5', part: 'TTP223 Touch Sensor', role: 'Wake / UI', connection: 'ESP32 Pin D0' },
  { ref: 'U6', part: 'INMP441 MEMS Mic', role: 'Audio In', connection: 'ESP32 I2S Bus' },
  { ref: 'U7', part: 'MAX98357A Class-D Amp', role: 'Audio Out', connection: 'ESP32 I2S Bus' },
  { ref: 'SPK1', part: 'uxcell 1W 8 Ohm Speaker', role: 'Speaker', connection: 'Amp output pins' },
  { ref: 'D1', part: 'WS2812B LED', role: 'Status Light', connection: 'ESP32 Pin D1' },
];

function DevKitIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <svg viewBox="0 0 500 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="deviceGrad" cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#2a1f4a" />
            <stop offset="100%" stopColor="#0e0b1a" />
          </radialGradient>
          <radialGradient id="screenGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#4a2fa0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a0f38" stopOpacity="0.2" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="chipGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="250" cy="270" rx="200" ry="180" fill="url(#glowCenter)" />
        <ellipse cx="250" cy="270" rx="175" ry="155" stroke="rgba(124,58,237,0.08)" strokeWidth="1" strokeDasharray="4 6" />
        <ellipse cx="250" cy="270" rx="215" ry="190" stroke="rgba(124,58,237,0.05)" strokeWidth="1" strokeDasharray="3 8" />
        <rect x="172" y="138" width="106" height="170" rx="22" fill="rgba(0,0,0,0.4)" />
        <rect x="168" y="130" width="106" height="172" rx="22" fill="url(#deviceGrad)" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" />
        <rect x="168" y="130" width="106" height="172" rx="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="180" y="148" width="82" height="96" rx="12" fill="url(#screenGrad)" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
        <line x1="188" y1="162" x2="254" y2="162" stroke="rgba(167,139,250,0.15)" strokeWidth="1" />
        <line x1="188" y1="172" x2="248" y2="172" stroke="rgba(167,139,250,0.1)" strokeWidth="1" />
        <line x1="188" y1="182" x2="254" y2="182" stroke="rgba(167,139,250,0.08)" strokeWidth="1" />
        <line x1="188" y1="192" x2="242" y2="192" stroke="rgba(167,139,250,0.06)" strokeWidth="1" />
        <text x="221" y="215" textAnchor="middle" fill="rgba(167,139,250,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">CAIPO</text>
        <circle cx="221" cy="143" r="4" fill="#a78bfa" filter="url(#softGlow)" />
        <circle cx="221" cy="143" r="2.5" fill="#c4b5fd" />
        <rect x="196" y="268" width="50" height="18" rx="9" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.25)" strokeWidth="1" />
        <text x="221" y="280" textAnchor="middle" fill="rgba(167,139,250,0.5)" fontSize="6.5" fontFamily="JetBrains Mono, monospace">tap</text>
        <rect x="206" y="296" width="30" height="6" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        <rect x="274" y="165" width="8" height="60" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="155" y1="118" x2="183" y2="152" stroke="url(#lineGrad1)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="68" y="68" width="90" height="62" rx="10" fill="rgba(14,10,28,0.95)" stroke="rgba(124,58,237,0.45)" strokeWidth="1.2" filter="url(#chipGlow)" />
        <rect x="68" y="68" width="90" height="62" rx="10" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="3" />
        {[78,88,98,108,118,128,138,148].map((x, i) => (
          <line key={i} x1={x} y1="72" x2={x} y2="126" stroke="rgba(124,58,237,0.06)" strokeWidth="0.5" />
        ))}
        {[76,84,92,100,108,116,120].map((y, i) => (
          <line key={i} x1="72" y1={y} x2="154" y2={y} stroke="rgba(124,58,237,0.06)" strokeWidth="0.5" />
        ))}
        <rect x="84" y="78" width="56" height="36" rx="5" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.4)" strokeWidth="1" />
        <text x="112" y="96" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">ESP32-S3</text>
        <text x="112" y="106" textAnchor="middle" fill="rgba(167,139,250,0.5)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">XIAO</text>
        {[80,90,100,110,120,130,140,150].map((x, i) => (
          <rect key={i} x={x} y="126" width="3" height="5" rx="0.5" fill="rgba(124,58,237,0.4)" />
        ))}
        <text x="112" y="142" textAnchor="middle" fill="rgba(167,139,250,0.7)" fontSize="6.5" fontFamily="JetBrains Mono, monospace">The Brain · μA</text>
        <line x1="348" y1="118" x2="274" y2="158" stroke="url(#lineGrad2)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="338" y="68" width="102" height="68" rx="10" fill="rgba(10,20,14,0.95)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.2" filter="url(#chipGlow)" />
        <rect x="338" y="68" width="102" height="68" rx="10" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="3" />
        {[350,364,378,392,406,418,430].map((x, i) => (
          <line key={i} x1={x} y1="72" x2={x} y2="132" stroke="rgba(34,197,94,0.05)" strokeWidth="0.5" />
        ))}
        <rect x="350" y="78" width="68" height="44" rx="5" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
        <text x="384" y="97" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">Pi Zero 2W</text>
        <text x="384" y="108" textAnchor="middle" fill="rgba(74,222,128,0.5)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">Raspberry Pi</text>
        {[345,358,371,384,397,410,423,432].map((x, i) => (
          <rect key={i} x={x} y="132" width="3" height="5" rx="0.5" fill="rgba(34,197,94,0.35)" />
        ))}
        <text x="384" y="149" textAnchor="middle" fill="rgba(74,222,128,0.7)" fontSize="6.5" fontFamily="JetBrains Mono, monospace">The Muscle · 0mA</text>
        <line x1="100" y1="242" x2="168" y2="228" stroke="rgba(96,165,250,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="72" cy="250" r="32" fill="rgba(10,14,28,0.95)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.2" />
        <rect x="64" y="236" width="16" height="22" rx="8" fill="none" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" />
        <path d="M 58 252 Q 58 268 72 268 Q 86 268 86 252" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" fill="none" />
        <line x1="72" y1="268" x2="72" y2="276" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
        <line x1="65" y1="276" x2="79" y2="276" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
        <text x="72" y="293" textAnchor="middle" fill="rgba(96,165,250,0.8)" fontSize="6" fontFamily="JetBrains Mono, monospace">INMP441</text>
        <text x="72" y="302" textAnchor="middle" fill="rgba(96,165,250,0.45)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">I2S Mic</text>
        <line x1="400" y1="242" x2="282" y2="228" stroke="rgba(251,191,36,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="428" cy="250" r="32" fill="rgba(14,12,6,0.95)" stroke="rgba(251,191,36,0.4)" strokeWidth="1.2" />
        <path d="M 418 240 L 424 240 L 434 232 L 434 268 L 424 260 L 418 260 Z" stroke="rgba(251,191,36,0.6)" strokeWidth="1.4" fill="rgba(251,191,36,0.08)" />
        <path d="M 438 240 Q 444 250 438 260" stroke="rgba(251,191,36,0.5)" strokeWidth="1.4" fill="none" />
        <path d="M 441 236 Q 450 250 441 264" stroke="rgba(251,191,36,0.3)" strokeWidth="1.4" fill="none" />
        <text x="428" y="293" textAnchor="middle" fill="rgba(251,191,36,0.8)" fontSize="6" fontFamily="JetBrains Mono, monospace">MAX98357A</text>
        <text x="428" y="302" textAnchor="middle" fill="rgba(251,191,36,0.45)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">I2S Amp</text>
        <line x1="358" y1="390" x2="274" y2="290" stroke="rgba(244,114,182,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="325" y="388" width="72" height="56" rx="10" fill="rgba(14,8,14,0.95)" stroke="rgba(244,114,182,0.4)" strokeWidth="1.2" />
        <circle cx="361" cy="410" r="14" fill="rgba(244,114,182,0.06)" stroke="rgba(244,114,182,0.4)" strokeWidth="1.2" />
        <circle cx="361" cy="410" r="9" fill="rgba(244,114,182,0.1)" stroke="rgba(244,114,182,0.3)" strokeWidth="1" />
        <circle cx="361" cy="410" r="5" fill="rgba(244,114,182,0.15)" stroke="rgba(244,114,182,0.4)" strokeWidth="1" />
        <circle cx="357" cy="406" r="1.5" fill="rgba(255,255,255,0.3)" />
        <text x="361" y="436" textAnchor="middle" fill="rgba(244,114,182,0.8)" fontSize="6" fontFamily="JetBrains Mono, monospace">Camera</text>
        <text x="361" y="445" textAnchor="middle" fill="rgba(244,114,182,0.45)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">CSI · Pi Zero</text>
        <line x1="142" y1="390" x2="188" y2="300" stroke="rgba(167,139,250,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="94" y="384" width="76" height="58" rx="10" fill="rgba(10,8,18,0.95)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.2" />
        <rect x="108" y="397" width="42" height="22" rx="4" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1.3" />
        <rect x="150" y="403" width="5" height="10" rx="2" fill="rgba(167,139,250,0.35)" />
        <rect x="110" y="399" width="24" height="18" rx="2" fill="rgba(167,139,250,0.2)" />
        <path d="M 127 395 L 123 407 L 127 407 L 124 419 L 132 405 L 128 405 Z" fill="rgba(167,139,250,0.6)" />
        <text x="132" y="432" textAnchor="middle" fill="rgba(167,139,250,0.8)" fontSize="6" fontFamily="JetBrains Mono, monospace">TP4056</text>
        <text x="132" y="441" textAnchor="middle" fill="rgba(167,139,250,0.45)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">USB-C Charging</text>
        <line x1="250" y1="430" x2="234" y2="306" stroke="rgba(52,211,153,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="250" cy="456" r="26" fill="rgba(8,16,14,0.95)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
        <path d="M 244 444 L 244 464 Q 244 470 250 470 Q 256 470 256 464 L 256 452 Q 258 448 260 452 L 260 462" stroke="rgba(52,211,153,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="248" cy="441" r="2" fill="rgba(52,211,153,0.5)" />
        <text x="250" y="491" textAnchor="middle" fill="rgba(52,211,153,0.8)" fontSize="6" fontFamily="JetBrains Mono, monospace">TTP223</text>
        <text x="250" y="500" textAnchor="middle" fill="rgba(52,211,153,0.45)" fontSize="5.5" fontFamily="JetBrains Mono, monospace">Touch · D0</text>
        <circle cx="221" cy="143" r="8" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.25)" strokeWidth="1">
          <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

const Tag = ({ children, color, bg, border }: { children: string; color: string; bg: string; border: string }) => (
  <div style={{
    display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.1em', textTransform: 'uppercase', color,
    marginBottom: 20, padding: '6px 14px',
    background: bg, border: `1px solid ${border}`, borderRadius: 6, fontWeight: 600,
  }}>{children}</div>
);

export default function DevKit() {
  return (
    <main style={{ background: '#050508', minHeight: '100vh', color: '#f0f0f5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 40,
        padding: '120px 80px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '5%', left: '25%', width: 900, height: 900, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, #050508)', pointerEvents: 'none' }} />

        {/* LEFT */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.28)', borderRadius: 100, fontSize: '0.67rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
              Building in Public
            </span>
            <span style={{ padding: '5px 14px', background: 'rgba(167,139,250,0.1)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.28)', borderRadius: 100, fontSize: '0.67rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>Hardware V1.0 · MIT</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4.4rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 20 }}>
            Build your own<br />
            <span style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>second brain.</span>
          </h1>

          <p style={{ color: '#b0b0cc', fontSize: '1rem', lineHeight: 1.85, maxWidth: 460, marginBottom: 10 }}>
            CAIPO is a fully open-source AI wearable you can source, solder, and ship yourself. Every schematic, every line of firmware, every CAD file — yours.
          </p>
          <p style={{ color: '#9898b8', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: 420, marginBottom: 40 }}>
            Whether you're a maker, researcher, or student — if you're curious, you belong here.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/caipo-devkit.pdf" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, boxShadow: '0 0 28px rgba(124,58,237,0.3)' }}>Explore the Docs</a>
            <a href="#community" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', background: 'rgba(255,255,255,0.06)', color: '#d0d0e8', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 10, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Join the Discussion</a>
          </div>

          <div style={{ display: 'flex', gap: 36, marginTop: 48, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[{ value: '0mA', label: 'Standby drain' }, { value: 'μA', label: 'Always-on chip' }, { value: 'I2S', label: 'Digital audio' }, { value: 'MIT', label: 'License' }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a78bfa', fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
                <div style={{ fontSize: '0.62rem', color: '#8888a8', fontFamily: 'JetBrains Mono, monospace', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — SVG illustration */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <DevKitIllustration />
        </div>
      </section>

      {/* ─── WHO IS THIS FOR ─── */}
      <section style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Tag color="#a78bfa" bg="rgba(124,58,237,0.12)" border="rgba(124,58,237,0.3)">Who is this for?</Tag>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14 }}>
              Anyone curious enough to open the box.
            </h2>
            <p style={{ color: '#a0a0c0', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              You don't need a factory, a lab, or a team. You need a soldering iron, some curiosity, and an afternoon. Whether you're a first-time builder or shipping your tenth project — CAIPO is for you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              {
                emoji: '🔩',
                who: 'Makers & Hobbyists',
                line: 'You build things on weekends.',
                desc: "You've printed enclosures, flashed firmware, and fried a few boards along the way. CAIPO is your next project. Source the parts, assemble it at your desk, and make it do something no one else has thought of.",
                color: '#a78bfa',
                bg: 'rgba(124,58,237,0.05)',
                border: 'rgba(124,58,237,0.18)',
              },
              {
                emoji: '🔬',
                who: 'Researchers',
                line: 'You need a platform, not a product.',
                desc: "Off-the-shelf wearables don't expose the right interfaces. CAIPO gives you full access to the hardware layer — swap sensors, write custom drivers, route data however you need. Bring Your Own Sensors.",
                color: '#60a5fa',
                bg: 'rgba(96,165,250,0.05)',
                border: 'rgba(96,165,250,0.18)',
              },
              {
                emoji: '🎓',
                who: 'Students',
                line: 'You want to learn by building.',
                desc: "There's no better way to understand embedded systems, I2S audio buses, or power gating than tracing it through real hardware. Every design decision in CAIPO is documented and open for you to read.",
                color: '#4ade80',
                bg: 'rgba(34,197,94,0.05)',
                border: 'rgba(34,197,94,0.18)',
              },
              {
                emoji: '🤝',
                who: 'Contributors',
                line: 'You want to build something that matters.',
                desc: "Our Multimodal Perception, Neuroscience, and Space teams are actively building the AI layer. If you've written a sensor driver, improved a case, or found a better part — send a PR. Your work ships to every future builder.",
                color: '#fbbf24',
                bg: 'rgba(245,158,11,0.05)',
                border: 'rgba(245,158,11,0.18)',
              },
            ].map(item => (
              <div key={item.who} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: 20, padding: '32px 26px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2rem', marginBottom: 18 }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#e8e8f8', marginBottom: 6 }}>{item.who}</div>
                <div style={{ fontSize: '0.82rem', color: item.color, fontStyle: 'italic', marginBottom: 14, lineHeight: 1.4 }}>{item.line}</div>
                <p style={{ color: '#9898b8', fontSize: '0.82rem', lineHeight: 1.78, flex: 1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BUILD ─── */}
      <section style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Tag color="#a78bfa" bg="rgba(124,58,237,0.12)" border="rgba(124,58,237,0.3)">Why build it?</Tag>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 22, lineHeight: 1.15 }}>
              A wearable that works<br />for you — not against you.
            </h2>
            <p style={{ color: '#b0b0cc', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 16 }}>
              Most wearables are black boxes. You can't see inside, can't change them, and can't trust what they do with your data. CAIPO is the opposite.
            </p>
            <p style={{ color: '#a0a0c0', lineHeight: 1.9, fontSize: '0.9rem' }}>
              It processes everything on the device. It runs on open firmware you can read. And if you disagree with how something works — you can change it.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🔒', title: 'Your data stays yours', desc: 'Everything runs on the device. Nothing goes to the cloud unless you want it to.' },
              { icon: '🔧', title: 'Change anything', desc: "Don't like how the mic behaves? Swap the driver. Prefer a different chip? Fork the firmware." },
              { icon: '🌍', title: 'Designed for desk-assembly', desc: "No factory needed. No special tools. Designed to be built by one person at a kitchen table." },
              { icon: '🤝', title: 'Better every time someone builds', desc: 'Every builder who pushes improvements makes it better for everyone who comes after.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 22px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ color: '#a0a0c0', fontSize: '0.82rem', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Tag color="#60a5fa" bg="rgba(96,165,250,0.1)" border="rgba(96,165,250,0.28)">Under the hood</Tag>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14 }}>Two chips. One clever trick.</h2>
            <p style={{ color: '#a0a0c0', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>
              Most wearables die fast because one chip does everything. CAIPO splits the work — a tiny always-on chip handles the basics, the powerful one wakes only when you need it.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 22, padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>⚡</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>The Sentry</div>
                    <div style={{ fontSize: '0.67rem', fontFamily: 'JetBrains Mono, monospace', color: '#a78bfa', marginTop: 2 }}>Always awake · Never tired</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#a78bfa', background: 'rgba(124,58,237,0.12)', padding: '4px 11px', borderRadius: 6, border: '1px solid rgba(124,58,237,0.25)' }}>μA power</div>
              </div>
              <p style={{ color: '#b0b0cc', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: 14 }}>This chip never sleeps. It listens for your tap, buffers your voice, and watches for the moment you need CAIPO — sipping so little power you'll barely notice it on the battery.</p>
              <p style={{ color: '#9898b8', fontSize: '0.82rem', lineHeight: 1.75 }}>The moment you tap, it flips a switch and wakes up the powerful chip instantly.</p>
            </div>
            <div style={{ background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 22, padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🧠</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>The Heavy Lifter</div>
                    <div style={{ fontSize: '0.67rem', fontFamily: 'JetBrains Mono, monospace', color: '#4ade80', marginTop: 2 }}>Powerful on demand · Zero drain at rest</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#4ade80', background: 'rgba(34,197,94,0.08)', padding: '4px 11px', borderRadius: 6, border: '1px solid rgba(34,197,94,0.22)' }}>0mA standby</div>
              </div>
              <p style={{ color: '#b0b0cc', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: 14 }}>This is where the AI lives. It handles your voice, talks to language models, and processes what the camera sees. But it draws zero power until the Sentry calls for it.</p>
              <p style={{ color: '#9898b8', fontSize: '0.82rem', lineHeight: 1.75 }}>Not sleep mode. Not standby. Actual zero. That's what makes the battery last.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BUILD STEPS ─── */}
      <section style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <Tag color="#4ade80" bg="rgba(34,197,94,0.1)" border="rgba(34,197,94,0.28)">How to build</Tag>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>Four steps to your own CAIPO.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { step: '01', title: 'Source the parts', desc: "Download the BOM and order your components. Can't find something locally? The design is hardware-agnostic — swap it out and push the driver back.", btnLabel: '↓ Download BOM', btnHref: '/caipo-devkit.pdf', btnDownload: true, color: '#a78bfa', border: 'rgba(124,58,237,0.22)', bg: 'rgba(124,58,237,0.05)', btnBg: 'rgba(124,58,237,0.15)', btnBorder: 'rgba(124,58,237,0.4)', btnColor: '#c4b5fd' },
              { step: '02', title: 'Print the case', desc: 'Any FDM printer, PLA or PETG. Snap-fit design, no glue, no supports needed. CAD models are being finalized now.', btnLabel: '★ Get notified', btnHref: '#newsletter', color: '#fbbf24', border: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.03)', btnBg: 'rgba(245,158,11,0.12)', btnBorder: 'rgba(245,158,11,0.4)', btnColor: '#fcd34d', soon: true },
              { step: '03', title: 'Flash the firmware', desc: "Clone the repo and flash both chips. The build guide walks you through every step — written for desk assembly, not a factory floor.", btnLabel: '→ Read the docs', btnHref: '/caipo-devkit.pdf', color: '#4ade80', border: 'rgba(34,197,94,0.2)', bg: 'rgba(34,197,94,0.03)', btnBg: 'rgba(34,197,94,0.12)', btnBorder: 'rgba(34,197,94,0.35)', btnColor: '#6ee7b7' },
              { step: '04', title: 'Push it back', desc: "Found a better part? Wrote a cleaner driver? Improved the case fit? Open a PR — your improvement ships to every future builder.", btnLabel: '↗ Open a PR', btnHref: 'https://github.com/sandeep711/caipo.ai-Redesign', color: '#a78bfa', border: 'rgba(124,58,237,0.22)', bg: 'rgba(124,58,237,0.05)', btnBg: 'rgba(124,58,237,0.15)', btnBorder: 'rgba(124,58,237,0.4)', btnColor: '#c4b5fd' },
            ].map(item => (
              <div key={item.step} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: item.color, fontWeight: 700, marginBottom: 12, opacity: 0.8 }}>{item.step}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 10, lineHeight: 1.3, color: '#e0e0f0' }}>
                  {item.title}
                  {item.soon && <span style={{ marginLeft: 8, fontSize: '0.58rem', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.28)', borderRadius: 4, padding: '2px 6px', verticalAlign: 'middle' }}>Soon</span>}
                </div>
                <p style={{ color: '#a0a0c0', fontSize: '0.8rem', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>{item.desc}</p>
                <a href={item.btnHref} download={item.btnDownload || undefined} target={item.btnHref.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '9px 16px', borderRadius: 8, background: item.btnBg, color: item.btnColor, border: `1px solid ${item.btnBorder}`, fontSize: '0.78rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none' }}>{item.btnLabel}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY / OPEN SOURCE ─── */}
      <section id="community" style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }}>
            <div>
              <Tag color="#4ade80" bg="rgba(34,197,94,0.1)" border="rgba(34,197,94,0.3)">Open Source · MIT</Tag>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 22, lineHeight: 1.15 }}>
                Help us build<br />
                <span style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>the muscle.</span>
              </h2>
              <p style={{ color: '#b0b0cc', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 16 }}>
                The hardware skeleton is ready. Now our Multimodal Perception, Neuroscience, and Space teams are building the AI software layer — and we want you involved.
              </p>
              <p style={{ color: '#a0a0c0', lineHeight: 1.85, fontSize: '0.88rem', marginBottom: 36 }}>
                No file is locked. No doc is paywalled. Everything we have, you have. If you build something interesting, we want to see it.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <a href="https://github.com/sandeep711/caipo.ai-Redesign" target="_blank" rel="noreferrer" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>Explore the Docs</a>
                <a href="#" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.06)', color: '#d0d0e8', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Notion</a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '📐', title: 'Schematics', desc: 'Full PCB schematics and source files. Read it, modify it, make it yours.', status: 'Live' },
                { icon: '⚡', title: 'Firmware', desc: 'Full codebase for both chips. MIT licensed. Fork freely.', status: 'Live' },
                { icon: '📋', title: 'Full BOM', desc: 'Every component with part numbers and supplier links.', status: 'Live' },
                { icon: '📡', title: 'Driver API', desc: 'Swap any sensor in or out. Push your driver back.', status: 'Live' },
                { icon: '🖨️', title: 'CAD Files', desc: 'FDM case for PLA/PETG. Snap-fit, no glue, no supports.', status: 'Soon' },
                { icon: '🔧', title: 'Build Guide', desc: 'Step-by-step for desk builders, not factories.', status: 'Soon' },
              ].map(item => (
                <div key={item.title} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, background: item.status === 'Live' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: item.status === 'Live' ? '#4ade80' : '#fbbf24', border: `1px solid ${item.status === 'Live' ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}` }}>{item.status}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 5 }}>{item.title}</div>
                  <p style={{ color: '#9898b8', fontSize: '0.78rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOM ─── */}
      <section style={{ padding: '80px 80px', background: '#050508' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <Tag color="#a78bfa" bg="rgba(124,58,237,0.12)" border="rgba(124,58,237,0.3)">Bill of Materials · V1.0</Tag>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>Ready to build? Here's what you need.</h2>
              <p style={{ color: '#a0a0c0', marginTop: 8, fontSize: '0.875rem', maxWidth: 480, lineHeight: 1.75 }}>Can't find something locally? Swap it — push the alternative driver back to the repo.</p>
            </div>
            <a href="/caipo-devkit.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 9, textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>↓ Full BOM PDF</a>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 160px', padding: '14px 28px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Ref', 'Component', 'Role', 'Connection'].map(h => (
                <span key={h} style={{ fontSize: '0.63rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{h}</span>
              ))}
            </div>
            {bom.map((row, i) => (
              <div key={row.ref} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 160px', padding: '15px 28px', borderBottom: i < bom.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', color: '#a78bfa', fontWeight: 700 }}>{row.ref}</span>
                <span style={{ fontSize: '0.875rem', color: '#e0e0f0', fontWeight: 500 }}>{row.part}</span>
                <span style={{ fontSize: '0.75rem', color: '#b0b0cc', fontFamily: 'JetBrains Mono, monospace' }}>{row.role}</span>
                <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8' }}>{row.connection}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="newsletter" style={{ padding: '80px 80px 120px', background: '#07070c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ padding: '56px 64px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 24, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.3rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.2 }}>The hardware skeleton is ready.<br />Help us build the muscle.</h2>
              <p style={{ color: '#b0b0cc', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520 }}>Our Multimodal Perception, Neuroscience, and Space teams are building the AI layer — every builder who joins makes it better for everyone who follows.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <a href="#" style={{ padding: '13px 28px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>Notion</a>
              <a href="#" style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.06)', color: '#d0d0e8', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Get Newsletter Updates</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
