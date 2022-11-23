import { expect, test } from 'vitest'
import { Injector } from '../runtime/inject-style'

test('runtime', () => {
  const ret = Injector('.r-ellipsis-container[data-v-8b1742d0] { text-align: left; position: relative; line-height: 1.5;}.r-ellipsis-container .r-ellipsis__shadow[data-v-8b1742d0] { width: 100%; display: flex; pointer-events: none; opacity: 0; user-select: none; position: absolute; outline: green solid 1px;}.r-ellipsis-container .r-ellipsis__shadow textarea[data-v-8b1742d0] { border: none; flex: auto; padding: 0; resize: none; overflow: hidden; font-size: inherit; line-height: inherit; outline: none;}.r-ellipsis-container .r-ellipsis__shadow .r-ellipsis__shadow-box[data-v-8b1742d0] { position: absolute; left: 0; right: 0; top: 0; bottom: 0;}',
    {
      container: 'body',
    })
  expect(ret).toMatchInlineSnapshot(`
    "(function(code, options) {
      const containers = []
      const styleTags = []
      if (!code || typeof document === 'undefined')
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
      if (code.charCodeAt(0) === 0xFEFF)
        code = code.substring(1)

      if (styleTag.styleSheet)
        styleTag.styleSheet.cssText += code

      else
        styleTag.appendChild(document.createTextNode(code))
    })(\`.r-ellipsis-container[data-v-8b1742d0] { text-align: left; position: relative; line-height: 1.5;}.r-ellipsis-container .r-ellipsis__shadow[data-v-8b1742d0] { width: 100%; display: flex; pointer-events: none; opacity: 0; user-select: none; position: absolute; outline: green solid 1px;}.r-ellipsis-container .r-ellipsis__shadow textarea[data-v-8b1742d0] { border: none; flex: auto; padding: 0; resize: none; overflow: hidden; font-size: inherit; line-height: inherit; outline: none;}.r-ellipsis-container .r-ellipsis__shadow .r-ellipsis__shadow-box[data-v-8b1742d0] { position: absolute; left: 0; right: 0; top: 0; bottom: 0;}\`, {\\"container\\":\\"body\\"})
    "
  `)
})
