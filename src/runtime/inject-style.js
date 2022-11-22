/**
 * @param {string} css
 * @param {object} options
 * @param {boolean} [options.prepend]
 * @param {boolean} [options.singleTag]
 * @param {string} [options.container]
 * @param {Record<string,string>} [options.attributes]
 * @returns {void}
 */
export const Injector = (code, options) => `(function(code, options) {
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
})(\`${code}\`, ${JSON.stringify(options)})
`

