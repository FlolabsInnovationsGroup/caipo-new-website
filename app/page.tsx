import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#050508', minHeight: '100vh', color: '#f0f0f5', fontFamily: 'Syne, sans-serif' }}>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '100px 80px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', left: '35%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to bottom, transparent, #050508)',
          pointerEvents: 'none',
        }} />

        {/* LEFT */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 13px',
              background: 'rgba(34,197,94,0.08)', color: '#4ade80',
              border: '1px solid rgba(34,197,94,0.18)', borderRadius: 100,
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
              V1.0 Active Development
            </span>
            <span style={{
              padding: '5px 12px',
              background: 'rgba(255,255,255,0.04)', color: '#9898b8',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
            }}>Open-Source Hardware</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 3.5vw, 4rem)',
            fontWeight: 700, lineHeight: 1.08,
            letterSpacing: '-0.025em', marginBottom: 10, color: '#e8e8f0',
          }}>Meet</h1>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
            fontWeight: 700, lineHeight: 0.95,
            letterSpacing: '-0.03em', marginBottom: 30,
            background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>CAIPO</h1>

          <p style={{ fontSize: '1.05rem', color: '#b8b8d0', lineHeight: 1.75, maxWidth: 460, marginBottom: 14 }}>
            The open-source second brain. A hybrid-architecture wearable built for low-power autonomy and high-performance edge AI.
          </p>
          <p style={{ fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8', marginBottom: 44, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#22c55e', fontSize: '0.5rem' }}>●</span>
            ESP32-S3 + Pi Zero 2W · Building in Public
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/devkit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 26px',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', borderRadius: 10, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600,
              boxShadow: '0 0 28px rgba(124,58,237,0.28)',
            }}>Explore Dev Kit</Link>
            <Link href="/wearable" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 26px',
              background: 'rgba(255,255,255,0.05)', color: '#c0c0d8',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 500,
            }}>CAIPO Wearable →</Link>
          </div>

          <div style={{ display: 'flex', gap: 36, marginTop: 52, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { value: '0mA', label: 'Pi standby' },
              { value: 'μA', label: 'ESP32 idle' },
              { value: 'I2S', label: 'Digital audio' },
              { value: 'MIT', label: 'License' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a78bfa', letterSpacing: '-0.02em', fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', color: '#8888a8', fontFamily: 'JetBrains Mono, monospace', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Dev Kit architecture card */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ width: '100%', maxWidth: 480 }}>
            <div style={{
              background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 24, padding: '36px 40px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                  background: 'rgba(34,197,94,0.08)', color: '#4ade80',
                  border: '1px solid rgba(34,197,94,0.18)', borderRadius: 6,
                  fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Hardware V1.0
                </span>
                <span style={{
                  padding: '4px 10px', background: 'rgba(255,255,255,0.04)', color: '#9898b8',
                  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6,
                  fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
                }}>MIT License</span>
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>Dev Kit V1.0</div>
              <div style={{ fontSize: '0.78rem', color: '#a0a0c0', marginBottom: 28, fontFamily: 'JetBrains Mono, monospace' }}>
                Hybrid Primary/Secondary Architecture
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <div style={{
                  background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                  }}>⚡</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 3 }}>ESP32-S3 XIAO</div>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', color: '#a78bfa' }}>The Brain · Always-on · μA power</div>
                  </div>
                  <div style={{
                    marginLeft: 'auto', fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace',
                    color: '#a78bfa', background: 'rgba(124,58,237,0.12)',
                    padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(124,58,237,0.2)',
                  }}>μA</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <span style={{ fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace', color: '#7878a0', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
                    UART interrupt · PI_EN D10
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                </div>

                <div style={{
                  background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                  }}>🧠</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 3 }}>Pi Zero 2W</div>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', color: '#4ade80' }}>The Muscle · Full Linux · LLM routing</div>
                  </div>
                  <div style={{
                    marginLeft: 'auto', fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace',
                    color: '#4ade80', background: 'rgba(34,197,94,0.08)',
                    padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(34,197,94,0.15)',
                  }}>0mA</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {['I2S Audio', 'CSI Camera', 'TP4056 Charging', 'TTP223 Touch', 'WS2812B LED'].map(t => (
                  <span key={t} style={{
                    padding: '3px 9px', borderRadius: 5,
                    background: 'rgba(255,255,255,0.04)', color: '#9898b8',
                    fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PRODUCTS */}
      <section style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9898b8',
            marginBottom: 16, padding: '5px 14px',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
          }}>Two Ways to Experience CAIPO</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>
            Wear it or Build it
          </h2>
          <p style={{ color: '#a0a0c0', marginTop: 12, fontSize: '0.95rem', maxWidth: 420, margin: '12px auto 0' }}>
            The finished consumer device for everyone, and an open dev kit for builders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 1100, margin: '0 auto', alignItems: 'stretch' }}>

          {/* CAIPO Device */}
          <div style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24, padding: 44, position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
            <span style={{
              display: 'inline-flex', alignItems: 'center', padding: '4px 11px',
              background: 'rgba(245,158,11,0.08)', color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.18)', borderRadius: 6,
              fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28,
              alignSelf: 'flex-start',
            }}>Coming Soon</span>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28,
              padding: '20px 24px',
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16,
            }}>
              <img src="/CAIPO_Wearable.webp" alt="CAIPO Device"
                style={{ width: 80, height: 'auto', filter: 'drop-shadow(0 8px 20px rgba(124,58,237,0.4))' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>CAIPO Wearable</div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8' }}>Consumer Device · Coming 2025</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em' }}>CAIPO Device</h3>
            <p style={{ color: '#b8b8d0', lineHeight: 1.75, marginBottom: 28, fontSize: '0.9rem' }}>
              The finished wearable. Clip it on, tap once — CAIPO captures moments, answers questions, and builds your second brain silently in the background.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, flex: 1 }}>
              {['Always-on edge AI', 'One-tap capture', 'Private by design', 'FlowBrain powered'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 11, color: '#b8b8d0', fontSize: '0.875rem' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7c3aed', opacity: 0.8, display: 'inline-block', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/wearable" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px',
              background: 'rgba(255,255,255,0.06)', color: '#e0e0f0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
            }}>View Wearable →</Link>
          </div>

          {/* Dev Kit */}
          <div style={{
            background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.18)',
            borderRadius: 24, padding: 44, position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 11px',
              background: 'rgba(34,197,94,0.08)', color: '#4ade80',
              border: '1px solid rgba(34,197,94,0.18)', borderRadius: 6,
              fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28,
              alignSelf: 'flex-start',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 5px #22c55e' }} />
              Available Now
            </span>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
              padding: '16px 20px',
              background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>⚡</div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#c4b5fd' }}>ESP32-S3</div>
                  <div style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8' }}>The Brain</div>
                </div>
              </div>
              <span style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', color: '#7878a0' }}>→ UART →</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🧠</div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#4ade80' }}>Pi Zero 2W</div>
                  <div style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', color: '#9898b8' }}>The Muscle</div>
                </div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', color: '#7878a0' }}>MIT</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em' }}>Dev Kit V1.0</h3>
            <p style={{ color: '#b8b8d0', lineHeight: 1.75, marginBottom: 28, fontSize: '0.9rem' }}>
              Build your own CAIPO. Full schematics, CAD files, firmware — all open. Fork it, solder it, push improvements back.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, flex: 1 }}>
              {['ESP32-S3 + Pi Zero 2W', 'Full BOM + schematics', '3D-printable case (FDM)', 'Community-driven, MIT'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 11, color: '#b8b8d0', fontSize: '0.875rem' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', opacity: 0.7, display: 'inline-block', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/devkit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', borderRadius: 8, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600,
              boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
            }}>View Dev Kit →</Link>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE CTA */}
      <section style={{ padding: '100px 80px', background: '#050508' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 28, padding: '70px 80px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8888a8',
            marginBottom: 20, padding: '5px 14px',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
          }}>Open Source · MIT License</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 18, lineHeight: 1.15 }}>
            Built in the open.<br />
            <span style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Built with the community.
            </span>
          </h2>
          <p style={{ color: '#b0b0cc', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 44px' }}>
            Every schematic, driver, and CAD file — open and accessible. Fork it, improve it, push it back.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/sandeep711/caipo.ai-Redesign" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', background: 'rgba(255,255,255,0.06)', color: '#e0e0f0',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
              textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
            }}>GitHub Repository →</a>
            <a href="/caipo-devkit.pdf" download style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', borderRadius: 10, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600,
              boxShadow: '0 4px 24px rgba(124,58,237,0.3)',
            }}>Download Hardware Docs</a>
          </div>
        </div>
      </section>

    </main>
  );
}
