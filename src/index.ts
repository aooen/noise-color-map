const { Noise } = require('noisejs')
import * as Hangul from 'hangul-js'

const width = 500
const height = 500
const size = 20
const noise = new Noise(Math.random())
const s = 50
const l = 50

function getRandomValue(x: number, y: number, limit: number): number {
  return Math.floor(noise.perlin2(x / (width / size), y / (height / size)) * limit)
}

const nodes: Array<Array<HTMLDivElement>> = []

const ground = document.createElement('div')
document.body.appendChild(ground)

for (let x = 0; x < width / size; x++) {
  const row: Array<HTMLDivElement> = []
  nodes.push(row)

  for (let y = 0; y < height / size; y++) {
    const node = document.createElement('div')
    Object.assign(node.style, {
      float: 'left',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `hsl(${getRandomValue(x, y, 360)}deg ${s}% ${l}%)`,
      textAlign: 'center',
    })
    Object.assign(node.dataset, {
      x: String(x),
      y: String(y),
    })
    node.textContent = String.fromCharCode('가'.charCodeAt(0) + Math.abs(getRandomValue(x, y, 11172)))
    row.push(node)
  }

  const rowElem = document.createElement('div')
  rowElem.style.clear = 'both'
  row.forEach(node => rowElem.appendChild(node))
  ground.appendChild(rowElem)
}

let hovered: HTMLDivElement | null = null
let changed: Array<HTMLDivElement> = []
ground.addEventListener('mousemove', (event) => {
  if (hovered === event.target || ground === event.target) { return }
  hovered = event.target as HTMLDivElement

  changed.forEach(node => {
    const [x, y] = [node.dataset.x, node.dataset.y].map(str => parseInt(str, 10))
    node.style.backgroundColor = `hsl(${getRandomValue(x, y, 360)}deg ${s}% 50%)`
    node.textContent = String.fromCharCode('가'.charCodeAt(0) + Math.abs(getRandomValue(x, y, 11172)))
  })

  const [x, y] = [hovered.dataset.x, hovered.dataset.y].map(str => parseInt(str, 10))
  hovered.style.backgroundColor = `hsl(${getRandomValue(x, y, 360)}deg ${s}% 70%)`
  hovered.textContent = Hangul.disassemble(hovered.textContent)[0]
  changed.push(hovered)

  ;[[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
    const node = nodes[x + dx][y + dy]
    if (!node) { return }
    node.style.backgroundColor = `hsl(${getRandomValue(x + dx, y + dy, 360)}deg ${s}% 60%)`
    node.textContent = Hangul.assemble(Hangul.disassemble(node.textContent).slice(0, 2))
    changed.push(node)
  })
})
