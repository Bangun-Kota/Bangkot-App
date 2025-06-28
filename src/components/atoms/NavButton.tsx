import { ChevronDown } from 'lucide-react';

export default function NavButton({ 
  isOpen, 
  onClick,
  children 
}: { 
  isOpen: boolean; 
  onClick: () => void;
  children: React.ReactNode 
}) {
  return (
    <button
      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 transition-all duration-200"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}