import * as Hangul from 'hangul-js'

import { width, height, size } from './consts'
import { getPerlinChar, getPerlinHSL } from './perlin'

const nodes: Array<Array<HTMLElement>> = []

function getXYFromDOMData(node: HTMLElement) {
  return {
    x: parseInt(node.dataset.x, 10),
    y: parseInt(node.dataset.y, 10),
  }
}

function initNode(node: HTMLElement) {
  const { x, y } = getXYFromDOMData(node)
  Object.assign(node.style, {
    float: 'left',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: getPerlinHSL(x, y),
    textAlign: 'center',
  })
  node.textContent = getPerlinChar(x, y)
  return node
}

window.addEventListener('load', () => {
  const ground = document.createElement('div')
  document.body.appendChild(ground)

  for (let x = 0; x < width / size; x++) {
    const row: Array<HTMLElement> = []
    nodes.push(row)

    for (let y = 0; y < height / size; y++) {
      const node = document.createElement('div')
      Object.assign(node.dataset, {
        x: String(x),
        y: String(y),
      })
      initNode(node)
      row.push(node)
    }

    const rowElem = document.createElement('div')
    rowElem.style.clear = 'both'
    row.forEach(node => rowElem.appendChild(node))
    ground.appendChild(rowElem)
  }

  let hovered: HTMLElement | null = null
  let changed: Array<HTMLElement> = []
  ground.addEventListener('mousemove', (event) => {
    if (hovered === event.target || ground === event.target) { return }
    hovered = event.target as HTMLElement

    changed.forEach(node => {
      initNode(node)
    })

    const { x, y } = getXYFromDOMData(hovered)
    hovered.style.backgroundColor = getPerlinHSL(x, y, undefined, 85)
    hovered.textContent = Hangul.disassemble(hovered.textContent)[0]
    changed.push(hovered)

    ;[[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
      const node = nodes[x + dx]?.[y + dy]
      if (!node) { return }
      node.style.backgroundColor = getPerlinHSL(x, y, undefined, 70)
      node.textContent = Hangul.assemble(Hangul.disassemble(node.textContent).slice(0, 2))
      changed.push(node)
    })
  })
})
