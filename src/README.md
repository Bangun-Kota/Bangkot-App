# 📚 Dokumentasi Struktur Proyek

> **Panduan lengkap untuk memahami arsitektur dan organisasi kode dalam proyek ini**

---

## 🎯 Ringkasan Proyek

Proyek ini menggunakan arsitektur modern berbasis komponen dengan struktur folder yang terorganisir untuk mendukung skalabilitas dan maintainability aplikasi web. Struktur ini mengikuti best practices industri untuk pengembangan aplikasi JavaScript/TypeScript.

---

## 🏗️ Breakdown Struktur Folder

### 📁 `src/`
> **Direktori Utama Source Code**

**Fungsi:**
- Direktori root yang berisi seluruh kode sumber aplikasi
- Titik masuk utama untuk build tools dan bundler
- Mengorganisir semua komponen aplikasi dalam satu tempat

**Contoh Penggunaan:**
```javascript
// Biasanya berisi index file utama
// src/index.js atau src/main.js
import App from './app/App'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

---

### 🏠 `app/`
> **Struktur Aplikasi & Routing**

**Fungsi:**
- Mengelola routing aplikasi (Next.js App Router atau React Router)
- Berisi layout utama dan konfigurasi aplikasi
- Mengatur struktur halaman dan navigasi

**Contoh Struktur:**
```
app/
├── layout.tsx          # Layout utama aplikasi
├── page.tsx           # Halaman beranda
├── globals.css        # Style global
├── about/
│   └── page.tsx       # Halaman tentang
└── dashboard/
    ├── page.tsx       # Dashboard utama
    └── settings/
        └── page.tsx   # Halaman pengaturan
```

**Contoh Kode:**
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

### 🧩 `components/`
> **Komponen UI Reusable**

**Fungsi:**
- Menyimpan komponen React yang dapat digunakan ulang
- Mengorganisir UI elements dalam bentuk modular
- Memisahkan logic presentasi dari business logic

**Contoh Struktur:**
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── forms/
│   ├── LoginForm.tsx
│   └── ContactForm.tsx
└── layout/
    ├── Header.tsx
    ├── Footer.tsx
    └── Sidebar.tsx
```

**Contoh Komponen:**
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

---

### ⚙️ `config/`
> **Konfigurasi Aplikasi**

**Fungsi:**
- Menyimpan file konfigurasi dan environment variables
- Mengatur setting untuk berbagai environment (dev, staging, prod)
- Konfigurasi database, API, dan service eksternal

**Contoh File:**
```
config/
├── database.ts        # Konfigurasi database
├── api.ts            # Konfigurasi API endpoints
├── auth.ts           # Konfigurasi autentikasi
└── environment.ts    # Environment variables
```

**Contoh Konfigurasi:**
```typescript
// config/api.ts
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// config/database.ts
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
}
```

---

### 📊 `constants/`
> **Konstanta Global**

**Fungsi:**
- Menyimpan nilai-nilai konstan yang digunakan di seluruh aplikasi
- Menghindari magic numbers dan hard-coded values
- Memudahkan maintenance dan perubahan nilai global

**Contoh File:**
```
constants/
├── index.ts          # Export semua konstanta
├── routes.ts         # Konstanta routing
├── api-endpoints.ts  # Endpoint API
└── ui-constants.ts   # Konstanta UI
```

**Contoh Konstanta:**
```typescript
// constants/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
  LOGIN: '/auth/login',
  PROFILE: '/profile'
} as const

// constants/ui-constants.ts
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
} as const

export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#64748B',
  SUCCESS: '#10B981',
  ERROR: '#EF4444'
} as const
```

---

### 🔄 `contexts/`
> **React Context & State Management**

**Fungsi:**
- Mengelola state global menggunakan React Context API
- Menyediakan data dan fungsi yang dapat diakses di seluruh komponen
- Alternative untuk state management library seperti Redux

**Contoh Struktur:**
```
contexts/
├── AuthContext.tsx    # Konteks autentikasi
├── ThemeContext.tsx   # Konteks tema
├── UserContext.tsx    # Konteks data user
└── AppContext.tsx     # Konteks aplikasi global
```

**Contoh Context:**
```tsx
// contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const user = await authService.login(email, password)
      setUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

### 🎣 `hooks/`
> **Custom React Hooks**

**Fungsi:**
- Menyimpan logic yang dapat digunakan ulang dalam bentuk custom hooks
- Memisahkan stateful logic dari komponen UI
- Mengikuti prinsip DRY (Don't Repeat Yourself)

**Contoh File:**
```
hooks/
├── useAuth.ts        # Hook untuk autentikasi
├── useApi.ts         # Hook untuk API calls
├── useLocalStorage.ts # Hook untuk local storage
└── useDebounce.ts    # Hook untuk debouncing
```

**Contoh Custom Hook:**
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

---

### 📚 `lib/`
> **Utility Libraries & Helper Functions**

**Fungsi:**
- Berisi utility functions dan helper methods
- Konfigurasi library pihak ketiga
- Pure functions yang tidak bergantung pada React

**Contoh File:**
```
lib/
├── utils.ts          # Utility functions umum
├── validators.ts     # Function validasi
├── formatters.ts     # Function formatting
├── api-client.ts     # Client untuk API
└── auth.ts          # Helper autentikasi
```

**Contoh Utilities:**
```typescript
// lib/utils.ts
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// lib/validators.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
```

---

### 🎨 `providers/`
> **Provider Components & Wrappers**

**Fungsi:**
- Menyimpan provider components untuk state management
- Wrapper untuk library pihak ketiga (Theme Provider, Query Client, dll)
- Mengorganisir provider hierarchy

**Contoh File:**
```
providers/
├── AppProviders.tsx   # Provider utama aplikasi
├── QueryProvider.tsx  # React Query provider
├── ThemeProvider.tsx  # Provider tema
└── ToastProvider.tsx  # Provider notifikasi
```

**Contoh Provider:**
```tsx
// providers/AppProviders.tsx
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}

// providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      cacheTime: 1000 * 60 * 10, // 10 menit
    },
  },
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

### 🎨 `styles/`
> **Styling & CSS Files**

**Fungsi:**
- Menyimpan file CSS, SCSS, atau styled-components
- Mengorganisir tema dan design system
- Global styles dan component-specific styles

**Contoh Struktur:**
```
styles/
├── globals.css       # Style global
├── components.css    # Style komponen
├── utilities.css     # Utility classes
├── variables.css     # CSS variables
└── themes/
    ├── light.css     # Tema terang
    └── dark.css      # Tema gelap
```

**Contoh CSS:**
```css
/* styles/globals.css */
:root {
  --color-primary: #3B82F6;
  --color-secondary: #64748B;
  --color-background: #FFFFFF;
  --color-text: #1F2937;
  --border-radius: 0.5rem;
  --spacing-unit: 0.25rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-background);
}

/* styles/utilities.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: #2563EB;
}
```

---

### 🏷️ `types/`
> **TypeScript Type Definitions**

**Fungsi:**
- Menyimpan definisi type dan interface TypeScript
- Mengorganisir tipe data untuk berbagai domain
- Memastikan type safety di seluruh aplikasi

**Contoh File:**
```
types/
├── index.ts          # Export semua types
├── user.ts          # Types untuk user
├── api.ts           # Types untuk API response
├── auth.ts          # Types untuk autentikasi
└── common.ts        # Types umum
```

**Contoh Types:**
```typescript
// types/user.ts
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'user' | 'moderator'

export interface UserProfile extends Omit<User, 'createdAt' | 'updatedAt'> {
  bio?: string
  location?: string
  website?: string
}

// types/api.ts
export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// types/common.ts
export type Status = 'loading' | 'success' | 'error' | 'idle'

export interface SelectOption {
  label: string
  value: string | number
}

export type Theme = 'light' | 'dark' | 'system'
```

---

### 🛠️ `utils/`
> **Utility Functions & Helpers**

**Fungsi:**
- Berisi pure functions untuk keperluan umum
- Helper functions yang tidak specific ke domain tertentu
- Utility untuk formatting, validation, dan manipulasi data

**Contoh File:**
```
utils/
├── index.ts          # Export semua utilities
├── date.ts          # Utility untuk tanggal
├── string.ts        # Utility untuk string
├── array.ts         # Utility untuk array
└── object.ts        # Utility untuk object
```

**Contoh Utilities:**
```typescript
// utils/date.ts
export const formatDate = (date: Date | string, format: string = 'dd/MM/yyyy'): string => {
  const d = new Date(date)
  
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear().toString()
  
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year)
}

export const getRelativeTime = (date: Date | string): string => {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Baru saja'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`
  
  return formatDate(targetDate)
}

// utils/string.ts
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export const truncate = (text: string, length: number = 100): string => {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// utils/array.ts
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array))
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}
```

---

### ⚡ `middleware.ts`
> **Middleware Functions**

**Fungsi:**
- Menangani request/response di level aplikasi
- Implementasi authentication, logging, CORS, dll
- Middleware untuk Next.js atau Express.js

**Contoh Middleware:**
```typescript
// middleware.ts (Next.js)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Cek autentikasi untuk route yang dilindungi
  const protectedRoutes = ['/dashboard', '/profile', '/admin']
  const currentPath = request.nextUrl.pathname
  
  if (protectedRoutes.some(route => currentPath.startsWith(route))) {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1'
  const rateLimitKey = `rate_limit_${ip}`
  
  // Log request
  console.log(`${new Date().toISOString()} - ${request.method} ${currentPath} - IP: ${ip}`)
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

## 🚀 Cara Menggunakan Struktur Ini

### 1. **Import Components**
```typescript
// Menggunakan komponen dari components/
import { Button } from '@/components/ui/Button'
import { LoginForm } from '@/components/forms/LoginForm'
```

### 2. **Menggunakan Hooks**
```typescript
// Menggunakan custom hooks
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const MyComponent = () => {
  const { user, login } = useAuth()
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  // Component logic...
}
```

### 3. **Menggunakan Utilities**
```typescript
// Menggunakan utility functions
import { formatDate, capitalize } from '@/utils'
import { validateEmail } from '@/lib/validators'

const formattedDate = formatDate(new Date(), 'dd MMM yyyy')
const title = capitalize('hello world')
const isValidEmail = validateEmail('user@example.com')
```

### 4. **Type Safety**
```typescript
// Menggunakan types yang sudah didefinisikan
import type { User, ApiResponse } from '@/types'

const handleUserData = (response: ApiResponse<User>) => {
  if (response.success) {
    console.log('User:', response.data.name)
  }
}
```

---

## 📋 Best Practices

### ✅ **Do's**
- Gunakan penamaan yang konsisten dan deskriptif
- Kelompokkan file berdasarkan fungsi, bukan berdasarkan tipe
- Implementasikan TypeScript untuk type safety
- Pisahkan business logic dari presentational logic
- Gunakan absolute imports (`@/components`) daripada relative imports
- Dokumentasikan komponen dan functions yang kompleks

### ❌ **Don'ts**
- Jangan buat folder yang terlalu dalam (max 3-4 level)
- Hindari circular dependencies
- Jangan simpan file yang tidak terkait dalam satu folder
- Jangan hardcode values, gunakan constants
- Hindari duplicate code, buat reusable components/utils

---

## 🔧 Konfigurasi Tambahan

### Path Aliases (tsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### ESLint Rules
```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "internal"
          }
        ]
      }
    ]
  }
}
```

---

## 📝 Kesimpulan

Struktur folder ini dirancang untuk mendukung:
- **Skalabilitas**: Mudah untuk menambah fitur baru
- **Maintainability**: Kode mudah dipahami dan dimodifikasi  
- **Reusability**: Komponen dan utilities dapat digunakan ulang
- **Type Safety**: TypeScript memberikan keamanan tipe data
- **Developer Experience**: Struktur yang intuitif dan mudah dinavigasi

Ikuti panduan ini untuk memastikan konsistensi dan kualitas kode yang baik dalam pengembangan aplikasi.

---

*Dokumentasi ini akan terus diperbarui seiring dengan perkembangan proyek.*