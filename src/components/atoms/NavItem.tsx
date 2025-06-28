import Link from 'next/link';

export default function NavItem({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode 
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-sm font-medium text-brand-gray-700 hover:text-brand-yellow hover:bg-brand-gray-50 transition-all duration-200"
    >
      {children}
    </Link>
  );
}