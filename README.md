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
  plugins: [VitePluginLibInjectStyle({
    // export interface PluginOptions {
    // /**
    //  * Insert `<style>` tag(s) to the beginning of the container
    //  * @default false
    //  */
    // prepend?: boolean
    // /**
    //  * Inject CSS into single `<style>` tag only
    //  * @default false
    //  */
    // singleTag?: boolean
    // /**
    //  * Container for `<style>` tag(s) injection
    //  * @default "head"
    //  */
    // container?: string
    // /**
    //  * Set attributes of injected `<style>` tag(s)
    //  * - ex.: `{"id":"global"}`
    //  */
    // attributes?: Record<string, string>
  })],
})

```



