import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import ViteSassPlugin from "vite-plugin-sass";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteSassPlugin(), tailwindcss()],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
});
