let width
let height

function setup() {
  width = windowWidth
  height = windowHeight
  createCanvas(width, height)
  board = new Board(width, height)
}

function draw() {
  background(125)
  board.draw()
}
