/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                blink: {
                    '0%, 100%': { backgroundColor: 'transparent' },
                    '50%': { backgroundColor: 'rgba(34, 197, 94, 0.4)' },
                }
            },
            animation: {
                blink: 'blink 1s ease-in-out'
            }
        },
    },
    plugins: [],
}