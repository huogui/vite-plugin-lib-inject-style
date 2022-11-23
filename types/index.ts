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
