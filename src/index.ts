import { promises as fs } from 'fs'
import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import MagicString from 'magic-string'
import type { OutputBundle } from 'rollup'
import type { PluginOptions } from '../types/index'

const styleRegex = /\.(css)$/

const InejctStyle = (code: string, options: PluginOptions) =>
  `function styleInject(css, options) {
    if (!css || typeof document === 'undefined')
      return

    const position = options.prepend === true ? 'prepend' : 'append'
    const singleTag = options.singleTag === true

    const container
  = typeof options.container === 'string'
    ? document.querySelector(options.container)
    : document.getElementsByTagName('head')[0]

    function createStyleTag() {
      const styleTag = document.createElement('style')
      styleTag.setAttribute('type', 'text/css')
      if (options.attributes) {
        const k = Object.keys(options.attributes)
        for (let i = 0; i < k.length; i++)
          styleTag.setAttribute(k[i], options.attributes[k[i]])
      }
      const pos = position === 'prepend' ? 'afterbegin' : 'beforeend'
      container.insertAdjacentElement(pos, styleTag)
      return styleTag
    }

    /** @type {HTMLStyleElement} */
    let styleTag

    if (singleTag) {
      let id = containers.indexOf(container)

      if (id === -1) {
        id = containers.push(container) - 1
        styleTags[id] = {}
      }

      if (styleTags[id] && styleTags[id][position])
        styleTag = styleTags[id][position]

      else
        styleTag = styleTags[id][position] = createStyleTag()
    }
    else {
      styleTag = createStyleTag()
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF)
      css = css.substring(1)

    if (styleTag.styleSheet)
      styleTag.styleSheet.cssText += css

    else
      styleTag.appendChild(document.createTextNode(css))
  };styleInject(\`${code}\`,\`${JSON.stringify(options)}\`)`

const styles: string[] = []

const replaceContent = 'console.warn("__INJECT_STYLE__")'

let viteConfig: ResolvedConfig

export default function libInjectStyle(options: PluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-lib-inject-style',
    apply: 'build',
    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig
    },
    transform(code, id) {
      const ret = transform(code, id)
      return {
        code: ret.s.toString(),
        map: ret.s.generateMap(),
      }
    },
    async writeBundle(_, bundle) {
      await writeBundle(bundle, options)
    },
  }
}

export function transform(code: string, id: string) {
  const s = new MagicString(code)
  if (styleRegex.test(id)) {
    styles.push(code)
    s.remove(0, code.length - 1)
  }
  if (
    id.includes((viteConfig.build.lib as any).entry)
  )
    s.append(replaceContent)
  return {
    s,
  }
}

export async function writeBundle(bundle: OutputBundle, options: PluginOptions) {
  for (const file of Object.entries(bundle)) {
    const { root } = viteConfig
    const outDir: string = viteConfig.build.outDir || 'dist'
    const fileName: string = file[0]
    const filePath: string = resolve(root, outDir, fileName)

    try {
      let sourceCode: string = await fs.readFile(filePath, {
        encoding: 'utf8',
      })
      const s = new MagicString(sourceCode)
      if (sourceCode.includes(replaceContent))
        sourceCode = s.replace(replaceContent, InejctStyle(styles.join('\n'), options)).toString()

      await fs.writeFile(filePath, sourceCode)
    }
    catch (e) {
      console.error(e)
    }
  }
}

