const { Noise } = require('noisejs')

const width = 500
const height = 500
const size = 20
const noise = new Noise(Math.random())
const s = 50
const l = 50

function getRandomValue(x: number, y: number, limit: number): number {
  return Math.floor(noise.perlin2(x / width, y / height) * limit)
}

for (let x = 0; x < width; x += size) {
  const row = document.createElement('div')
  row.style.clear = 'both'
  for (let y = 0; y < height; y += size) {
    const node = document.createElement('div')
    node.style.float = 'left'
    node.style.width = `${size}px`
    node.style.height = `${size}px`
    node.style.backgroundColor = `hsl(${getRandomValue(x, y, 360)}deg ${s}% ${l}%)`
    node.style.textAlign = 'center'
    node.textContent = String.fromCharCode('가'.charCodeAt(0) + Math.abs(getRandomValue(x, y, 11172)))
    row.appendChild(node)
  }
  document.body.appendChild(row)
}
