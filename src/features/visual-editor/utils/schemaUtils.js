const alignToCss = (value) => {
  if (!value) return undefined
  if (value === 'start') return 'flex-start'
  if (value === 'end') return 'flex-end'
  return value
}

const px = (value) => {
  if (value === undefined || value === null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export const cloneVisualNodes = (nodes = []) =>
  nodes.map((node) => ({
    ...node,
    props: { ...(node.props || {}) },
    children: Array.isArray(node.children) ? [...node.children] : [],
  }))

export const buildNodeMap = (nodes = []) => {
  const map = new Map()
  nodes.forEach((node) => {
    if (node?.id) {
      map.set(node.id, node)
    }
  })
  return map
}

const hydrateNode = (node, map) => {
  if (!node) return null
  const hydratedChildren = (node.children || [])
    .map((childId) => hydrateNode(map.get(childId), map))
    .filter(Boolean)

  return {
    ...node,
    children: hydratedChildren,
  }
}

export const buildNodeTree = (nodes = []) => {
  const map = buildNodeMap(nodes)
  const roots = nodes.filter((node) => !node.parentId)
  return roots.map((root) => hydrateNode(root, map))
}

export const getNodeAncestors = (nodeId, nodesMap) => {
  if (!nodeId || !nodesMap?.size) return []
  const trail = []
  let current = nodesMap.get(nodeId)

  while (current) {
    trail.unshift(current)
    current = current.parentId ? nodesMap.get(current.parentId) : null
  }

  return trail
}

const buildSxEntries = (node) => {
  const sx = []
  const props = node?.props || {}

  if (props.background) sx.push(`backgroundColor: '${props.background}'`)
  if (props.color) sx.push(`color: '${props.color}'`)
  if (props.radius) sx.push(`borderRadius: '${px(props.radius)}'`)
  if (props.padding) sx.push(`padding: '${px(props.padding)}'`)
  if (props.height) sx.push(`minHeight: '${px(props.height)}'`)
  if (props.width) sx.push(`width: '${px(props.width)}'`)
  if (props.maxWidth) sx.push(`maxWidth: '${px(props.maxWidth)}'`)
  if (props.textAlign) sx.push(`textAlign: '${props.textAlign}'`)
  if (props.align) sx.push(`alignItems: '${alignToCss(props.align)}'`)
  if (props.justify) sx.push(`justifyContent: '${alignToCss(props.justify)}'`)

  return sx
}

const sxToString = (entries) => {
  if (!entries.length) return ''
  return `sx={{ ${entries.join(', ')} }}`
}

const asProp = (key, value, { isNumber = false } = {}) => {
  if (value === undefined || value === null || value === '') return ''
  return isNumber ? `${key}={${value}}` : `${key}="${value}"`
}

const typeToComponent = {
  artboard: 'Stack',
  section: 'Stack',
  stack: 'Stack',
  card: 'Paper',
  text: 'Typography',
  button: 'Button',
  image: 'Box',
  metric: 'Stack',
}

const buildChildrenJsx = (node, nodesMap, depth) =>
  (node.children || [])
    .map((childId) => generateJSXForNode(childId, nodesMap, depth + 1))
    .filter(Boolean)
    .join('\n')

export const generateJSXForNode = (nodeId, nodesMap, depth = 0) => {
  if (!nodeId || !nodesMap?.size) return ''
  const node = nodesMap.get(nodeId)
  if (!node) return ''

  const indent = '  '.repeat(depth)
  const nextIndent = '  '.repeat(depth + 1)

  if (node.type === 'text') {
    const variant = node.props?.variant || 'body1'
    const colorProp = node.props?.color ? asProp('color', node.props.color) : ''
    return `${indent}<Typography variant="${variant}"${colorProp ? ` ${colorProp}` : ''}>${node.props?.text || 'Text content'}</Typography>`
  }

  if (node.type === 'button') {
    const variant = node.props?.variant || 'contained'
    const sizeProp = node.props?.size ? asProp('size', node.props.size) : ''
    return `${indent}<Button variant="${variant}"${sizeProp ? ` ${sizeProp}` : ''}>${node.props?.text || 'Action'}</Button>`
  }

  if (node.type === 'image') {
    const sxEntries = ["width: '100%'"]
    if (node.props?.radius) {
      sxEntries.push(`borderRadius: '${px(node.props.radius)}'`)
    }
    const sxString = sxEntries.length ? ` sx={{ ${sxEntries.join(', ')} }}` : ''
    return `${indent}<Box component="img" src="${node.props?.src || 'https://placehold.co/600x400'}" alt="${node.props?.alt || 'Media'}"${sxString} />`
  }

  if (node.type === 'metric') {
    return `${indent}<Stack spacing={0.5}>
${nextIndent}<Typography variant="overline" color="text.secondary">${node.props?.label || 'Metric'}</Typography>
${nextIndent}<Typography variant="h4">${node.props?.value || '000'}${node.props?.suffix || ''}</Typography>
${nextIndent}<Typography variant="caption" color="success.main">${node.props?.trend || '+0%'}</Typography>
${indent}</Stack>`
  }

  const component = typeToComponent[node.type] || 'Stack'
  const props = []

  if (node.props?.direction) props.push(asProp('direction', node.props.direction))
  if (node.props?.gap !== undefined) props.push(asProp('spacing', node.props.gap, { isNumber: true }))
  if (node.props?.align && component === 'Stack') props.push(asProp('alignItems', alignToCss(node.props.align)))
  if (node.props?.justify && component === 'Stack') props.push(asProp('justifyContent', alignToCss(node.props.justify)))

  const sxString = sxToString(buildSxEntries(node))
  if (sxString) props.push(sxString)

  const childContent = buildChildrenJsx(node, nodesMap, depth)

  if (!childContent) {
    return `${indent}<${component}${props.length ? ` ${props.join(' ')}` : ''} />`
  }

  return `${indent}<${component}${props.length ? ` ${props.join(' ')}` : ''}>
${childContent}
${indent}</${component}>`
}
