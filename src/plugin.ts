import { promises as fs } from 'fs'
import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { normalizePath } from 'vite'
import MagicString from 'magic-string'
import type { PluginOptions } from '../types/index'
import { Injector } from './runtime/inject-style'

const styleRegex = /\.(css|scss|less)$/

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
    async transform(code, id) {
      if (styleRegex.test(id)) {
        const ret = code.replace(/\n/g, '').replace(/\s\s+/g, ' ')
        styles.push(ret)
        return {
          code: '',
        }
      }
      if (
        // @ts-expect-error-err
        normalizePath(id) === normalizePath(viteConfig.build.lib.entry)
      ) {
        const s = new MagicString(code)
        code = s.append(replaceContent).toString()
        return {
          code,
          map: s.generateMap(),
        }
      }
      return null
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
            sourceCode = s.replace(replaceContent, buildOutput(styles, options)).toString()
          await fs.writeFile(filePath, sourceCode)
        }
        catch (e) {
          console.error(e)
        }
      }
    },
  }
}

export function buildOutput(styles: string[], options: PluginOptions) {
  const out: string[] = []
  styles.forEach((value) => {
    out.push(Injector(value, options))
  })
  return `${out}`
}
