class HumanPlayer {
  constructor(symbol) {
    this.symbol = symbol
  }

  move(symbols) {
    let idx = -1
    idx = board.getIdxByCoord(playerCoord)
    return idx
  }
}

class RandomPlayer {
  constructor(symbol) {
    this.symbol = symbol
  }

  move(symbols) {
    let nonOccupiedIdx = new Array()
    for (let i = 0; i < 9; i++) {
      if (symbols[i] == ' ') {
        nonOccupiedIdx.push(i)
      }
    }

    return random(nonOccupiedIdx)
  }
}

class ComputerPlayer {
  constructor(symbol) {
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
