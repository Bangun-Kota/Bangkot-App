// components/Auth/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { LogOut } from 'lucide-react';

export function LogoutButton({ className = '' }: { className?: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors ${className}`}
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}