import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
//import LogoutButton from '@/components/Auth/LogoutButton';

import { LandingPage, MainDashboard } from '@/components/templates'

// app/page.js
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return <LandingPage />;
  }

  // Fetch additional user data if needed
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  return (
    <main>
      <MainDashboard 
        user={session.user} 
        profile={profile || null}
      />
    </main>
  );
}