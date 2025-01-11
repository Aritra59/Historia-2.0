import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{

    proxy:{
      "/users":"http://localhost:8000",
      "/posts":"http://localhost:8000",
      "/events":"http://localhost:8000",
    }
  }
})
