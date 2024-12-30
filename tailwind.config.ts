import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		
		animation: {
			"spin-slow": "spin 20s linear infinite",
		  },
		  
		backgroundImage: {
			'custom-gradient': 'linear-gradient(94deg, #e5f4ff, #facc15)',
			'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
			'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
		  },
  		fontFamily: {
  			display: [
  				'var(--font-playfair)',
                    ...fontFamily.serif
                ],
  			sans: [
  				'var(--font-dm-sans)',
                    ...fontFamily.sans
                ],
  			ui: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
			outfit: ['var(--font-outfit)',...fontFamily.sans],
  		},
  		fontSize: {
  			'display-large': [
  				'4.5rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'display-medium': [
  				'3.75rem',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'display-small': [
  				'3rem',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'heading-large': [
  				'2.5rem',
  				{
  					lineHeight: '1.25'
  				}
  			],
  			'heading-medium': [
  				'2rem',
  				{
  					lineHeight: '1.3'
  				}
  			],
  			'heading-small': [
  				'1.75rem',
  				{
  					lineHeight: '1.4'
  				}
  			],
  			'body-large': [
  				'1.125rem',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			'body-medium': [
  				'1rem',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			'body-small': [
  				'0.875rem',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			caption: [
  				'0.75rem',
  				{
  					lineHeight: '1.4'
  				}
  			]
  		},
  		letterSpacing: {
  			tighter: '-0.05em',
  			tight: '-0.025em',
  			normal: '0',
  			wide: '0.025em',
  			wider: '0.05em',
  			widest: '0.1em'
  		},
  		colors: {
			primary: '#FBBF24', // Yellow
			primaryLight: '#FCD34D',
			primaryDark: '#F59E0B',
			gray: {
			  50: '#F9FAFB',
			  100: '#F3F4F6',
			  200: '#E5E7EB',
			  300: '#D1D5DB',
			  400: '#9CA3AF',
			  500: '#6B7280',
			  600: '#4B5563',
			  700: '#374151',
			  800: '#1F2937',
			  900: '#111827',
			}
  			
  		},
  	}
  },
} satisfies Config;
