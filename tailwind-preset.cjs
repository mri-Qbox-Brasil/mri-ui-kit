/**
 * Preset Tailwind da suíte MRI: tokens de cor, radius, fonte e animações.
 * Uso no consumidor: `presets: [require('@mriqbox/ui-kit/tailwind-preset')]`.
 * `background`, `card` e `border` respeitam o tema glass (ver src/index.css).
 * @type {import('tailwindcss').Config}
 */
module.exports = {
    darkMode: ['class'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
                },
                tertiary: '#2C2E33',
                accent: {
                    DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                    foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                },
                border_primary: 'hsl(var(--border) / <alpha-value>)',
                hover_secondary: '#5c5f66',
                background: 'hsl(var(--background) / calc(var(--ui-surface-alpha, 1) * <alpha-value>))',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
                card: {
                    DEFAULT: 'hsl(var(--card) / calc(var(--ui-surface-alpha-card, 1) * <alpha-value>))',
                    foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                    foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
                },
                border: 'hsl(var(--ui-border-hsl, var(--border)) / calc(var(--ui-border-alpha, 1) * <alpha-value>))',
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',
                // Cores de status do /uiconfig (successColor/warningColor/errorColor).
                success: 'rgb(var(--ui-success-rgb) / <alpha-value>)',
                warning: 'rgb(var(--ui-warning-rgb) / <alpha-value>)',
                error: 'rgb(var(--ui-error-rgb) / <alpha-value>)',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            // Toda a escala segue o --radius do /uiconfig. Sem DEFAULT e xl/2xl/3xl
            // o Tailwind usa os fixos (.25rem/.75rem/1rem/1.5rem) e `rounded`,
            // `rounded-t-*`, `rounded-xl`... ignoram o slider. xl/2xl/3xl são
            // multiplicativos pra radius 0 zerar de verdade; nos 8px padrão dá
            // exatamente os valores do Tailwind. `full` fica nativo (círculos).
            borderRadius: {
                DEFAULT: 'calc(var(--radius) - 4px)',
                sm: 'calc(var(--radius) - 4px)',
                md: 'calc(var(--radius) - 2px)',
                lg: 'var(--radius)',
                xl: 'calc(var(--radius) * 1.5)',
                '2xl': 'calc(var(--radius) * 2)',
                '3xl': 'calc(var(--radius) * 3)',
            },
            fontFamily: {
                sans: ['var(--ui-font-family, "Saira")', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                shimmer: 'shimmer 2s ease-in-out infinite',
            },
        },
    },
}
