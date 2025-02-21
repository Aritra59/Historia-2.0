import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{

    proxy:{
      "/users":"https://historia-2-0.onrender.com",
      "/posts":"https://historia-2-0.onrender.com",
      "/events":"https://historia-2-0.onrender.com",
    }
  }
})
