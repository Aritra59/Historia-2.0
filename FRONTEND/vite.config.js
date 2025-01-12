import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{

    proxy:{
      "/users":"http://https://historia-frontend.onrender.com",
      "/posts":"http://https://historia-frontend.onrender.com",
      "/events":"http://https://historia-frontend.onrender.com",
    }
  }
})
