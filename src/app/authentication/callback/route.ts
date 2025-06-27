// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=invalid_code`
    );
  }

  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(requestUrl.origin);
  } catch (error: unknown) {
    console.error("Callback Error:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=auth_failed`
    );
  }
}