import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import biomePlugin from "vite-plugin-biome";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), biomePlugin()],
});
