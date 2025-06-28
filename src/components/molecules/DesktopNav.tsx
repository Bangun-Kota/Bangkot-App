import { useState, useRef, useEffect } from 'react';
import { NavItem, NavButton, DropdownItem } from '@/components/atoms';

export default function DesktopNav({ 
  navigation,
  dropdownOpen,
  setDropdownOpen
}: { 
  navigation: any[];
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  return (
    <nav className="hidden lg:flex lg:items-center lg:space-x-1">
      {navigation.map((item) => (
        <div key={item.name} className="relative">
          {item.hasDropdown ? (
            <div className="relative" ref={dropdownRef}>
              <NavButton 
                isOpen={dropdownOpen}
                onClick={() => {}}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {item.name}
              </NavButton>
              
              {dropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-large border border-brand-gray-100 py-2 animate-slide-up"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {item.dropdownItems?.map((dropdownItem: any) => (
                    <DropdownItem 
                      key={dropdownItem.name} 
                      href={dropdownItem.href}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {dropdownItem.name}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavItem href={item.href}>
              {item.name}
            </NavItem>
          )}
        </div>
      ))}
    </nav>
  );
}