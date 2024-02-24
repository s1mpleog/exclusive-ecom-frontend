import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ["Rubik"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
