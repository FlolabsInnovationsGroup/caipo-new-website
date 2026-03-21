import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#050508", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="2" width="4" height="28" rx="2" fill="#7c3aed" opacity="0.9"/>
                <rect x="10" y="6" width="4" height="20" rx="2" fill="#a78bfa" opacity="0.8"/>
                <rect x="16" y="10" width="4" height="12" rx="2" fill="#7c3aed" opacity="0.7"/>
                <rect x="22" y="14" width="4" height="4" rx="2" fill="#a78bfa" opacity="0.6"/>
              </svg>
              <span style={{ fontWeight: 700, color: "#fff", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "1rem" }}>CAIPO</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 24, color: "rgba(255,255,255,0.35)", maxWidth: 220, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              The open-source second brain. Building the screenless interface of the future.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  href: "#",
                  svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                },
                {
                  href: "https://discord.gg",
                  svg: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                },
                {
                  href: "https://github.com/sandeep711/caipo.ai-Redesign",
                  svg: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{
                  width: 32, height: 32, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {item.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Product", links: [["Home", "/"], ["Wearable", "/wearable"], ["Dev Kit", "/devkit"], ["Features", "/features"], ["Pricing", "/pricing"]] },
            { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Support", "#"], ["Discord", "#"]] },
            { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"], ["License", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <p style={{
                fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em",
                textTransform: "uppercase", marginBottom: 18,
                color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace",
              }}>
                {col.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} style={{
                    fontSize: "0.875rem", color: "rgba(255,255,255,0.4)",
                    textDecoration: "none", fontFamily: "Plus Jakarta Sans, sans-serif",
                    transition: "color 0.2s ease",
                  }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>
            © 2025 CAIPO. Open-source hardware. Built in public.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)", fontFamily: "JetBrains Mono, monospace" }}>
            V1.0 Dev Kit — ESP32-S3 + Pi Zero 2W
          </p>
        </div>
      </div>
    </footer>
  );
}
