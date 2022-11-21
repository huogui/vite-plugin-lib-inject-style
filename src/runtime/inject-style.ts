import type { PluginOptions } from '../../types/index'

export const InjectStyle = (code: string, options: PluginOptions) =>
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
