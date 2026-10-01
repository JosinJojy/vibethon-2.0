'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Phases', href: '#phases' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Glimpses', href: '#glimpses' },
  ];

  const validUnstopUrl = eventConfig.unstopUrl ? eventConfig.unstopUrl : null;
  // Note: Since this is in header and needs to match SSR, we do simplified check
  const registerEnabled = !!validUnstopUrl;
  const registerText = registerEnabled ? 'Register' : 'Soon';

  useEffect(() => {
    if (!menuOpen) return;
    menuButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key !== 'Tab') return;
      const items = [
        menuButtonRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
      ].filter((item): item is HTMLButtonElement | HTMLAnchorElement => item !== null);
      if (items.length === 0) return;
      if (e.shiftKey && document.activeElement === items[0]) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
        e.preventDefault();
        items[0].focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`site-header fixed top-0 w-full z-50 ${scrolled ? 'site-header--scrolled' : ''}`}
      >
        <div className="site-header-inner max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 flex items-center justify-between h-[64px] md:h-[72px]">
          <Link href="#" className="flex items-center text-foreground font-display text-2xl tracking-wide focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            {assets.brandLogo.available && assets.brandLogo.src ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img src={assets.brandLogo.src} alt="ENCIDE Logo" className="h-8" />
            ) : (
              <span>ENCIDE</span>
            )}
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground"
              >
                {link.label}
              </a>
            ))}
            {registerEnabled && validUnstopUrl ? (
              <LiquidButton asChild size="sm"><a href={validUnstopUrl} target="_blank" rel="noopener noreferrer">{registerText}</a></LiquidButton>
            ) : (
              <LiquidButton disabled size="sm" tone="neutral">{registerText}</LiquidButton>
            )}
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden items-center gap-4">
            {registerEnabled && validUnstopUrl ? (
              <LiquidButton asChild size="sm"><a href={validUnstopUrl} target="_blank" rel="noopener noreferrer">{registerText}</a></LiquidButton>
            ) : (
              <LiquidButton disabled size="sm" tone="neutral">{registerText}</LiquidButton>
            )}
            <button
              ref={menuButtonRef}
              className="text-foreground focus:outline-none focus:ring-2 focus:ring-foreground p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="site-mobile-menu fixed inset-0 z-40 pt-[88px] flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-4xl font-display text-foreground uppercase tracking-wide"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
