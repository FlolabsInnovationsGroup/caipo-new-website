import Link from 'next/link';

export default function Wearable() {
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
          position: 'absolute', top: '15%', left: '30%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(to bottom, transparent, #050508)',
          pointerEvents: 'none',
        }} />

        {/* LEFT */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 13px',
              background: 'rgba(245,158,11,0.08)', color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.18)', borderRadius: 100,
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Coming Soon
            </span>
            <span style={{
              padding: '5px 13px',
              background: 'rgba(255,255,255,0.04)', color: '#9898b8',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.08em',
            }}>
              Consumer Device
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 4.5vw, 5rem)',
            fontWeight: 800, lineHeight: 1.02,
            letterSpacing: '-0.035em', marginBottom: 10, color: '#e8e8f0',
          }}>
            Your AI
          </h1>
          <h1 style={{
            fontSize: 'clamp(3rem, 5.5vw, 5.8rem)',
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.04em', marginBottom: 30,
            background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Companion
          </h1>

          <p style={{
            fontSize: '1.1rem', color: '#b8b8d0', lineHeight: 1.75,
            maxWidth: 460, marginBottom: 14,
          }}>
            Clip it on. Tap once. CAIPO captures your world, answers your questions, and builds your second brain — silently, always-on, entirely private.
          </p>

          <p style={{
            fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace',
            color: '#9898b8', marginBottom: 44,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: '#f59e0b', fontSize: '0.5rem' }}>●</span>
            Powered by FlowBrain · Privacy-first edge AI
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#waitlist" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', borderRadius: 10, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Syne, sans-serif',
              boxShadow: '0 0 32px rgba(124,58,237,0.3)',
            }}>
              Join Waitlist
            </a>
            <Link href="/devkit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '14px 28px',
              background: 'rgba(255,255,255,0.05)', color: '#c0c0d8',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 500,
            }}>
              Explore Dev Kit
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 36, marginTop: 56, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { value: 'Always-on', label: 'Edge AI' },
              { value: 'Private', label: 'On-device only' },
              { value: '1-tap', label: 'Capture' },
              { value: 'Screenless', label: 'Interface' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#a78bfa', letterSpacing: '-0.01em' }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', color: '#8888a8', fontFamily: 'JetBrains Mono, monospace', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — device */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative', zIndex: 2, height: '100%',
        }}>
          {/* Floating labels */}
          {[
            { top: '8%', left: '2%', title: 'FlowBrain AI', sub: 'Context-aware responses', border: 'rgba(124,58,237,0.3)' },
            { top: '18%', right: '2%', title: 'Always Listening', sub: 'Wake-word activated', border: 'rgba(34,197,94,0.25)' },
            { bottom: '22%', left: '0%', title: 'Visual Intelligence', sub: 'CSI camera · Scene understanding', border: 'rgba(255,255,255,0.1)' },
            { bottom: '10%', right: '5%', title: 'Private by Design', sub: 'On-device processing', border: 'rgba(245,158,11,0.2)' },
          ].map((label, i) => (
            <div key={i} style={{
              position: 'absolute', ...label,
              background: 'rgba(8,8,14,0.92)',
              border: `1px solid ${label.border}`,
              borderRadius: 12, padding: '11px 16px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f0f0f5', marginBottom: 2 }}>{label.title}</div>
              <div style={{ fontSize: '0.65rem', color: '#b0b0cc', fontFamily: 'JetBrains Mono, monospace' }}>{label.sub}</div>
            </div>
          ))}

          <div style={{ position: 'relative', animation: 'float 5s ease-in-out infinite' }}>
            <div style={{
              position: 'absolute', inset: -60,
              background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)',
              borderRadius: '50%',
            }} />
            <img
              src="/CAIPO_Wearable.webp"
              alt="CAIPO Wearable"
              style={{
                width: 280, height: 'auto', position: 'relative', zIndex: 2,
                filter: 'drop-shadow(0 30px 60px rgba(124,58,237,0.4))',
              }}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8888a8',
              marginBottom: 16, padding: '5px 14px',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: 100,
            }}>How it works</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Tap. Talk. Done.
            </h2>
            <p style={{ color: '#a0a0c0', marginTop: 12, fontSize: '0.95rem', maxWidth: 420, margin: '12px auto 0' }}>
              No screen to pull out. No app to open. CAIPO lives in the background and surfaces when you need it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              {
                step: '01', icon: '👆',
                title: 'One tap to activate',
                desc: 'The TTP223 capacitive sensor works right through the case. A single tap wakes CAIPO and starts listening — no buttons, no screens.',
              },
              {
                step: '02', icon: '🎙️',
                title: 'Capture anything',
                desc: 'Voice commands, ambient notes, visual scenes via the CSI camera. CAIPO processes everything on-device — nothing leaves your pocket.',
              },
              {
                step: '03', icon: '🧠',
                title: 'Your second brain builds',
                desc: 'FlowBrain organizes what you capture into a personal knowledge base. Ask anything about your day, your notes, your context.',
              },
            ].map(item => (
              <div key={item.step} style={{
                background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20, padding: 36, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 24, right: 24,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                  color: 'rgba(124,58,237,0.4)', fontWeight: 700, letterSpacing: '0.1em',
                }}>{item.step}</div>
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12, letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ color: '#a0a0c0', fontSize: '0.875rem', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{
              display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8888a8',
              marginBottom: 16, padding: '5px 14px',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: 100,
            }}>Capabilities</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Built for the real world
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              {
                icon: '🗣️', title: 'Voice Interaction',
                desc: 'Multi-language support, context-aware responses, natural language processing, voice identification, and ambient noise filtering.',
                status: 'In Development', statusColor: '#a78bfa', statusBg: 'rgba(124,58,237,0.1)', statusBorder: 'rgba(124,58,237,0.25)',
              },
              {
                icon: '👁️', title: 'Visual Intelligence',
                desc: 'Object recognition, OCR text capture, scene understanding, visual search, and AR capabilities via the integrated CSI camera.',
                status: 'Coming Soon', statusColor: '#fbbf24', statusBg: 'rgba(245,158,11,0.08)', statusBorder: 'rgba(245,158,11,0.18)',
              },
              {
                icon: '🔒', title: 'Privacy First',
                desc: 'On-device processing only. No cloud dependency, encrypted local storage, user-controlled data. Built on open-source auditable firmware.',
                status: 'Core Design', statusColor: '#4ade80', statusBg: 'rgba(34,197,94,0.08)', statusBorder: 'rgba(34,197,94,0.18)',
              },
              {
                icon: '⚡', title: 'Smart Automation',
                desc: 'Task automation, workflow optimization, smart reminders, and process learning — all handled by FlowBrain in the background.',
                status: 'In Development', statusColor: '#a78bfa', statusBg: 'rgba(124,58,237,0.1)', statusBorder: 'rgba(124,58,237,0.25)',
              },
              {
                icon: '🔋', title: 'All-Day Battery',
                desc: 'Hybrid power architecture means the ESP32 sips μA always-on while the Pi draws zero until needed. USB-C charging.',
                status: 'In Development', statusColor: '#a78bfa', statusBg: 'rgba(124,58,237,0.1)', statusBorder: 'rgba(124,58,237,0.25)',
              },
              {
                icon: '📡', title: 'Seamless Connectivity',
                desc: 'BLE + Wi-Fi, phone companion app, offline-first design, smart notifications, and API integrations.',
                status: 'In Development', statusColor: '#a78bfa', statusBg: 'rgba(124,58,237,0.1)', statusBorder: 'rgba(124,58,237,0.25)',
              },
            ].map(f => (
              <div key={f.title} style={{
                background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18, padding: '30px 32px',
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                }}>{f.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{f.title}</h3>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: '0.6rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      background: f.statusBg, color: f.statusColor, border: `1px solid ${f.statusBorder}`,
                    }}>{f.status}</span>
                  </div>
                  <p style={{ color: '#a0a0c0', fontSize: '0.83rem', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" style={{ padding: '100px 80px', background: '#07070c' }}>
        <div style={{
          maxWidth: 820, margin: '0 auto',
          background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)',
          borderRadius: 28, padding: '70px 80px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8888a8',
            marginBottom: 20, padding: '5px 14px',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100,
          }}>Early Access</div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.035em', marginBottom: 18, lineHeight: 1.1,
          }}>
            Be among the first<br />
            <span style={{
              background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>to experience CAIPO.</span>
          </h2>
          <p style={{ color: '#b0b0cc', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 44px' }}>
            Join the waitlist to get early access, help shape the product, and be notified the moment CAIPO ships.
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 480, margin: '0 auto 32px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1, padding: '13px 18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9, color: '#f0f0f5',
                fontSize: '0.875rem', fontFamily: 'Syne, sans-serif',
                outline: 'none',
              }}
            />
            <button style={{
              padding: '13px 24px', whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', border: 'none', borderRadius: 9,
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Syne, sans-serif',
              boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
            }}>
              Join Waitlist
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
            {[
              { icon: '🎯', label: 'Early Access', sub: 'First to try new features' },
              { icon: '🔔', label: 'Launch Notification', sub: 'Know the day it ships' },
              { icon: '🛠️', label: 'Shape the Product', sub: 'Direct feedback line' },
            ].map(b => (
              <div key={b.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#c0c0d8', marginBottom: 3 }}>{b.label}</div>
                <div style={{ fontSize: '0.68rem', color: '#8888a8', fontFamily: 'JetBrains Mono, monospace' }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs DEV KIT */}
      <section style={{ padding: '80px 80px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Want to build it yourself?
          </h2>
          <p style={{ color: '#a0a0c0', fontSize: '0.95rem', lineHeight: 1.7 }}>
            The Dev Kit V1.0 is available now — full schematics, BOM, firmware, all open-source.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/devkit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px',
            background: 'rgba(255,255,255,0.05)', color: '#e0e0f0',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, textDecoration: 'none',
            fontSize: '0.9rem', fontWeight: 600,
          }}>
            Explore Dev Kit V1.0
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4ade80', fontSize: '0.65rem', padding: '2px 7px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 4 }}>Available Now</span>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </main>
  );
}
