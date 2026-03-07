import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'app.html')
            }
        }
    }
})
