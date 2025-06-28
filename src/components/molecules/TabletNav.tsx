import { useState, useRef, useEffect } from 'react';
import { NavItem, NavButton, DropdownItem } from '@/components/atoms';

export default function TabletNav() {
  const [tabletDropdownOpen, setTabletDropdownOpen] = useState(false);
  const tabletDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleTabletClickOutside(event: MouseEvent | TouchEvent) {
      if (tabletDropdownRef.current && !tabletDropdownRef.current.contains(event.target as Node)) {
        setTabletDropdownOpen(false);
      }
    }

    if (tabletDropdownOpen) {
      document.addEventListener('mousedown', handleTabletClickOutside);
      document.addEventListener('touchstart', handleTabletClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleTabletClickOutside);
      document.removeEventListener('touchstart', handleTabletClickOutside);
    };
  }, [tabletDropdownOpen]);

  return (
    <nav className="hidden md:flex lg:hidden md:items-center md:space-x-1">
      <NavItem href="#">Beranda</NavItem>
      <NavItem href="#profile">Profile</NavItem>
      
      <div className="relative" ref={tabletDropdownRef}>
        <NavButton 
          isOpen={tabletDropdownOpen}
          onClick={() => setTabletDropdownOpen(!tabletDropdownOpen)}
        >
          More
        </NavButton>
        
        {tabletDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-large border border-brand-gray-100 py-2 animate-slide-up">
            <DropdownItem href="#programs" onClick={() => setTabletDropdownOpen(false)}>
              Event & Program
            </DropdownItem>
            <DropdownItem href="#projects" onClick={() => setTabletDropdownOpen(false)}>
              Project
            </DropdownItem>
            <DropdownItem href="#media" onClick={() => setTabletDropdownOpen(false)}>
              Media & Materi
            </DropdownItem>
            <DropdownItem href="#services" onClick={() => setTabletDropdownOpen(false)}>
              Our Services
            </DropdownItem>
            <DropdownItem href="#contact" onClick={() => setTabletDropdownOpen(false)}>
              Contact Us
            </DropdownItem>
          </div>
        )}
      </div>
    </nav>
  );
}