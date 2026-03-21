import Link from 'next/link';

export default function HomeV2() {
  return (
    <main style={{
      background: '#faf8f4',
      minHeight: '100vh',
      color: '#1a1814',
      fontFamily: '"DM Sans", sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');
        .v2-hover-card:hover { background: #e8e0d4 !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(26,24,20,0.1); }
        .v2-dark-card:hover { background: #2a2420 !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,90,32,0.15); }
        .v2-btn-primary:hover { background: #b84a1a !important; }
        .v2-btn-ghost:hover { background: #f0ece4 !important; }
        .v2-feature-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(26,24,20,0.08) !important; }
        * { transition: background 0.15s, transform 0.15s, box-shadow 0.15s; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
        background: 'rgba(250,248,244,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,24,20,0.07)',
      }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.01em', color: '#1a1814' }}>
          CAIPO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {[['Dev Kit', '/v2/devkit'], ['Wearable', '/v2/wearable'], ['Pricing', '/v2/pricing']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b6560', textDecoration: 'none' }}>{label}</Link>
          ))}
          <Link href="/v2/devkit" style={{
            padding: '8px 20px',
            background: '#1a1814', color: '#faf8f4',
            borderRadius: 8, textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500,
          }}>Get Dev Kit</Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        padding: '160px 60px 100px',
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            background: '#f0e8dc', color: '#9a4a20',
            border: '1px solid #e0c8b0',
            borderRadius: 100, fontSize: '0.72rem',
            fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: 36, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c85a20', display: 'inline-block' }} />
            Hardware V1.0 · Building in Public
          </div>

          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
            fontWeight: 400, lineHeight: 1.04,
            letterSpacing: '-0.03em', marginBottom: 28,
            color: '#1a1814',
          }}>
            Your second<br />
            brain,{' '}
            <span style={{ fontStyle: 'italic', color: '#c85a20' }}>worn.</span>
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#6b6560', maxWidth: 440, marginBottom: 12 }}>
            CAIPO is an open-source AI wearable that captures moments, answers questions, and builds your second brain — all without a screen.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: '#9a9590', maxWidth: 400, marginBottom: 48 }}>
            Every schematic, every line of firmware, every CAD file. Yours.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/v2/devkit" className="v2-btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px',
              background: '#c85a20', color: '#fff',
              borderRadius: 10, textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
            }}>Explore the Dev Kit →</Link>
            <Link href="/v2/wearable" className="v2-btn-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px',
              background: 'transparent', color: '#1a1814',
              border: '1px solid rgba(26,24,20,0.2)',
              borderRadius: 10, textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
            }}>View Wearable</Link>
          </div>

          <div style={{ display: 'flex', gap: 48, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(26,24,20,0.08)' }}>
            {[{ value: '0mA', label: 'Standby drain' }, { value: 'MIT', label: 'License' }, { value: 'I2S', label: 'Digital audio' }, { value: '2-chip', label: 'Architecture' }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', fontWeight: 400, color: '#1a1814' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — product visual */}
        <div style={{ position: 'relative' }}>
          {/* big warm circle bg */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420, height: 420, borderRadius: '50%',
            background: 'radial-gradient(circle, #f0e4d4 0%, #faf8f4 70%)',
            zIndex: 0,
          }} />
          {/* device image */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <img
              src="/CAIPO_Wearable.webp"
              alt="CAIPO Device"
              style={{ width: 320, height: 'auto', filter: 'drop-shadow(0 24px 48px rgba(200,90,32,0.2)) drop-shadow(0 8px 16px rgba(26,24,20,0.12))' }}
            />
          </div>
          {/* floating labels */}
          {[
            { label: 'ESP32-S3', sub: 'Always-on · μA', top: '15%', left: '-8%' },
            { label: 'Pi Zero 2W', sub: 'Full Linux · 0mA standby', top: '15%', right: '-8%' },
            { label: 'I2S Audio', sub: 'INMP441 + MAX98357A', bottom: '20%', left: '-12%' },
            { label: 'USB-C', sub: 'TP4056 Charging', bottom: '20%', right: '-8%' },
          ].map(item => (
            <div key={item.label} style={{
              position: 'absolute',
              top: item.top, bottom: item.bottom,
              left: item.left, right: item.right,
              background: '#fff',
              border: '1px solid rgba(26,24,20,0.08)',
              borderRadius: 10, padding: '10px 14px',
              boxShadow: '0 4px 16px rgba(26,24,20,0.06)',
              zIndex: 2,
            }}>
              <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#1a1814', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: '0.65rem', fontFamily: 'DM Mono, monospace', color: '#9a9590' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WEAR IT OR BUILD IT ─── */}
      <section style={{ padding: '80px 60px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>Two ways in</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814', lineHeight: 1.1 }}>
              Wear it.<br /><span style={{ fontStyle: 'italic', color: '#c85a20' }}>Or build it.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Wearable card */}
            <div className="v2-hover-card" style={{
              background: '#fff', border: '1px solid rgba(26,24,20,0.08)',
              borderRadius: 20, padding: 44,
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 2px 12px rgba(26,24,20,0.04)',
            }}>
              <span style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', padding: '4px 12px',
                background: '#fef3c7', color: '#92400e',
                border: '1px solid #fde68a', borderRadius: 6,
                fontSize: '0.62rem', fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28, fontWeight: 500,
              }}>Coming Soon</span>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28,
                padding: '20px 24px',
                background: '#faf8f4', border: '1px solid rgba(26,24,20,0.06)', borderRadius: 14,
              }}>
                <img src="/CAIPO_Wearable.webp" alt="CAIPO Device" style={{ width: 64, height: 'auto' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 3, color: '#1a1814' }}>CAIPO Wearable</div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e' }}>Consumer Device · Coming 2025</div>
                </div>
              </div>

              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 400, marginBottom: 12, letterSpacing: '-0.02em', color: '#1a1814' }}>CAIPO Device</h3>
              <p style={{ color: '#6b6560', lineHeight: 1.75, marginBottom: 24, fontSize: '0.9rem', flex: 1 }}>
                The finished wearable. Clip it on, tap once — CAIPO captures moments, answers questions, and builds your second brain silently in the background.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                {['Always-on edge AI', 'One-tap capture', 'Private by design', 'FlowBrain powered'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6b6560', fontSize: '0.875rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#c85a20', display: 'inline-block', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/v2/wearable" style={{
                alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px',
                background: 'transparent', color: '#1a1814',
                border: '1px solid rgba(26,24,20,0.2)',
                borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              }}>View Wearable →</Link>
            </div>

            {/* Dev Kit card */}
            <div className="v2-dark-card" style={{
              background: '#1a1814', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20, padding: 44,
              display: 'flex', flexDirection: 'column',
            }}>
              <span style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px',
                background: 'rgba(200,90,32,0.15)', color: '#e8844a',
                border: '1px solid rgba(200,90,32,0.3)', borderRadius: 6,
                fontSize: '0.62rem', fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28, fontWeight: 500,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c85a20', display: 'inline-block' }} />
                Available Now
              </span>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(200,90,32,0.2)', border: '1px solid rgba(200,90,32,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>⚡</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#e8d5c0' }}>ESP32-S3</div>
                    <div style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: '#7a7068' }}>The Brain</div>
                  </div>
                </div>
                <span style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: '#5a5048' }}>→ UART →</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(200,90,32,0.15)', border: '1px solid rgba(200,90,32,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🧠</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#e8d5c0' }}>Pi Zero 2W</div>
                    <div style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: '#7a7068' }}>The Muscle</div>
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: '#5a5048' }}>MIT</span>
              </div>

              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 400, marginBottom: 12, letterSpacing: '-0.02em', color: '#faf8f4' }}>Dev Kit V1.0</h3>
              <p style={{ color: '#a09880', lineHeight: 1.75, marginBottom: 24, fontSize: '0.9rem', flex: 1 }}>
                Build your own CAIPO. Full schematics, CAD files, firmware — all open. Fork it, solder it, push improvements back.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                {['ESP32-S3 + Pi Zero 2W', 'Full BOM + schematics', '3D-printable case (FDM)', 'Community-driven, MIT'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#a09880', fontSize: '0.875rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#c85a20', display: 'inline-block', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/v2/devkit" style={{
                alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px',
                background: '#c85a20', color: '#fff',
                borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              }}>View Dev Kit →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPEN SOURCE CTA ─── */}
      <section style={{ padding: '100px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'center',
            padding: '64px 72px',
            background: '#1a1814', borderRadius: 24,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,90,32,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a6058', marginBottom: 20 }}>Open Source · MIT</div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#faf8f4', lineHeight: 1.15, marginBottom: 20 }}>
                The hardware skeleton<br />is <span style={{ fontStyle: 'italic', color: '#e8844a' }}>ready.</span>
              </h2>
              <p style={{ color: '#8a8078', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Help us build the muscle. Our Multimodal Perception, Neuroscience, and Space teams are building the AI layer — and we want you involved.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <Link href="/v2/devkit" style={{ padding: '13px 28px', background: '#c85a20', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Explore the Docs →</Link>
              <a href="#" style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.06)', color: '#c8c0b4', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Notion</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
