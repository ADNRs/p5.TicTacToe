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
  }

  setSymbol(symbol) {
    this.symbol = symbol
  }

  move(symbols) {
    let cnt = 0
    for (let symbol of symbols) {
      cnt += symbol == ' '
    }

    if (cnt == 9) {
      return Math.round(random(0, 9))
    }
    let gameTree = new GameTree(symbols, this.symbol)
    gameTree.build()
    return gameTree.getBestMove()
  }
}
