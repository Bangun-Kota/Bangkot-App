import Link from 'next/link';


export default function DropdownItem({ 
  href, 
  children,
  onClick
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-brand-gray-700 hover:text-brand-turquoise hover:bg-gradient-to-r hover:from-brand-yellow-50 hover:to-secondary-50 transition-colors duration-200 rounded-lg mx-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}