/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				menubar: '12rem',
				menubar_s: '3.5rem',
			},
			screens: {
				s: '924px',
				xs: '864px',
				xxs: '420px',
			},

			fontSize: {
				'1.5xl': [
					'1.375rem',
					{
						lineHeight: '1.75rem',
					},
				],
			},
			spacing: {
				6.25: '1.5625rem',
				18: '4.5rem',
				22: '5.5rem',
				75: '18.75rem',
				87.5: '21.875rem',
				95: '23.75rem',
				field: 'calc(100% - 1rem)',
				friend: 'calc(100svh - 10.65rem)',
				addFriend: 'calc(100svh - 10.25rem)',
				friend_xs: 'calc(100svh - 15.25rem)',
				settings: 'calc(100svh - 3rem)',
				settings_xs: 'calc(100svh - 7.75rem)',
				setting_xs: 'calc(100svh - 25.75rem)',
				chat_tablet: 'calc(100svw - 32.25rem)',
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				default: {
					DEFAULT: 'hsl(var(--default))',
					foreground: 'hsl(var(--default-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				backDefault: {
					DEFAULT: 'hsl(var(--back-default))',
				},
				addFriend: {
					DEFAULT: 'hsl(var(--addFriend))',
				},
				menubar: 'hsl(var(--menubar))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
			},
			keyframes: {
				wiggle: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				wiggle: 'wiggle 1s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
