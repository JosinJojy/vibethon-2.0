'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  const registerHref = validUnstopUrl || '#';
  const registerText = registerEnabled ? 'Register' : 'Soon';

  // Handle escape to close menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[#141416]/95 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 flex items-center justify-between h-[64px] md:h-[72px]">
          <Link href="#" className="flex items-center text-foreground font-bebas text-2xl tracking-wide focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
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
                className="text-sm font-sans font-medium text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground rounded"
              >
                {link.label}
              </a>
            ))}
            <a
              href={registerHref}
              {...(registerEnabled ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`px-4 py-2 text-sm font-sans font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
                registerEnabled 
                  ? 'bg-accent-red text-white hover:bg-[#b01c28]' 
                  : 'bg-[#353337] text-muted cursor-not-allowed'
              }`}
              aria-disabled={!registerEnabled}
              onClick={(e) => !registerEnabled && e.preventDefault()}
            >
              {registerText}
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <a
              href={registerHref}
              {...(registerEnabled ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`px-3 py-1.5 text-xs font-sans font-medium rounded ${
                registerEnabled ? 'bg-accent-red text-white' : 'bg-[#353337] text-muted'
              }`}
              onClick={(e) => !registerEnabled && e.preventDefault()}
            >
              {registerText}
            </a>
            <button
              className="text-foreground focus:outline-none focus:ring-2 focus:ring-foreground rounded p-1"
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
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-[64px] flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-2xl font-bebas text-foreground tracking-wide"
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
