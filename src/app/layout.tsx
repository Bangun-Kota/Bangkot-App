import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'


const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export const metadata = {
  title: 'Bangunkota - Platform Kolaborasi Komunitas Bekasi',
  description: 'Bangunkota adalah platform forum kolaborasi komunitas lintas minat di Kota Bekasi dengan 60+ komunitas tergabung.',
}

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