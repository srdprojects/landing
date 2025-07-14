import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cdn from "vite-plugin-cdn2";
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['btn'].includes(tag),
        }
      }
    }),
    process.env.NODE_ENV === "production" &&
    cdn({
      modules: [
        {
          name: "vue",
          global: "Vue",
          path: "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js",
        },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    minify: 'esbuild', // Ensures JavaScript minification
    terserOptions: {
      compress: {
        drop_console: true, // Removes console logs
        drop_debugger: true, // Removes debugger statements
      },
      format: {
        comments: false, // Removes comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Moves dependencies to a separate chunk
          }
        },
      },
    },
  },
  server: {
    hmr: {
      overlay: false, // Removes Vite’s error overlay
    },
  },
  esbuild: {
    minify: true,  // Minify in dev mode
    legalComments: "none",  // Remove comments
    drop: ["console", "debugger"],  // Remove console.logs and debuggers
  },
})
