export default function WearableV2() {
  return (
    <main style={{ background: '#faf8f4', minHeight: '100vh', color: '#1a1814', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');`}</style>

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
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: 100, fontSize: '0.72rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 36, fontWeight: 500 }}>Coming Soon · Consumer Device</div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.03em', marginBottom: 28, color: '#1a1814' }}>
            Clip it on.<br /><span style={{ fontStyle: 'italic', color: '#c85a20' }}>Think out loud.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#6b6560', maxWidth: 460, marginBottom: 10 }}>
            CAIPO is a screenless AI companion you wear. It captures your world, answers your questions, and quietly builds your second brain — all in the background.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: '#9a9590', maxWidth: 420, marginBottom: 48 }}>
            No screen. No app. Just one tap.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#waitlist" style={{ padding: '13px 28px', background: '#c85a20', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Join Waitlist →</a>
            <a href="/v2/devkit" style={{ padding: '13px 28px', background: 'transparent', color: '#1a1814', border: '1px solid rgba(26,24,20,0.2)', borderRadius: 10, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Explore Dev Kit</a>
          </div>
        </div>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #f0e4d4 0%, #faf8f4 70%)', zIndex: 0 }} />
          <img src="/CAIPO_Wearable.webp" alt="CAIPO Wearable" style={{ width: 380, height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 48px rgba(200,90,32,0.2)) drop-shadow(0 8px 16px rgba(26,24,20,0.1))' }} />
        </div>
      </section>


      {/* WHAT IT DOES */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>How it works</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814', lineHeight: 1.1 }}>
              One tap.<br /><span style={{ fontStyle: 'italic', color: '#c85a20' }}>Everything else is automatic.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { step: '01', icon: '👆', title: 'Tap once', desc: 'The touch sensor wakes the device instantly. The ESP32 fires a UART signal and the Pi Zero powers up in seconds.' },
              { step: '02', icon: '🎙️', title: 'Speak naturally', desc: 'CAIPO listens through the I2S mic, processes your voice on-device, and routes it to the AI layer on the Pi.' },
              { step: '03', icon: '🧠', title: 'Gets smarter over time', desc: 'Every capture, every question, every moment — stored locally and woven into your second brain. Private by design.' },
            ].map(item => (
              <div key={item.step} style={{ background: '#faf8f4', border: '1px solid rgba(26,24,20,0.07)', borderRadius: 18, padding: '32px 28px' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', fontWeight: 300, color: '#e0c8b0', marginBottom: 16 }}>{item.step}</div>
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1.1rem', color: '#1a1814', marginBottom: 10 }}>{item.title}</div>
                <p style={{ color: '#6b6560', fontSize: '0.875rem', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 60px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 16 }}>Capabilities</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814' }}>Built for the real world.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🎙️', title: 'Voice Interaction', badge: 'In Development', badgeBg: '#f0e8dc', badgeColor: '#9a4a20', badgeBorder: '#e0c8b0', desc: 'Multi-language support, context-aware responses, natural language processing, voice identification, and ambient noise filtering.' },
              { icon: '👁️', title: 'Visual Intelligence', badge: 'Coming Soon', badgeBg: '#fef3c7', badgeColor: '#92400e', badgeBorder: '#fde68a', desc: 'Object recognition, OCR text capture, scene understanding, visual search, and AR capabilities via the integrated CSI camera.' },
              { icon: '🔒', title: 'Privacy First', badge: 'Core Design', badgeBg: '#dcfce7', badgeColor: '#166534', badgeBorder: '#bbf7d0', desc: 'On-device processing only. No cloud dependency, encrypted local storage, user-controlled data. Built on open-source auditable firmware.' },
              { icon: '⚡', title: 'Smart Automation', badge: 'In Development', badgeBg: '#f0e8dc', badgeColor: '#9a4a20', badgeBorder: '#e0c8b0', desc: 'Task automation, workflow optimization, smart reminders, and process learning — all handled by FlowBrain in the background.' },
              { icon: '🔋', title: 'All-Day Battery', badge: 'In Development', badgeBg: '#f0e8dc', badgeColor: '#9a4a20', badgeBorder: '#e0c8b0', desc: 'Hybrid power architecture means the ESP32 sips μA always-on while the Pi draws zero until needed. USB-C charging.' },
              { icon: '📡', title: 'Seamless Connectivity', badge: 'In Development', badgeBg: '#f0e8dc', badgeColor: '#9a4a20', badgeBorder: '#e0c8b0', desc: 'BLE + Wi-Fi, phone companion app, offline-first design, smart notifications, and API integrations.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#fff', border: '1px solid rgba(26,24,20,0.07)', borderRadius: 18, padding: '28px 28px', display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(26,24,20,0.04)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: '#f5f0e8', border: '1px solid rgba(26,24,20,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', color: '#1a1814' }}>{f.title}</span>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', fontWeight: 600, background: f.badgeBg, color: f.badgeColor, border: `1px solid ${f.badgeBorder}`, borderRadius: 4, padding: '2px 8px' }}>{f.badge}</span>
                  </div>
                  <p style={{ color: '#6b6560', fontSize: '0.85rem', lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding: '100px 60px 120px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a89e', marginBottom: 20 }}>Early Access</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.6rem)', fontWeight: 400, letterSpacing: '-0.025em', color: '#1a1814', lineHeight: 1.1, marginBottom: 20 }}>
            Be among the first<br />to experience <span style={{ fontStyle: 'italic', color: '#c85a20' }}>CAIPO.</span>
          </h2>
          <p style={{ color: '#6b6560', fontSize: '1rem', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 48px' }}>
            Join the waitlist to get early access, help shape the product, and be notified the moment CAIPO ships.
          </p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 520, margin: '0 auto 40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, minWidth: 240, padding: '14px 20px', background: '#fff', border: '1px solid rgba(26,24,20,0.15)', borderRadius: 10, fontSize: '0.9rem', color: '#1a1814', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
            <button style={{ padding: '14px 28px', background: '#c85a20', color: '#fff', border: 'none', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Join Waitlist</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
            {[{ icon: '🎯', label: 'Early Access', sub: 'First to try new features' }, { icon: '🔔', label: 'Launch Notification', sub: 'Know the day it ships' }, { icon: '🔧', label: 'Shape the Product', sub: 'Direct feedback line' }].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1a1814', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'DM Mono, monospace', color: '#b0a89e' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
