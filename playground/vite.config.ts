import { defineConfig } from 'vite'
import VitePluginLibInjectStyle from '../src/index'

export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/main.ts',
      ],
      name: 'Playground',
      // the proper extensions will be added
      fileName: 'playground',
    },
  },
  plugins: [VitePluginLibInjectStyle({
    container: 'body',
  })],
})
