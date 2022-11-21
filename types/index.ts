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
  /**
   * Makes injector treeshakeable,
   * as it is only called when either classes are referenced directly,
   * or `inject` function is called from the default export.
   *
   * Incompatible with `namedExports` option.
   */
  treeshakeable?: boolean
}
