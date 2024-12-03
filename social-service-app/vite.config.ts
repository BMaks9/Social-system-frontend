import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/


export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest:{
        name: "Tile Notes",
        short_name: "Tile Notes",
        start_url: '/Social-system-frontend/',
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        icons: [
          {
            "src": "./logo192.png",
            "type": "image/png", "sizes": "192x192"
          },
          {
            "src": "./logo512.png",
            "type": "image/png", "sizes": "512x512"
          }
        ],
      }
    })
  ],
  base: '/Social-system-frontend',
  server: {
    port: 3000,
    proxy: {
      "/patronages": {
        target: "http://192.168.0.10:8000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/patronages/, "/patronages"),
      },
    },
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
  },
});

