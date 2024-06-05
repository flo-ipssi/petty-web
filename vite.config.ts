import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-slick': 'react-slick/lib/index.js',
      'slick-carousel': 'slick-carousel/slick/slick.js',
    },
  },
})
