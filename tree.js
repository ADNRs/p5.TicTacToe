let WINSCORE = 10
let GOONSCORE = 3
let DRAWSCORE = 0
let LOSESCORE = -10

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
    score += DRAWSCORE
  } else if (state == GOON) {
    score += GOONSCORE
  } else if (state == OWIN && symbol == 'O') {
    score += WINSCORE
  } else if (state == XWIN && symbol == 'X') {
    score += WINSCORE
  } else {
    score += LOSESCORE
  }

  return score
}

function getMinimaxType(depth) {
  if (depth % 2) {
    return 'max'
  } else {
    return 'min'
  }
}

class GameTree {
  constructor(symbols, symbol) {
    this.root = new GameTreeNode()
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
      return { score: node.score, move: node.move }
    }

    if (minimaxType == 'max') {
      let val = { score: -Infinity, move: undefined }
      for (let child of node.children) {
        let rtVal = this.__buildMinimax(child, alpha, beta, 'min')
        if (val.score != Math.max(val.score, rtVal.socre)) {
          val = rtVal
        }
        alpha = Math.max(alpha, val.score)
        if (beta <= alpha) {
          break
        }
      }
      return val
    } else {
      let val = { score: Infinity, move: undefined }
      for (let child of node.children) {
        let rtVal = this.__buildMinimax(child, alpha, beta, 'max')
        if (val.score != Math.min(val.score, rtVal.score)) {
          val = rtVal
        }
        beta = Math.min(beta, val.score)
        if (beta <= alpha) {
          break
        }
      }
      return val
    }
  }

  __buildHelper(node, symbols, symbol, currDepth, destDepth, alpha, beta) {
    if (node.move != -1) {
      symbols[node.move] = symbol
    }

    // boundary condition
    let state = checkState(symbols)
    if (currDepth == destDepth || state != GOON) {
      node.score = getScore(symbols, this.symbol)
      return
    }

    // grow children
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

    // do minimax with alpha beta prune

  }

  build() {
    this.__buildHelper(this.root, this.symbols, ' ', 0, 3, 0, 0)
    console.log('Finish building')
    let rtVal = this.__buildMinimax(this.root, -Infinity, Infinity, 'max')
    this.root.move = rtVal.move
  }

  getBestMove() {
    return this.root.move
  }
}

class GameTreeNode {
  constructor(move, score, children) {
    this.move = move || -1
    this.score = score
    this.children = children || []
  }
}
