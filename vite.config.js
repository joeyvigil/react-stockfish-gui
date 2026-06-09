import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/react-stockfish-gui/' // Set the base path for GitHub Pages deployment
=======
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
>>>>>>> b9a220b (add AWS EC2 deployment instructions)
})
