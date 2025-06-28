import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/images/logo.jpeg"
        alt="Brand Name"
        width={120}
        height={40}
        priority
        className="h-8 md:h-10 w-auto dark:invert"
      />
      <span className="ml-3 text-xl font-bold bg-gradient-to-r from-brand-yellow to-brand-turquoise bg-clip-text text-transparent">
        Bangunkota
      </span>
    </Link>
  );
}