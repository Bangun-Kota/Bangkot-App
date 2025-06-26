'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation';

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
]

export default function Header() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [tabletDropdownOpen, setTabletDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const tabletDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  
  

  // Desktop dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [dropdownOpen])

  // Tablet dropdown outside click
  useEffect(() => {
    function handleTabletClickOutside(event: MouseEvent | TouchEvent) {
      if (
        tabletDropdownRef.current &&
        !tabletDropdownRef.current.contains(event.target as Node)
      ) {
        setTabletDropdownOpen(false)
      }
    }

    if (tabletDropdownOpen) {
      document.addEventListener('mousedown', handleTabletClickOutside)
      document.addEventListener('touchstart', handleTabletClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleTabletClickOutside)
      document.removeEventListener('touchstart', handleTabletClickOutside)
    }
  }, [tabletDropdownOpen])

  // Mobile menu outside click
  useEffect(() => {
    function handleMobileClickOutside(event: MouseEvent | TouchEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleMobileClickOutside)
      document.addEventListener('touchstart', handleMobileClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleMobileClickOutside)
      document.removeEventListener('touchstart', handleMobileClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Reset all dropdowns on window resize
  useEffect(() => {
    function handleResize() {
      setDropdownOpen(false)
      setTabletDropdownOpen(false)
      setMobileMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const pathname = usePathname()
  if (pathname !== '/') {
    return null
  }

  // --- UI rendering tetap seperti versi lo sebelumnya ---
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-brand-gray-200 shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
              src="/images/logo.jpeg"
              alt="Brand Name"
              width={120}
              height={40}
              priority // Untuk logo yang penting
              className="h-8 md:h-10 w-auto dark:invert"
            />

              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-brand-yellow to-brand-turquoise bg-clip-text text-transparent">
                Bangunkota
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - FIXED */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 transition-all duration-200"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      onFocus={() => setDropdownOpen(true)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu - FIXED */}
                    {dropdownOpen && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-large border border-brand-gray-100 py-2 animate-slide-up"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-brand-yellow-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Tablet Navigation - FIXED */}
          <nav className="hidden md:flex lg:hidden md:items-center md:space-x-1">
            <Link
              href="#"
              className="px-3 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 transition-all duration-200"
            >
              Beranda
            </Link>
            <Link
              href="#profile"
              className="px-3 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-turquoise hover:bg-brand-gray-50 transition-all duration-200"
            >
              Profile
            </Link>
            <div className="relative" ref={tabletDropdownRef}>
              <button
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-blue hover:bg-brand-gray-50 transition-all duration-200"
                onClick={() => setTabletDropdownOpen(!tabletDropdownOpen)}
                aria-expanded={tabletDropdownOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${tabletDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {tabletDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-large border border-brand-gray-100 py-2 animate-slide-up">
                  <Link 
                    href="#programs" 
                    className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-yellow hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => setTabletDropdownOpen(false)}
                  >
                    Event & Program
                  </Link>
                  <Link 
                    href="#projects" 
                    className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => setTabletDropdownOpen(false)}
                  >
                    Project
                  </Link>
                  <Link 
                    href="#media" 
                    className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-blue hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => setTabletDropdownOpen(false)}
                  >
                    Media & Materi
                  </Link>
                  <Link 
                    href="#services" 
                    className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-yellow hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => setTabletDropdownOpen(false)}
                  >
                    Our Services
                  </Link>
                  <Link 
                    href="#contact" 
                    className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => setTabletDropdownOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden animate-slide-up fixed left-0 right-0 top-16 bg-white z-40 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
        >
          <div className="relative bg-gradient-to-br from-white via-background-secondary to-white border-t border-brand-gray-200 shadow-inner">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-yellow/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-turquoise/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative px-4 pt-6 pb-8 space-y-2 w-full max-w-full">
              {/* Main navigation items */}
              <Link
                href="#"
                className="group flex items-center px-5 py-4 rounded-xl text-base font-semibold text-brand-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-brand-yellow hover:to-brand-turquoise transition-all duration-300 hover:shadow-yellow hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-yellow/10 to-brand-turquoise/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise group-hover:from-white group-hover:to-white transition-all duration-300"></div>
                </div>
                <span className="flex-1">Beranda</span>
                <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
              </Link>

              <Link
                href="#profile"
                className="group flex items-center px-5 py-4 rounded-xl text-base font-semibold text-brand-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-brand-turquoise hover:to-brand-blue transition-all duration-300 hover:shadow-turquoise hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-turquoise/10 to-brand-blue/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
                  <div className="w-4 h-4 border-2 border-brand-turquoise rounded-full group-hover:border-white transition-all duration-300">
                    <div className="w-1.5 h-1.5 bg-brand-turquoise rounded-full mx-auto mt-0.5 group-hover:bg-white transition-all duration-300"></div>
                  </div>
                </div>
                <span className="flex-1">Profile</span>
                <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
              </Link>
              
              {/* Services section */}
              <div className="py-2">
                <div className="flex items-center px-5 py-3 mb-2">
                  <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-yellow/20 to-brand-turquoise/20 flex items-center justify-center">
                    <div className="w-4 h-4 border border-brand-turquoise rounded border-dashed"></div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-brand-yellow/20 via-brand-turquoise/20 to-transparent"></div>
                  <span className="ml-3 text-xs font-bold text-brand-gray-500 uppercase tracking-wider">Services</span>
                </div>
                
                <div className="space-y-1 ml-4 pl-8 border-l-2 border-gradient-to-b from-brand-yellow/20 to-brand-turquoise/20">
                  <Link
                    href="#programs"
                    className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-yellow hover:bg-gradient-to-r hover:from-brand-yellow/5 hover:to-brand-turquoise/5 transition-all duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                    Event & Program
                  </Link>
                  <Link
                    href="#projects"
                    className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-brand-turquoise/5 hover:to-brand-blue/5 transition-all duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-turquoise to-brand-blue opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                    Project
                  </Link>
                  <Link
                    href="#media"
                    className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue/5 hover:to-brand-yellow/5 transition-all duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-blue to-brand-yellow opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                    Media & Materi
                  </Link>
                  <Link
                    href="#services"
                    className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-yellow hover:bg-gradient-to-r hover:from-brand-yellow/5 hover:to-brand-turquoise/5 transition-all duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                    Our Services
                  </Link>
                </div>
              </div>
              
              <Link
                href="#contact"
                className="group flex items-center px-5 py-4 rounded-xl text-base font-semibold text-brand-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-yellow transition-all duration-300 hover:shadow-blue hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
                  <div className="w-4 h-4 border-2 border-brand-blue rounded group-hover:border-white transition-all duration-300"></div>
                </div>
                <span className="flex-1">Contact Us</span>
                <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
              </Link>

              {/* Decorative bottom element */}
              <div className="flex justify-center pt-4 mt-6 border-t border-brand-gray-200/50">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-yellow to-brand-turquoise opacity-40"></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-turquoise to-brand-blue opacity-60"></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-yellow opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}