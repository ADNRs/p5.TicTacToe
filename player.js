class HumanPlayer {
  constructor() {
    this.symbol = ' '
  }

  setSymbol(symbol) {
    this.symbol = symbol
  }

  move(symbols) {

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
    for (let x = 0; x < 9; x++) {
      if (symbols[x] == ' ') {
        return x
      }
    }
  }
}
