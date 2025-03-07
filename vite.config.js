import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Permitir todos los subdominios de ngrok
    allowedHosts: [
      ".ngrok-free.app", // Permite cualquier subdominio de ngrok
    ],
    cors: true, // Habilitar CORS si es necesario
  },
});
