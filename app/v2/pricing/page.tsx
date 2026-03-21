const plans = [
  {
    name: 'Basic', sub: 'Perfect for individual users', price: 'Included', priceNote: 'Free with the dev kit',
    color: '#9a4a20', bg: '#fff', border: 'rgba(26,24,20,0.1)', btnBg: '#f0e8dc', btnBorder: '#e0c8b0', btnColor: '#9a4a20', btnLabel: 'Get Started →', btnHref: '/v2/devkit',
    features: ['Basic AI assistance', 'Voice commands', 'Document scanning', 'Cloud storage', 'Mobile app access'],
  },
  {
    name: 'Pro', sub: 'Ideal for professionals', price: '$99', priceNote: 'per month', popular: true,
    color: '#faf8f4', bg: '#1a1814', border: 'rgba(200,90,32,0.4)', btnBg: '#c85a20', btnBorder: 'transparent', btnColor: '#fff', btnLabel: 'Get Started →', btnHref: '#early-access',
    features: ['Everything in Basic', 'Advanced automation', 'Priority processing', 'Extended storage', 'API access', 'Premium support'],
  },
  {
    name: 'Enterprise', sub: 'For organizations', price: 'Contact Us', priceNote: 'Custom pricing',
    color: '#9a4a20', bg: '#fff', border: 'rgba(26,24,20,0.1)', btnBg: '#f0e8dc', btnBorder: '#e0c8b0', btnColor: '#9a4a20', btnLabel: 'Get in Touch →', btnHref: 'mailto:hello@caipo.ai',
    features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'Unlimited storage', 'Team management', 'Advanced security'],
  },
];

export default function PricingV2() {
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
      <section style={{ padding: '160px 60px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: '#f0e8dc', color: '#9a4a20', border: '1px solid #e0c8b0', borderRadius: 100, fontSize: '0.72rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 32, fontWeight: 500 }}>In Development</div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20, color: '#1a1814' }}>
          Simple, transparent pricing.
        </h1>
        <p style={{ color: '#6b6560', fontSize: '1rem', lineHeight: 1.85, maxWidth: 520, margin: '0 auto' }}>
          While CAIPO is in development, join our early access program. The dev kit is free and open source — always.
        </p>
      </section>

      {/* CARDS */}
      <section style={{ padding: '0 60px 100px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{ background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 22, padding: plan.popular ? '40px 36px' : '36px 32px', position: 'relative', marginTop: plan.popular ? 0 : 24, boxShadow: plan.popular ? '0 8px 40px rgba(26,24,20,0.12)' : '0 2px 8px rgba(26,24,20,0.04)' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#c85a20', color: '#fff', fontSize: '0.65rem', fontFamily: 'DM Mono, monospace', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100 }}>Most Popular</div>
              )}
              <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1.2rem', color: plan.popular ? '#e8d5c0' : '#1a1814', marginBottom: 6 }}>{plan.name}</div>
              <div style={{ color: plan.popular ? '#7a7068' : '#9a9590', fontSize: '0.82rem', marginBottom: 28 }}>{plan.sub}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: plan.price === 'Contact Us' ? '2rem' : '2.8rem', fontWeight: 400, letterSpacing: '-0.03em', color: plan.popular ? '#faf8f4' : '#1a1814' }}>
                  {plan.price === '$99' ? <>{plan.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: plan.popular ? '#7a7068' : '#9a9590' }}>/mo</span></> : plan.price}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: plan.popular ? '#6a6058' : '#b0a89e', fontFamily: 'DM Mono, monospace', marginBottom: 32 }}>{plan.priceNote}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: plan.popular ? 'rgba(200,90,32,0.2)' : '#f0e8dc', border: `1px solid ${plan.popular ? 'rgba(200,90,32,0.4)' : '#e0c8b0'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, fontSize: '0.55rem', color: plan.popular ? '#e8844a' : '#c85a20', fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: '0.85rem', color: plan.popular ? '#c8c0b4' : '#6b6560', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={plan.btnHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '13px 20px', background: plan.btnBg, color: plan.btnColor, border: `1px solid ${plan.btnBorder}`, borderRadius: 10, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, boxSizing: 'border-box' as const }}>{plan.btnLabel}</a>
            </div>
          ))}
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section id="early-access" style={{ padding: '0 60px 120px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '60px 72px', background: '#1a1814', borderRadius: 24, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, background: 'radial-gradient(circle, rgba(200,90,32,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, letterSpacing: '-0.025em', marginBottom: 14, color: '#faf8f4' }}>Join Early Access</h2>
            <p style={{ color: '#8a8078', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 36px' }}>Get exclusive access to CAIPO during our development phase and help shape its future.</p>
            <div style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, minWidth: 240, padding: '14px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: '0.9rem', color: '#faf8f4', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              <button style={{ padding: '14px 28px', background: '#c85a20', color: '#fff', border: 'none', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}>✦ Join Early Access</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
