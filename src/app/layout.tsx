import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next';


const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  //metadataBase: new URL('https://domain-anda.com'), // Wajib untuk URL absolut
  title: {
    default: 'Bangunkota - Platform Kolaborasi Lintas Komunitas Bekasi',
    template: '%s | Bangun Kota' // Template dinamis
  },
  description: 'Bangunkota adalah platform forum kolaborasi komunitas lintas minat di Kota Bekasi dengan 60+ komunitas tergabung.',
  //keywords: ['keyword1', 'keyword2', '...'],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  },
  icons: {
    icon: '/images/favicon_io/favicon.ico',
    shortcut: '/images/logo.png',
    apple: '/images/favicon_io/apple-touch-icon.png'
  },
  manifest: '/manifest.json', // Untuk PWA
  openGraph: {
    title: 'Bangun Kota',
    description: 'Platform Lintas Komunitas',
    url: 'https://domain-anda.com',
    siteName: 'Bangun Kota',
    images: [{
      url: 'https://www.bangunkota.id/wp-content/uploads/2024/01/bangunkota-logo.png', 
      width: 800,
      height: 600
    }],
    locale: 'id_ID',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangun Kota',
    description: 'Platform Lintas Komunitas',
    images: ['https://www.bangunkota.id/wp-content/uploads/2024/01/bangunkota-logo.png']
  },
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/id',
      'en-US': '/en'
    }
  },
  verification: {
    google: 'google-site-verification-key'
  },
  category: 'komunitas'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      
      <body className={`${jakarta.variable} font-sans bg-white text-gray-900`}>
        
        
        {children}
        
      
      </body>
    </html>
  )
}





