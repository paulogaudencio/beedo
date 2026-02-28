/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                'beedo-blue': '#3B82F6',
                'beedo-orange': '#F97316',
                'beedo-dark': '#0F172A',
                'beedo-slate': '#475569',
                'beedo-light': '#F9FAFB',
            },
            boxShadow: {
                'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                'orange-glow': '0 10px 20px -5px rgba(249, 115, 22, 0.3)',
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float-delayed 7s ease-in-out infinite',
                'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0)' },
                    '50%': { transform: 'translateY(-10px) rotate(1deg)' },
                },
                'float-delayed': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0)' },
                    '50%': { transform: 'translateY(-8px) rotate(-1deg)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
