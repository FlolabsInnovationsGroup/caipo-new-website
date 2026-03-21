'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/devkit', label: 'Dev Kit', badge: 'NEW' },
    { href: '/wearable', label: 'Wearable' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 40px',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="8" width="4" height="12" rx="2" fill="#7c3aed"/>
          <rect x="8" y="4" width="4" height="20" rx="2" fill="#a78bfa"/>
          <rect x="14" y="10" width="4" height="8" rx="2" fill="#7c3aed"/>
          <rect x="20" y="6" width="4" height="16" rx="2" fill="#a78bfa"/>
        </svg>
        <span style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem',
          color: '#f0f0f5', letterSpacing: '-0.01em',
        }}>
          CAIPO
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: active ? '#f0f0f5' : '#7070a0',
              background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              {link.label}
              {link.badge && (
                <span style={{
                  fontSize: '0.58rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  background: 'rgba(124,58,237,0.2)',
                  color: '#a78bfa',
                  border: '1px solid rgba(124,58,237,0.35)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  letterSpacing: '0.05em',
                }}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <Link href="/devkit" style={{
        padding: '9px 22px',
        background: '#7c3aed',
        color: '#fff',
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 600,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}>
        Get Dev Kit
      </Link>
    </nav>
  );
}
