let WINSCORE = 3
let GOONSCORE = 2
let DRAWSCORE = 1
let LOSESCORE = 0

function isValidMove(symbols, idx) {
  return symbols[idx] == ' '
}

function __checkSymbolWin(symbols, symbol) {
  for (let x = 0; x <= 6; x += 3) {
    if ((symbols[x] == symbols[x+1]) && (symbols[x+1] == symbols[x+2]) && (symbols[x] == symbol)) {
      return true
    }
  }
  for (let x = 0; x < 3; x++) {
    if ((symbols[x] == symbols[x+3]) && (symbols[x+3] == symbols[x+6]) && (symbols[x] == symbol)) {
      return true
    }
  }
  if ((symbols[0] == symbols[4]) && (symbols[4] == symbols[8]) && (symbols[0] == symbol)) {
    return true
  }
  if ((symbols[2] == symbols[4]) && (symbols[4] == symbols[6]) && (symbols[2] == symbol)) {
    return true
  }
  return false
}

function checkState(symbols) {
  let cnt = 0
  for (let i = 0; i < 9; i++) {
    cnt += symbols[i] != ' '
  }

  if (__checkSymbolWin(symbols, 'O')) {
    return OWIN
  } else if (__checkSymbolWin(symbols, 'X')) {
    return XWIN
  } else if (cnt == 9) {
    return DRAW
  } else {
    return GOON
  }
}

function getScore(symbols, symbol) {
  let score
  let state = checkState(symbols)

  if (state == DRAW) {
    score = DRAWSCORE
  } else if (state == GOON) {
    score = GOONSCORE
  } else if (state == OWIN && symbol == 'O') {
    score = WINSCORE
  } else if (state == XWIN && symbol == 'X') {
    score = WINSCORE
  } else {
    score = LOSESCORE
  }

  return score
}

class GameTree {
  constructor(symbols, symbol) {
    this.root = new GameTreeNode(-1)
    this.symbols = symbols
    this.symbol = symbol
  }

  __getSymbolByDepth(depth) {
    let enemySymbol

    if (this.symbol == 'O') {
      enemySymbol = 'X'
    } else {
      enemySymbol = 'O'
    }

    if (depth % 2) {
      return this.symbol
    } else {
      return enemySymbol
    }
  }

  __buildMinimax(node, alpha, beta, minimaxType) {
    if (node.score != undefined) {
      return
    }

    if (minimaxType == 'max') {
      let val = -Infinity
      for (let child of node.children) {
        this.__buildMinimax(child, alpha, beta, 'min')
        val = Math.max(val, child.score)
        alpha = Math.max(alpha, val)
        if (beta <= alpha) {
          break
        }
      }
      node.score = val
    } else {
      let val = Infinity
      for (let child of node.children) {
        this.__buildMinimax(child, alpha, beta, 'max')
        val = Math.min(val, child.score)
        beta = Math.min(beta, val)
        if (beta <= alpha) {
          break
        }
      }
      node.score = val
    }
  }

  __buildHelper(node, symbols, symbol, currDepth, destDepth, alpha, beta) {
    if (node.move != -1) {
      symbols[node.move] = symbol
    }

    let state = checkState(symbols)
    if (currDepth == destDepth || state != GOON) {
      node.score = getScore(symbols, this.symbol)
      return
    }

    for (let i = 0; i < 9; i++) {
      if (!isValidMove(symbols, i)) {
        continue
      }

      let child = new GameTreeNode(i)
      let copiedSymbols = Array.from(symbols)
      let useSymbol = this.__getSymbolByDepth(currDepth+1)
      node.children.push(child)
      this.__buildHelper(child, copiedSymbols, useSymbol, currDepth+1, destDepth, alpha, beta)
    }
  }

  build() {
    this.__buildHelper(this.root, this.symbols, ' ', 0, 6, 0, 0)
    this.__buildMinimax(this.root, -Infinity, Infinity, 'max')

    let bestMove, maxVal = -Infinity
    for (let child of this.root.children) {
      if (child.score > maxVal) {
        maxVal = child.score
        bestMove = child.move
      }
    }
    this.root.move = bestMove
  }

  getBestMove() {
    return this.root.move
  }
}

class GameTreeNode {
  constructor(move, score, children) {
    this.move = move
    this.score = score
    this.children = children || []
  }
}
