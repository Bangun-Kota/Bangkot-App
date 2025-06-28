 'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/atoms';
import { DesktopNav, TabletNav, MobileMenu } from '@/components/molecules';

const navigation = [
  { name: 'Beranda', href: '#' },
  { name: 'Profile', href: '#profile' },
  {
    name: 'Services',
    href: '#services',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Event & Program', href: '#programs' },
      { name: 'Project', href: '#projects' },
      { name: 'Media & Materi', href: '#media' },
      { name: 'Our Services', href: '#services' },
    ],
  },
  { name: 'Contact Us', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleResize() {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (pathname !== '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-brand-gray-200 shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <DesktopNav 
            navigation={navigation}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
          
          <TabletNav />
          
          <div className="md:hidden">
            <button
              ref={mobileButtonRef}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 focus:outline-none transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
}