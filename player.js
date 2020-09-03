class HumanPlayer {
  constructor() {
    this.symbol = ' '
  }

  setSymbol(symbol) {
    this.symbol = symbol
  }

  move(symbols) {
    let idx = -1
    idx = board.getIdxByCoord(playerCoord)
    return idx
  }
}

class ComputerPlayer {
  constructor() {
    this.symbol = ' '
    this.isFirstMove = true
  }

  setSymbol(symbol) {
    this.symbol = symbol
  }

  move(symbols) {
    if (this.isFirstMove) {
      this.isFirstMove = false
     return Math.round(random(0, 9))
   } else {
     let gameTree = new GameTree(symbols)
     gameTree.build()
     return gameTree.getBestMove()
   }
  }
}
