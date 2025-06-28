import Link from 'next/link';

export default function MobileNavItem({ 
  href, 
  children,
  onClick,
  color = 'yellow'
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
  color?: 'yellow' | 'turquoise' | 'blue';
}) {
  const colorClasses = {
    yellow: 'from-brand-yellow to-brand-turquoise',
    turquoise: 'from-brand-turquoise to-brand-blue',
    blue: 'from-brand-blue to-brand-yellow'
  };

  return (
    <Link
      href={href}
      className={`group flex items-center px-5 py-4 rounded-xl text-base font-semibold text-brand-gray-700 hover:text-white hover:bg-gradient-to-r ${colorClasses[color]} transition-all duration-300 hover:shadow-${color} hover:scale-[1.02] active:scale-[0.98]`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}