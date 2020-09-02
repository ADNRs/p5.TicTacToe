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
    return Math.round(random(0, 9))
    for (let x = 0; x < 9; x++) {
      if (symbols[x] == ' ') {
        return x
      }
    }
  }
}
