# vite-plugin-lib-inject-style [![npm](https://img.shields.io/npm/v/@vitejs/plugin-vue.svg)](https://npmjs.com/package/vite-plugin-lib-inject-style)

> The node version must be greater than 16.0.0!does not support ssr!

```ts
// vite.config.ts
import VitePluginLibInjectStyle from 'vite-plugin-lib-inject-style'

export default {
  plugins: [VitePluginLibInjectStyle({
    // options ..
  })]
}
```
## Options

```ts
export interface PluginOptions {
  /**
   * Insert `<style>` tag(s) to the beginning of the container
   * @default false
   */
  prepend?: boolean
  /**
   * Inject CSS into single `<style>` tag only
   * @default false
   */
  singleTag?: boolean
  /**
   * Container for `<style>` tag(s) injection
   * @default "head"
   */
  container?: string
  /**
   * Set attributes of injected `<style>` tag(s)
   * - ex.: `{"id":"global"}`
   */
  attributes?: Record<string, string>
}
```
## License

MIT