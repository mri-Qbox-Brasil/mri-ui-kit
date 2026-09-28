import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
    presets: [require('./tailwind-preset.cjs')],
    content: [
        './src/**/*.{ts,tsx,js,jsx,mdx}'
    ],
    plugins: [require("tailwindcss-animate")]
}
