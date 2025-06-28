import { useRef, useEffect } from 'react';
import MobileNavItem from '@/components/atoms/MobileNavItem';
import Link from 'next/link';

export default function MobileMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={mobileMenuRef}
      className="md:hidden animate-slide-up fixed left-0 right-0 top-16 bg-white z-40 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
    >
      <div className="relative bg-gradient-to-br from-white via-background-secondary to-white border-t border-brand-gray-200 shadow-inner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-yellow/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-turquoise/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative px-4 pt-6 pb-8 space-y-2 w-full max-w-full">
          <MobileNavItem href="#" onClick={onClose} color="yellow">
            <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-yellow/10 to-brand-turquoise/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise group-hover:from-white group-hover:to-white transition-all duration-300"></div>
            </div>
            <span className="flex-1">Beranda</span>
            <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
          </MobileNavItem>

          <MobileNavItem href="#profile" onClick={onClose} color="turquoise">
            <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-turquoise/10 to-brand-blue/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
              <div className="w-4 h-4 border-2 border-brand-turquoise rounded-full group-hover:border-white transition-all duration-300">
                <div className="w-1.5 h-1.5 bg-brand-turquoise rounded-full mx-auto mt-0.5 group-hover:bg-white transition-all duration-300"></div>
              </div>
            </div>
            <span className="flex-1">Profile</span>
            <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
          </MobileNavItem>
          
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
                onClick={onClose}
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                Event & Program
              </Link>
              <Link
                href="#projects"
                className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-brand-turquoise/5 hover:to-brand-blue/5 transition-all duration-200 hover:translate-x-1"
                onClick={onClose}
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-turquoise to-brand-blue opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                Project
              </Link>
              <Link
                href="#media"
                className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue/5 hover:to-brand-yellow/5 transition-all duration-200 hover:translate-x-1"
                onClick={onClose}
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-blue to-brand-yellow opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                Media & Materi
              </Link>
              <Link
                href="#services"
                className="group flex items-center px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-600 hover:text-brand-yellow hover:bg-gradient-to-r hover:from-brand-yellow/5 hover:to-brand-turquoise/5 transition-all duration-200 hover:translate-x-1"
                onClick={onClose}
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-br from-brand-yellow to-brand-turquoise opacity-60 group-hover:opacity-100 transition-all duration-200"></div>
                Our Services
              </Link>
            </div>
          </div>
          
          <MobileNavItem href="#contact" onClick={onClose} color="blue">
            <div className="w-8 h-8 mr-4 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
              <div className="w-4 h-4 border-2 border-brand-blue rounded group-hover:border-white transition-all duration-300"></div>
            </div>
            <span className="flex-1">Contact Us</span>
            <div className="w-1 h-1 rounded-full bg-brand-gray-300 group-hover:bg-white/60 transition-all duration-300"></div>
          </MobileNavItem>

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
  );
}