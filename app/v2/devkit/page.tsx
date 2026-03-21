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

export default function DevKitV2() {
  return (
    <main style={{ background: '#faf8f4', minHeight: '100vh', color: '#1a1814', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');
        .v2-card:hover { background: #f0ece4 !important; }
        .v2-step:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(26,24,20,0.1) !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(26,24,20,0.07)' }}>
        <a href="/v2" style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, color: '#1a1814', textDecoration: 'none' }}>CAIPO</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {[['Dev Kit', '/v2/devkit'], ['Wearable', '/v2/wearable'], ['Pricing', '/v2/pricing']].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b6560', textDecoration: 'none' }}>{l}</a>
          ))}
          <a href="/v2/devkit" style={{ padding: '8px 20px', background: '#1a1814', color: '#faf8f4', borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Get Dev Kit</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '160px 60px 100px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#f0e8dc', color: '#9a4a20', border: '1px solid #e0c8b0', borderRadius: 100, fontSize: '0.72rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 36, fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c85a20', display: 'inline-block' }} />
            Building in Public · Hardware V1.0 · MIT
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 28, color: '#1a1814' }}>
            Build your own<br /><span style={{ fontStyle: 'italic', color: '#c85a20' }}>second brain.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#6b6560', maxWidth: 560, marginBottom: 10 }}>
            CAIPO is a fully open-source AI wearable you can source, solder, and ship yourself. Every schematic, every line of firmware, every CAD file — yours.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: '#9a9590', maxWidth: 480, marginBottom: 48 }}>
            Whether you're a maker, researcher, or student — if you're curious, you belong here.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/caipo-devkit.pdf" target="_blank" rel="noreferrer" style={{ padding: '13px 28px', background: '#c85a20', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Explore the Docs →</a>
            <a href="#community" style={{ padding: '13px 28px', background: 'transparent', color: '#1a1814', border: '1px solid rgba(26,24,20,0.2)', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Join the Discussion</a>
          </div>
          <div style={{ display: 'flex', gap: 48, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(26,24,20,0.08)' }}>
            {[{ value: '0mA', label: 'Standby drain' }, { value: 'μA', label: 'Always-on chip' }, { value: 'I2S', label: 'Digital audio' }, { value: 'MIT', label: 'License' }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.7rem', fontWeight: 400, color: '#1a1814' }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT — circuit illustration */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 460 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 460, height: 'auto' }}>
            <defs>
              <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c85a20" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#c85a20" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* bg glow */}
            <ellipse cx="230" cy="260" rx="190" ry="170" fill="url(#warmGlow)" />
            {/* orbit rings */}
            <ellipse cx="230" cy="260" rx="165" ry="148" stroke="rgba(200,90,32,0.08)" strokeWidth="1" strokeDasharray="4 6" />
            <ellipse cx="230" cy="260" rx="205" ry="183" stroke="rgba(200,90,32,0.05)" strokeWidth="1" strokeDasharray="3 8" />
            {/* Device body */}
            <rect x="178" y="140" width="104" height="168" rx="20" fill="#f5f0e8" stroke="rgba(200,90,32,0.3)" strokeWidth="1.5" />
            <rect x="178" y="140" width="104" height="168" rx="20" fill="none" stroke="rgba(26,24,20,0.06)" strokeWidth="1" />
            <rect x="190" y="156" width="80" height="92" rx="10" fill="#fff" stroke="rgba(200,90,32,0.15)" strokeWidth="1" />
            <line x1="198" y1="170" x2="262" y2="170" stroke="rgba(200,90,32,0.12)" strokeWidth="1" />
            <line x1="198" y1="180" x2="256" y2="180" stroke="rgba(200,90,32,0.08)" strokeWidth="1" />
            <line x1="198" y1="190" x2="262" y2="190" stroke="rgba(200,90,32,0.06)" strokeWidth="1" />
            <line x1="198" y1="200" x2="250" y2="200" stroke="rgba(200,90,32,0.05)" strokeWidth="1" />
            <text x="230" y="222" textAnchor="middle" fill="rgba(200,90,32,0.4)" fontSize="7.5" fontFamily="DM Mono, monospace" letterSpacing="3">CAIPO</text>
            <circle cx="230" cy="152" r="4" fill="#c85a20" opacity="0.7" />
            <rect x="206" y="260" width="48" height="16" rx="8" fill="rgba(200,90,32,0.1)" stroke="rgba(200,90,32,0.2)" strokeWidth="1" />
            <text x="230" y="271" textAnchor="middle" fill="rgba(200,90,32,0.4)" fontSize="6" fontFamily="DM Mono, monospace">tap</text>
            <rect x="214" y="284" width="28" height="5" rx="2.5" fill="rgba(26,24,20,0.08)" stroke="rgba(26,24,20,0.1)" strokeWidth="0.8" />
            {/* ESP32 top-left */}
            <line x1="148" y1="112" x2="192" y2="152" stroke="rgba(200,90,32,0.25)" strokeWidth="1" strokeDasharray="3 4" />
            <rect x="62" y="64" width="92" height="60" rx="10" fill="#fff" stroke="rgba(200,90,32,0.4)" strokeWidth="1.2" />
            {[72,82,92,102,112,122,132,142].map((x,i) => <line key={i} x1={x} y1="68" x2={x} y2="120" stroke="rgba(200,90,32,0.05)" strokeWidth="0.5" />)}
            {[72,80,88,96,104,112,118].map((y,i) => <line key={i} x1="66" y1={y} x2="150" y2={y} stroke="rgba(200,90,32,0.05)" strokeWidth="0.5" />)}
            <rect x="78" y="74" width="56" height="34" rx="5" fill="rgba(200,90,32,0.08)" stroke="rgba(200,90,32,0.3)" strokeWidth="1" />
            <text x="106" y="90" textAnchor="middle" fill="#9a4a20" fontSize="6.5" fontFamily="DM Mono, monospace" fontWeight="bold">ESP32-S3</text>
            <text x="106" y="100" textAnchor="middle" fill="rgba(200,90,32,0.5)" fontSize="5" fontFamily="DM Mono, monospace">XIAO</text>
            {[74,84,94,104,114,124,134,144].map((x,i) => <rect key={i} x={x} y="120" width="3" height="5" rx="0.5" fill="rgba(200,90,32,0.3)" />)}
            <text x="106" y="138" textAnchor="middle" fill="rgba(200,90,32,0.6)" fontSize="6" fontFamily="DM Mono, monospace">The Brain · μA</text>
            {/* Pi Zero top-right */}
            <line x1="314" y1="112" x2="282" y2="152" stroke="rgba(26,24,20,0.15)" strokeWidth="1" strokeDasharray="3 4" />
            <rect x="304" y="64" width="98" height="60" rx="10" fill="#fff" stroke="rgba(26,24,20,0.2)" strokeWidth="1.2" />
            {[316,328,340,352,364,376,388].map((x,i) => <line key={i} x1={x} y1="68" x2={x} y2="120" stroke="rgba(26,24,20,0.04)" strokeWidth="0.5" />)}
            <rect x="316" y="74" width="66" height="34" rx="5" fill="rgba(26,24,20,0.04)" stroke="rgba(26,24,20,0.15)" strokeWidth="1" />
            <text x="349" y="90" textAnchor="middle" fill="#3a3028" fontSize="6.5" fontFamily="DM Mono, monospace" fontWeight="bold">Pi Zero 2W</text>
            <text x="349" y="100" textAnchor="middle" fill="rgba(26,24,20,0.35)" fontSize="5" fontFamily="DM Mono, monospace">Raspberry Pi</text>
            {[310,322,334,346,358,370,382,394].map((x,i) => <rect key={i} x={x} y="120" width="3" height="5" rx="0.5" fill="rgba(26,24,20,0.2)" />)}
            <text x="349" y="138" textAnchor="middle" fill="rgba(26,24,20,0.45)" fontSize="6" fontFamily="DM Mono, monospace">The Muscle · 0mA</text>
            {/* Mic left */}
            <line x1="88" y1="240" x2="178" y2="224" stroke="rgba(200,90,32,0.2)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="62" cy="248" r="30" fill="#fff" stroke="rgba(200,90,32,0.3)" strokeWidth="1.2" />
            <rect x="54" y="234" width="16" height="20" rx="8" fill="none" stroke="rgba(200,90,32,0.5)" strokeWidth="1.4" />
            <path d="M 48 248 Q 48 264 62 264 Q 76 264 76 248" stroke="rgba(200,90,32,0.4)" strokeWidth="1.4" fill="none" />
            <line x1="62" y1="264" x2="62" y2="271" stroke="rgba(200,90,32,0.3)" strokeWidth="1.4" />
            <text x="62" y="288" textAnchor="middle" fill="rgba(200,90,32,0.7)" fontSize="5.5" fontFamily="DM Mono, monospace">INMP441</text>
            <text x="62" y="297" textAnchor="middle" fill="rgba(200,90,32,0.4)" fontSize="5" fontFamily="DM Mono, monospace">I2S Mic</text>
            {/* Amp right */}
            <line x1="372" y1="240" x2="282" y2="224" stroke="rgba(26,24,20,0.12)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="398" cy="248" r="30" fill="#fff" stroke="rgba(26,24,20,0.18)" strokeWidth="1.2" />
            <path d="M 388 238 L 394 238 L 404 230 L 404 266 L 394 258 L 388 258 Z" stroke="rgba(26,24,20,0.35)" strokeWidth="1.3" fill="rgba(26,24,20,0.04)" />
            <path d="M 408 238 Q 414 248 408 258" stroke="rgba(26,24,20,0.25)" strokeWidth="1.3" fill="none" />
            <text x="398" y="288" textAnchor="middle" fill="rgba(26,24,20,0.5)" fontSize="5.5" fontFamily="DM Mono, monospace">MAX98357A</text>
            <text x="398" y="297" textAnchor="middle" fill="rgba(26,24,20,0.35)" fontSize="5" fontFamily="DM Mono, monospace">I2S Amp</text>
            {/* Battery bottom-left */}
            <line x1="128" y1="374" x2="192" y2="296" stroke="rgba(200,90,32,0.15)" strokeWidth="1" strokeDasharray="3 4" />
            <rect x="82" y="372" width="76" height="50" rx="10" fill="#fff" stroke="rgba(200,90,32,0.25)" strokeWidth="1.2" />
            <rect x="96" y="383" width="40" height="20" rx="3" fill="none" stroke="rgba(200,90,32,0.4)" strokeWidth="1.2" />
            <rect x="136" y="389" width="4" height="8" rx="2" fill="rgba(200,90,32,0.3)" />
            <rect x="98" y="385" width="22" height="16" rx="2" fill="rgba(200,90,32,0.12)" />
            <text x="120" y="434" textAnchor="middle" fill="rgba(200,90,32,0.7)" fontSize="5.5" fontFamily="DM Mono, monospace">TP4056</text>
            <text x="120" y="443" textAnchor="middle" fill="rgba(200,90,32,0.4)" fontSize="5" fontFamily="DM Mono, monospace">USB-C Charging</text>
            {/* Touch bottom-right */}
            <line x1="332" y1="374" x2="268" y2="296" stroke="rgba(26,24,20,0.12)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="358" cy="392" r="28" fill="#fff" stroke="rgba(26,24,20,0.18)" strokeWidth="1.2" />
            <path d="M 352 380 L 352 400 Q 352 406 358 406 Q 364 406 364 400 L 364 388 Q 366 384 368 388 L 368 398" stroke="rgba(26,24,20,0.35)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <text x="358" y="430" textAnchor="middle" fill="rgba(26,24,20,0.5)" fontSize="5.5" fontFamily="DM Mono, monospace">TTP223</text>
            <text x="358" y="439" textAnchor="middle" fill="rgba(26,24,20,0.35)" fontSize="5" fontFamily="DM Mono, monospace">Touch · D0</text>
            {/* pulse on LED */}
            <circle cx="230" cy="152" r="8" fill="rgba(200,90,32,0.1)" stroke="rgba(200,90,32,0.2)" strokeWidth="1">
              <animate attributeName="r" values="5;9;5" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section style={{ padding: '80px 60px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>Who is this for?</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814', lineHeight: 1.1 }}>
              Anyone curious enough<br /><span style={{ fontStyle: 'italic', color: '#c85a20' }}>to open the box.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { emoji: '🔩', who: 'Makers & Hobbyists', line: 'You build things on weekends.', desc: "Source the parts, assemble at your desk, and make it do something no one else has thought of.", color: '#c85a20' },
              { emoji: '🔬', who: 'Researchers', line: 'You need a platform, not a product.', desc: "Full hardware access. Swap sensors, write custom drivers, route data however you need.", color: '#9a4a20' },
              { emoji: '🎓', who: 'Students', line: 'You want to learn by building.', desc: "Every design decision in CAIPO is documented and open. Trace it, understand it, change it.", color: '#c85a20' },
              { emoji: '🤝', who: 'Contributors', line: 'You want to build something that matters.', desc: "Send a PR. Your improvement ships to every future builder.", color: '#9a4a20' },
            ].map(item => (
              <div key={item.who} className="v2-card" style={{ background: '#fff', border: '1px solid rgba(26,24,20,0.07)', borderRadius: 18, padding: '28px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(26,24,20,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 16 }}>{item.emoji}</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1.05rem', color: '#1a1814', marginBottom: 6 }}>{item.who}</div>
                <div style={{ fontSize: '0.82rem', color: item.color, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.4 }}>{item.line}</div>
                <p style={{ color: '#6b6560', fontSize: '0.82rem', lineHeight: 1.75, flex: 1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO CHIPS */}
      <section style={{ padding: '100px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>Under the hood</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814', marginBottom: 14 }}>Two chips. One clever trick.</h2>
            <p style={{ color: '#6b6560', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
              Most wearables die fast because one chip does everything. CAIPO splits the work — a tiny always-on chip handles the basics, the powerful one wakes only when you need it.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { emoji: '⚡', name: 'The Sentry', sub: 'Always awake · Never tired', badge: 'μA power', badgeColor: '#9a4a20', badgeBg: '#f0e8dc', badgeBorder: '#e0c8b0', desc: 'This chip never sleeps. It listens for your tap, buffers your voice, and watches for the moment you need CAIPO — sipping so little power you\'ll barely notice it on the battery.', note: 'The moment you tap, it flips a switch and wakes up the powerful chip instantly.' },
              { emoji: '🧠', name: 'The Heavy Lifter', sub: 'Powerful on demand · Zero drain at rest', badge: '0mA standby', badgeColor: '#166534', badgeBg: '#dcfce7', badgeBorder: '#bbf7d0', desc: 'This is where the AI lives. It handles your voice, talks to language models, and processes what the camera sees. But it draws zero power until the Sentry calls for it.', note: 'Not sleep mode. Not standby. Actual zero. That\'s what makes the battery last.' },
            ].map(chip => (
              <div key={chip.name} style={{ background: '#fff', border: '1px solid rgba(26,24,20,0.08)', borderRadius: 20, padding: 40, boxShadow: '0 2px 12px rgba(26,24,20,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 13, background: '#f5f0e8', border: '1px solid rgba(26,24,20,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{chip.emoji}</div>
                    <div>
                      <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1.05rem', color: '#1a1814' }}>{chip.name}</div>
                      <div style={{ fontSize: '0.67rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e', marginTop: 2 }}>{chip.sub}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'DM Mono, monospace', color: chip.badgeColor, background: chip.badgeBg, padding: '4px 11px', borderRadius: 6, border: `1px solid ${chip.badgeBorder}`, fontWeight: 500 }}>{chip.badge}</span>
                </div>
                <p style={{ color: '#6b6560', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: 14 }}>{chip.desc}</p>
                <p style={{ color: '#9a9590', fontSize: '0.82rem', lineHeight: 1.75, borderTop: '1px solid rgba(26,24,20,0.06)', paddingTop: 14, marginTop: 4 }}>{chip.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD STEPS */}
      <section style={{ padding: '80px 60px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>How to build</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814' }}>Four steps to your own CAIPO.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { step: '01', title: 'Source the parts', desc: "Download the BOM and order your components. Hardware-agnostic by design — swap what you can't find.", btnLabel: '↓ Download BOM', btnHref: '/caipo-devkit.pdf', download: true },
              { step: '02', title: 'Print the case', desc: 'Any FDM printer, PLA or PETG. Snap-fit, no glue, no supports. CAD files dropping soon.', btnLabel: '★ Get notified', btnHref: '#newsletter', soon: true },
              { step: '03', title: 'Flash the firmware', desc: "Clone the repo and flash both chips. Written for desk assembly, not a factory floor.", btnLabel: '→ Read the docs', btnHref: '/caipo-devkit.pdf' },
              { step: '04', title: 'Push it back', desc: "Better part? Cleaner driver? Improved case? Send a PR — your work ships to every future builder.", btnLabel: '↗ Open a PR', btnHref: 'https://github.com/sandeep711/caipo.ai-Redesign' },
            ].map(item => (
              <div key={item.step} className="v2-step" style={{ background: '#fff', border: '1px solid rgba(26,24,20,0.07)', borderRadius: 18, padding: '28px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(26,24,20,0.04)' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 300, color: '#e0c8b0', marginBottom: 16, lineHeight: 1 }}>{item.step}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 10, color: '#1a1814', lineHeight: 1.3 }}>
                  {item.title}
                  {item.soon && <span style={{ marginLeft: 8, fontSize: '0.58rem', fontFamily: 'DM Mono, monospace', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: 4, padding: '2px 6px', verticalAlign: 'middle' }}>Soon</span>}
                </div>
                <p style={{ color: '#6b6560', fontSize: '0.82rem', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>{item.desc}</p>
                <a href={item.btnHref} download={item.download || undefined} target={item.btnHref.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '9px 16px', borderRadius: 8, background: '#f5f0e8', color: '#9a4a20', border: '1px solid #e0c8b0', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'DM Mono, monospace', textDecoration: 'none' }}>{item.btnLabel}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOM */}
      <section style={{ padding: '80px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 14 }}>Bill of Materials · V1.0</div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.02em', color: '#1a1814' }}>Ready to build?</h2>
            </div>
            <a href="/caipo-devkit.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: '#f0e8dc', color: '#9a4a20', border: '1px solid #e0c8b0', borderRadius: 9, textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'DM Mono, monospace', fontWeight: 600 }}>↓ Full BOM PDF</a>
          </div>
          <div style={{ border: '1px solid rgba(26,24,20,0.08)', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 160px', padding: '14px 28px', background: '#f5f0e8', borderBottom: '1px solid rgba(26,24,20,0.07)' }}>
              {['Ref', 'Component', 'Role', 'Connection'].map(h => (
                <span key={h} style={{ fontSize: '0.63rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{h}</span>
              ))}
            </div>
            {bom.map((row, i) => (
              <div key={row.ref} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 160px', padding: '15px 28px', borderBottom: i < bom.length - 1 ? '1px solid rgba(26,24,20,0.05)' : 'none', background: i % 2 === 0 ? '#fff' : '#faf8f4' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'DM Mono, monospace', color: '#c85a20', fontWeight: 600 }}>{row.ref}</span>
                <span style={{ fontSize: '0.875rem', color: '#1a1814', fontWeight: 500 }}>{row.part}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b6560', fontFamily: 'DM Mono, monospace' }}>{row.role}</span>
                <span style={{ fontSize: '0.72rem', fontFamily: 'DM Mono, monospace', color: '#9a9590' }}>{row.connection}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="community" style={{ padding: '80px 60px 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ padding: '56px 64px', background: '#1a1814', borderRadius: 24, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, background: 'radial-gradient(circle, rgba(200,90,32,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)', fontWeight: 400, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.2, color: '#faf8f4' }}>
                The hardware skeleton is ready.<br /><span style={{ fontStyle: 'italic', color: '#e8844a' }}>Help us build the muscle.</span>
              </h2>
              <p style={{ color: '#8a8078', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520 }}>Our Multimodal Perception, Neuroscience, and Space teams are building the AI layer — every builder who joins makes it better.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <a href="#" style={{ padding: '13px 28px', background: '#c85a20', color: '#fff', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Notion</a>
              <a href="#" style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.06)', color: '#c8c0b4', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Get Newsletter Updates</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
