import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - Bright Yellow theme
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',  // Main bright yellow
          600: '#ca8a04',  // Darker yellow for buttons
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        
        // Secondary colors - Turquoise/Mint Green
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // Main turquoise
          600: '#0d9488',  // Darker turquoise
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        // Accent colors for cards and highlights
        accent: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',  // Blue from the palette
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          green: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',  // Complementary green
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',  // Orange accent
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          }
        },
        
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // Background colors
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f0fdfa',
          tertiary: '#fefce8',
          gradient: {
            start: '#eab308',
            middle: '#14b8a6',
            end: '#3b82f6',
          }
        },
        
        // Text colors
        foreground: {
          DEFAULT: '#0f172a',
          secondary: '#475569',
          tertiary: '#64748b',
          muted: '#94a3b8',
        },
        
        // UI State colors
        success: '#14b8a6',
        warning: '#eab308',
        error: '#ef4444',
        info: '#3b82f6',
        
        // Custom colors for the new theme
        brand: {
          yellow: '#eab308',
          'yellow-bright': '#fde047',
          'yellow-dark': '#ca8a04',
          turquoise: '#14b8a6',
          'turquoise-light': '#5eead4',
          'turquoise-dark': '#0d9488',
          blue: '#3b82f6',
          'blue-light': '#93c5fd',
          'blue-dark': '#2563eb',
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      
      // Custom gradients matching the image
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #eab308 0%, #14b8a6 50%, #3b82f6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)',
        'gradient-hero': 'linear-gradient(135deg, #fefce8 0%, #f0fdfa 50%, #eff6ff 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #fde047 0%, #eab308 100%)',
        'gradient-turquoise': 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
        'gradient-blue': 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
      },
      
      // Custom shadows with brand colors
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'yellow': '0 4px 25px -5px rgba(234, 179, 8, 0.3), 0 10px 10px -5px rgba(234, 179, 8, 0.1)',
        'turquoise': '0 4px 25px -5px rgba(20, 184, 166, 0.3), 0 10px 10px -5px rgba(20, 184, 166, 0.1)',
        'blue': '0 4px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.1)',
      },
      
      // Custom border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // Custom font sizes
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
};

export default config;