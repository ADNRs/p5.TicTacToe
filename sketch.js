let width
let height
let board
let player1
let player2

function setup() {
  width = windowWidth
  height = windowHeight
  createCanvas(width, height)
  board = new Board(width, height)
  button = createButton('Restart')
  button.position(width*0.9, height*0.8)
  button.mousePressed(restart)

  player1 = new ComputerPlayer()
  player2 = new ComputerPlayer()
}

function draw() {
  player1.setSymbol('O')
  player2.setSymbol('X')

  while (board.status == GOON) {
    while (true) {
      let loc = player1.move(board.symbols)
      if (board.isValidMove(loc)) {
        board.symbols[loc] = player1.symbol
        break
      }
    }
    board.draw()
    board.checkStatus()
    if (board.status != GOON) {
      board.draw()
      break
    }

    while (true) {
      let loc = player2.move(board.symbols)
      if (board.isValidMove(loc)) {
        board.symbols[loc] = player2.symbol
        break
      }
    }
    board.draw()
    board.checkStatus()
    if (board.status != GOON) {
      break
    }
  }
}

function restart() {
  board.reset()
  print('Yes')
}
