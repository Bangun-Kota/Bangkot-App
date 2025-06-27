// lib/logger.ts
export const logger = {
  party: async (message: string) => {
    // 1. Log ke Browser (DevTools)
    console.log(
      '%c🎉 ' + message,
      'background: linear-gradient(90deg, #FF5F6D, #FFC371);' +
      'color: white; padding: 2px 6px; border-radius: 3px;'
    );

    // 2. Log ke Terminal (Hanya di Development)
    if (process.env.NODE_ENV === 'development') {
      try {
        // Jika di Server-Side (terminal)
        if (typeof window === 'undefined') {
          console.log('🦄 [SERVER-LOG]:', message);
        } 
        // Jika di Client-Side (kirim ke API)
        else {
          await fetch('/api/dev-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
          });
        }
      } catch (e) {
        console.error('Logger Error:', e);
      }
    }
  }
};