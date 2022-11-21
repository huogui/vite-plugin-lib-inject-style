import { promises as fs } from 'fs'
import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import MagicString from 'magic-string'
import type { PluginOptions } from '../types/index'
import { InjectStyle } from './runtime/inject-style'

const styleRegex = /\.(css)$/

const styles: string[] = []

const replaceContent = 'console.warn("__INJECT_STYLE__")'

let viteConfig: ResolvedConfig

export function libInjectStyle(options: PluginOptions = {}): Plugin {
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
            sourceCode = s.replace(replaceContent, InjectStyle(styles.join('\n'), options)).toString()

          await fs.writeFile(filePath, sourceCode)
        }
        catch (e) {
          console.error(e)
        }
      }
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
