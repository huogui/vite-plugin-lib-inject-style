## Install and basic usage

```bash
$ npm install vite-plugin-lib-inject-style
```
Register the vite-plugin-lib-inject-style
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import VitePluginLibInjectStyle from 'vite-plugin-lib-inject-style'

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
  plugins: [VitePluginLibInjectStyle({})],
})

```



