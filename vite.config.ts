import { defineConfig } from 'vite';

// En producción vive bajo pedrogomez.dev/proyecto/skills, como el resto de proyectos del portfolio.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/proyecto/skills/' : '/',
  // Se anida en dist/proyecto/skills para que el Worker sirva la misma ruta que la URL pública.
  build: { target: 'es2022', outDir: 'dist/proyecto/skills', emptyOutDir: true },
}));
