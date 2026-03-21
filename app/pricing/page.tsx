const Tag = ({ children, color, bg, border }: { children: string; color: string; bg: string; border: string }) => (
  <div style={{
    display: 'inline-block', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.1em', textTransform: 'uppercase', color,
    marginBottom: 20, padding: '6px 14px',
    background: bg, border: `1px solid ${border}`, borderRadius: 6, fontWeight: 600,
  }}>{children}</div>
);

const Check = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="7" cy="7" r="7" fill={color} fillOpacity="0.15" />
    <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const plans = [
  {
    name: 'Basic',
    sub: 'Perfect for individual users',
    price: 'Included',
    priceNote: 'Free with the dev kit',
    color: '#a78bfa',
    border: 'rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.04)',
    btnBg: 'rgba(124,58,237,0.12)',
    btnBorder: 'rgba(124,58,237,0.35)',
    btnColor: '#c4b5fd',
    btnLabel: 'Get Started →',
    btnHref: '/devkit',
    features: [
      'Basic AI assistance',
      'Voice commands',
      'Document scanning',
      'Cloud storage',
      'Mobile app access',
    ],
  },
  {
    name: 'Pro',
    sub: 'Ideal for professionals',
    price: '$99',
    priceNote: 'per month',
    popular: true,
    color: '#ede9fe',
    border: 'rgba(167,139,250,0.45)',
    bg: 'rgba(124,58,237,0.08)',
    btnBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    btnBorder: 'transparent',
    btnColor: '#fff',
    btnLabel: 'Get Started →',
    btnHref: '#early-access',
    features: [
      'Everything in Basic',
      'Advanced automation',
      'Priority processing',
      'Extended storage',
      'API access',
      'Premium support',
    ],
  },
  {
    name: 'Enterprise',
    sub: 'For organizations',
    price: 'Contact Us',
    priceNote: 'Custom pricing',
    color: '#4ade80',
    border: 'rgba(34,197,94,0.22)',
    bg: 'rgba(34,197,94,0.03)',
    btnBg: 'rgba(34,197,94,0.1)',
    btnBorder: 'rgba(34,197,94,0.35)',
    btnColor: '#6ee7b7',
    btnLabel: 'Get in Touch →',
    btnHref: 'mailto:hello@caipo.ai',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'Unlimited storage',
      'Team management',
      'Advanced security',
    ],
  },
];

export default function Pricing() {
  return (
    <main style={{ background: '#050508', minHeight: '100vh', color: '#f0f0f5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* ─── HERO ─── */}
      <section style={{ padding: '160px 80px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Tag color="#a78bfa" bg="rgba(124,58,237,0.12)" border="rgba(124,58,237,0.3)">In Development</Tag>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Simple, transparent pricing.
          </h1>
          <p style={{ color: '#b0b0cc', fontSize: '1rem', lineHeight: 1.85, maxWidth: 520, margin: '0 auto' }}>
            While CAIPO is in development, join our early access program to help shape our pricing and features. The dev kit is free and open source — always.
          </p>
        </div>
      </section>

      {/* ─── PRICING CARDS ─── */}
      <section style={{ padding: '0 80px 120px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.bg,
                border: `1px solid ${plan.border}`,
                borderRadius: 22,
                padding: plan.popular ? '36px 32px' : '32px 32px',
                position: 'relative',
                marginTop: plan.popular ? 0 : 24,
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: '#fff', fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '5px 16px', borderRadius: 100,
                  boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
                }}>Most Popular</div>
              )}

              <div style={{ marginBottom: 8, fontWeight: 700, fontSize: '1.1rem', color: plan.color }}>{plan.name}</div>
              <div style={{ color: '#9898b8', fontSize: '0.82rem', marginBottom: 28 }}>{plan.sub}</div>

              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: plan.price === 'Contact Us' ? '1.8rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', color: plan.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {plan.price === '$99' ? (
                    <>{plan.price}<span style={{ fontSize: '1rem', fontWeight: 500, color: '#b0b0cc' }}>/mo</span></>
                  ) : plan.price}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8888a8', fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }}>{plan.priceNote}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Check color={plan.color} />
                    <span style={{ fontSize: '0.85rem', color: '#b0b0c8', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.btnHref}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', padding: '13px 20px',
                  background: plan.btnBg, color: plan.btnColor,
                  border: `1px solid ${plan.btnBorder}`,
                  borderRadius: 10, textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: 600,
                  boxShadow: plan.popular ? '0 4px 20px rgba(124,58,237,0.3)' : 'none',
                  boxSizing: 'border-box' as const,
                }}
              >{plan.btnLabel}</a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EARLY ACCESS CTA ─── */}
      <section id="early-access" style={{ padding: '0 80px 120px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{
            padding: '60px 72px',
            background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 24, textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14 }}>
                Join Early Access
              </h2>
              <p style={{ color: '#b0b0cc', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 36px' }}>
                Get exclusive access to CAIPO during our development phase and help shape its future. Early members influence what gets built next.
              </p>
              <a
                href="#"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff',
                  borderRadius: 11, textDecoration: 'none',
                  fontSize: '0.9rem', fontWeight: 600,
                  boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
                }}
              >
                ✦ Sign Up for Early Access
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
