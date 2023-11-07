import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react(), eslint()]
  };
});
