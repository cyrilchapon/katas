const dimensions = ['row', 'col', 'square'] as const
type Dimension = typeof dimensions[number]

type Box = string[]
type Board = Box[]

type BoxCandidates = string[][]
type BoardCandidates = BoxCandidates[]

type CellIndex = [number, number]

const EMPTY_VAL = '.'

const _solveSudoku = (inputBoard: Board): Board => {
  let previousBoard: Board
  let previousCandidates: BoardCandidates

  let currentBoard = copyBoard(inputBoard)
  let currentCandidates = generateInitialBoardCandidates()

  let somethingChanged: boolean
  let boardOver: boolean

  do {
    previousBoard = copyBoard(currentBoard)
    previousCandidates = copyCandidates(currentCandidates)
    somethingChanged = false
    boardOver = false

    currentCandidates = narrowCandidatesByFilled(EMPTY_VAL)(currentBoard, currentCandidates)
    currentCandidates = narrowResultantCandidatesByFilled(EMPTY_VAL)(currentBoard, currentCandidates)

    const hiddenSingleCandidates: BoardCandidates = findSingleHiddenCandidates(currentCandidates)
    currentCandidates = narrowSingleHiddenCandidates(EMPTY_VAL)(currentBoard, currentCandidates)(hiddenSingleCandidates)

    // Buggy
    // const hiddenCoupleCandidates: Record<Dimension, BoardCandidates> = findHiddenCouplesCandidates(currentCandidates)
    // currentCandidates = narrowHiddenCouplesToNaked(EMPTY_VAL)(currentBoard, currentCandidates)(hiddenCoupleCandidates)

    currentBoard = fillSingleCandidates(EMPTY_VAL)(currentBoard, currentCandidates)

    somethingChanged = (
      boardsDiffer(previousBoard, currentBoard) ||
      candidatesDiffer(previousCandidates, currentCandidates)
    )

    boardOver = isBoardOver(EMPTY_VAL)(currentBoard)

    logFullBoard(currentBoard, currentCandidates)
  } while (somethingChanged || boardOver)

  return currentBoard
}


// Fillers
const fillSingleCandidates = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (
  board.map(
    (box, boxIndex) => box.map(
      (cell, indexInBox) => {
        const cellCandidates = boardCandidates[boxIndex][indexInBox]
        if (cell === emptyVal && cellCandidates.length === 1) {
          return cellCandidates[0]
        }
        return cell
      }
    )
  )
)


// Narrowers
const narrowCandidatesByFilled = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (
  boardCandidates.map(
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        if (board[boxIndex][indexInBox] !== emptyVal) {
          return []
        }

        return cellCandidates
      }
    )
  )
)

const narrowResultantCandidatesByFilled = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (
  boardCandidates.map(
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        const intersections = getIntersections(board)([boxIndex, indexInBox])
        const filledValues = [
          ...new Set(
            Object.values(intersections).flatMap(([box]) => box.filter(cellValue => cellValue !== emptyVal))
          )
        ]
        return cellCandidates.filter(candidate => !filledValues.includes(candidate))
      }
    )
  )
)

const narrowSingleHiddenCandidates = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (boardSingleHiddenCandidates: BoardCandidates) => (
  boardCandidates.map(
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        const cellSingleHiddenCandidates = boardSingleHiddenCandidates[boxIndex][indexInBox]
        if (cellSingleHiddenCandidates.length > 1) {
          throw new Error(`Multiple hidden candidates found in cell ${boxIndex},${indexInBox}`)
        }
        if (cellSingleHiddenCandidates.length === 1) {
          return cellSingleHiddenCandidates
        }
        return cellCandidates
      }
    )
  )
)

const narrowHiddenCouplesToNaked = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (boardHiddenCoupleCandidates: Record<Dimension, BoardCandidates>) => (
  dimensions.reduce<BoardCandidates>((acc, dimension) => {
    const dimensionHiddenCoupleCandidates = boardHiddenCoupleCandidates[dimension]
    return acc.map((boxCandidates, boxIndex) => boxCandidates.map((cellCandidates, indexInBox) => {
      const cellHiddenCoupleCandidates = getCellCandidates(dimensionHiddenCoupleCandidates, dimension)('row', [boxIndex, indexInBox])
      return cellHiddenCoupleCandidates.length > 0
        ? cellCandidates.filter(cellCandidate => cellHiddenCoupleCandidates.includes(cellCandidate))
        : cellCandidates
    }))
  }, boardCandidates)
)


// Finders
const findSingleHiddenCandidates = (boardCandidates: BoardCandidates) => (
  // For each box...
  boardCandidates.map(
    // And each cell
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        // Find intersecting boxes,
        const intersections = getCandidatesIntersections(boardCandidates)([boxIndex, indexInBox])

        // And keep only cell candidates...
        const singleHiddenCellCandidates = cellCandidates.filter(cellCandidate => (
          // That for at least 1 intersecting box,
          Object.entries(intersections).some(([dimension, [intersectingBoxCandidates, [intersectingBoxIndex, indexInIntersectingBox]]]) => (
            // Has every of its cell
            intersectingBoxCandidates.every((intersectingCellCandidates, intersectingCellIndexInBox) => {
              return (
                // Not include the candidate...
                !intersectingCellCandidates.includes(cellCandidate) ||
                // (or is the current cell itself)
                intersectingCellIndexInBox === indexInIntersectingBox
              )
            })
          ))
        ))

        return singleHiddenCellCandidates
      }
    )
  )
)

const findHiddenCouplesCandidates = (boardCandidates: BoardCandidates) => (
  Object.fromEntries(dimensions.map(dimension => [dimension, (new Array(9).fill(null).map((v, boxIndex) => {
    const boxCandidates = getCandidates(boardCandidates)(dimension, boxIndex)

    return boxCandidates.map((cellCandidates, indexInBox) => {
      // const restSetCellsCandidates = [...setCandidates.slice(0, indexInSet), ...setCandidates.slice(indexInSet + 1)]
    
    
      // Get other cells of the BoardSet
      // where a given candidate is allowed
      const getCellsAllowingCandidate = (boxCandidates: BoxCandidates) => (candidate: string) => {
        return boxCandidates.reduce<number []>((acc, cellCandidates, indexInBox) => {
          if (cellCandidates.includes(candidate)) {
            acc.push(indexInBox)
          }
    
          return acc
        }, [])
      }
    
      const hiddenCouplesCandidates = cellCandidates.filter(cellCandidate => {
        // Get other cells of the BoardSet where cellCandidate is allowed
        const cellsAllowingCandidate = getCellsAllowingCandidate(boxCandidates)(cellCandidate)
    
        // Only continue if we have a couple
        if (cellsAllowingCandidate.length !== 2) {
          return false
        }

        const otherCellIndexInBox = cellsAllowingCandidate[0]
    
        const otherCommonCandidatesOnlyAllowedInOtherCell = cellCandidates.filter((commonCellCandidate) => {
          if (cellCandidate === commonCellCandidate) {
            return false
          }
          const cellsAllowingOtherCandidate = getCellsAllowingCandidate(boxCandidates)(commonCellCandidate)

          return (
            cellsAllowingOtherCandidate.length === 2 &&
            cellsAllowingOtherCandidate.includes(otherCellIndexInBox)
          )
        })
    
        return otherCommonCandidatesOnlyAllowedInOtherCell.length === 1
      })
    
      return hiddenCouplesCandidates.length === 2
        ? hiddenCouplesCandidates
        : []
    })
  }))])) as Record<Dimension, BoardCandidates>
)


// Dimensions utils
const getCellValue = (
  srcBoard: Board,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension,
  dstCellIndex: CellIndex
): string => {
  const [
    srcBoxIndex,
    srcIndexInBox
  ] = transformIndex(dstCellIndex, dstDimension)(srcDimension)

  return srcBoard[srcBoxIndex][srcIndexInBox]
}

const getBox = (
  srcBoard: Board,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension,
  dstBoxIndex: number
): Box => {
  const initialBox = (new Array(9)).fill(null)
  const box = initialBox.map((v, dstIndexInBox) => {
    const dstCellIndex: CellIndex = [dstBoxIndex, dstIndexInBox]
    const cellValue = getCellValue(srcBoard, srcDimension)(dstDimension, dstCellIndex)
    return cellValue
  })
  return box
}

const getCellCandidates = (
  srcCandidates: BoardCandidates,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension,
  dstCellIndex: CellIndex
): string[] => {
  const [
    srcBoxIndex,
    srcIndexInBox
  ] = transformIndex(dstCellIndex, dstDimension)(srcDimension)

  return srcCandidates[srcBoxIndex][srcIndexInBox]
}

const getCandidates = (
  srcCandidates: BoardCandidates,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension,
  dstBoxIndex: number
): BoxCandidates => {
  const initialCandidates = (new Array(9)).fill(null)
  const box = initialCandidates.map((c, dstIndexInBox) => {
    const dstCellIndex: CellIndex = [dstBoxIndex, dstIndexInBox]
    const cellValue = getCellCandidates(srcCandidates, srcDimension)(dstDimension, dstCellIndex)
    return cellValue
  })
  return box
}

// Board index utils
const transformIndex = (
  cellIndex: CellIndex, 
  inputDimension: Dimension = 'row'
) => (
  outputDimension: Dimension
): CellIndex => {
  const absoluteIndex = getAbsoluteIndex(inputDimension)(cellIndex)
  const outputRelativeIndex = getRelativeIndex(outputDimension)(absoluteIndex)
  return outputRelativeIndex
}

const getAbsoluteIndex = (dimension: Dimension) => ([boxIndex, indexInBox]: CellIndex): CellIndex => {
  switch (dimension) {
    case 'row':
      return [boxIndex, indexInBox]
    case 'col':
      return [indexInBox, boxIndex]
    case 'square':
      const [squareRowIndex, squareColIndex] = deflattenIndex(boxIndex)
      const [cellRowSquareIndex, cellColSquareIndex] = deflattenIndex(indexInBox)

      return [
        (squareRowIndex * 3) + cellRowSquareIndex,
        (squareColIndex * 3) + cellColSquareIndex
      ]
  }
}

const getRelativeIndex = (dimension: Dimension) => ([rowIndex, colIndex]: CellIndex): CellIndex => {
  switch (dimension) {
    case 'row':
      return [rowIndex, colIndex]
    case 'col':
      return [colIndex, rowIndex]
    case 'square':
      return getFlatCellSquareIndex([rowIndex, colIndex])
  }
}

const getCellSquareIndex = ([boxIndex, indexInBox]: CellIndex): CellIndex => {
  const [squareRowIndex, squareColIndex] = deflattenIndex(boxIndex)
  const [cellRowSquareIndex, cellColSquareIndex] = deflattenIndex(indexInBox)

  return [
    (squareRowIndex * 3) + cellRowSquareIndex,
    (squareColIndex * 3) + cellColSquareIndex
  ]
}

const getFlatCellSquareIndex = (cellIndex: CellIndex): CellIndex => {
  const squareIndex = getSquareIndex(cellIndex)
  const flatSquareIndex = flattenIndex(squareIndex)
  const cellSquareIndex = getCellIndexInSquare(cellIndex, squareIndex)
  const flatCellSquareIndex = flattenIndex(cellSquareIndex)

  return [
    flatSquareIndex,
    flatCellSquareIndex
  ]
}

const getSquareIndex = ([rowIndex, colIndex]: CellIndex): CellIndex => {
  const squareIndex: CellIndex = [
    Math.floor(rowIndex / 3),
    Math.floor(colIndex / 3)
  ]
  return squareIndex
}

const getCellIndexInSquare = ([rowIndex, colIndex]: CellIndex, squareIndex: CellIndex): CellIndex => {
  const [
    squareRowIndex,
    squareColIndex
  ] = squareIndex

  const cellSquareIndex: CellIndex = [
    rowIndex - (squareRowIndex * 3),
    colIndex - (squareColIndex * 3)
  ]

  return cellSquareIndex
}

const flattenIndex = ([rowIndex, colIndex]: CellIndex): number => {
  const flatIndex = colIndex + (3 * rowIndex)
  return flatIndex
}

const deflattenIndex = (flatIndex: number): CellIndex => {
  const flatRowIndex = Math.floor(flatIndex / 3)
  const flatColIndex = flatIndex - (3 * flatRowIndex)
  return [flatRowIndex, flatColIndex]
}

const getIntersectingBoxIndexes = (
  srcCellIndex: CellIndex,
  srcDimension: Dimension = 'row'
) => (
  dimensions.reduce<Record<Dimension, CellIndex>>((acc, dimension) => {
    const intersectingIndex = transformIndex(srcCellIndex, srcDimension)(dimension)

    return {
      ...acc,
      [dimension]: intersectingIndex
    }
  }, {} as Record<Dimension, CellIndex>)
)

const getIntersections = (
  board: Board,
  srcDimension: Dimension = 'row'
) => (
  srcCellIndex: CellIndex
) => (
  Object.fromEntries(
    Object.entries(getIntersectingBoxIndexes(srcCellIndex, srcDimension)).map(([dimension, [dstBoxIndex, dstIndexInBox]]) => (
      [
        dimension as Dimension,
        [
          getBox(board, srcDimension)(dimension as Dimension, dstBoxIndex),
          [dstBoxIndex, dstIndexInBox]
        ]
      ]
    ))
  ) as Record<Dimension, [Box, CellIndex]>
)

const getCandidatesIntersections = (
  candidates: BoardCandidates,
  srcDimension: Dimension = 'row'
) => (
  srcCellIndex: CellIndex
) => (
  Object.fromEntries(
    Object.entries(getIntersectingBoxIndexes(srcCellIndex, srcDimension)).map(([dimension, [dstBoxIndex, dstIndexInBox]]) => (
      [
        dimension as Dimension,
        [
          getCandidates(candidates, srcDimension)(dimension as Dimension, dstBoxIndex),
          [dstBoxIndex, dstIndexInBox]
        ]
      ]
    ))
  ) as Record<Dimension, [BoxCandidates, CellIndex]>
)

// Check utils
const isBoardOver = (emptyVal: string) => (board: Board): boolean => (
  board.every(isBoxOver(emptyVal))
)

const isBoxOver = (emptyVal: string) => (box: Box): boolean => {
  const unEmptyCells = box.filter(isCellFilled(emptyVal))
  return unEmptyCells.length === box.length
}

const isBoardValid = (emptyVal: string) => (board: Board): boolean => (
  board.every(isBoxValid(emptyVal))
)

const isBoxValid = (emptyVal: string) => (box: Box): boolean => {
  const unEmptyCells = box.filter(isCellFilled(emptyVal))
  return unEmptyCells.length === [...new Set(unEmptyCells)].length
}

const isCellFilled = (emptyVal: string) => (cellValue: string): boolean => (
  cellValue !== emptyVal
)


// Manipulation utils
const copyBoard = (srcBoard: Board): Board => (
  srcBoard.map(copyBox)
)

const copyBox = (srcBox: Box): Box => ([...srcBox])

const copyCandidates = (srcBoardCandidates: BoardCandidates): BoardCandidates => (
  srcBoardCandidates.map(copyBoxCandidates)
)

const copyBoxCandidates = (srcBoxCandidates: BoxCandidates): BoxCandidates => (
  srcBoxCandidates.map(copyCellCandidates)
)

const copyCellCandidates = (srcCellCandidates: string[]): string[] => ([...srcCellCandidates])

const generateInitialBoardCandidates = (): BoardCandidates => (
  (new Array(9).fill(null).map(generateInitialBoxCandidates))
)

const generateInitialBoxCandidates = (): BoxCandidates => (
  (new Array(9).fill(null).map(generateInitialCellCandidates))
)

const generateInitialCellCandidates = (): string[] => (
  (new Array(9).fill(null).map((v, cellIndex) => `${cellIndex + 1}`))
)

const boardsDiffer = (boardA: Board, boardB: Board) => (
  boardA.some((box, boxIndex) => box.some((cellVal, indexInBox) => boardB[boxIndex][indexInBox] !== cellVal))
)

const candidatesDiffer = (candidatesA: BoardCandidates, candidatesB: BoardCandidates) => (
  candidatesA.some((boxCandidates, boxIndex) => boxCandidates.some((cellACandidates, indexInBox) => {
    const cellBCandidates = candidatesB[boxIndex][indexInBox]
    return (
      cellACandidates.some(cellACandidate => !cellBCandidates.includes(cellACandidate)) ||
      cellBCandidates.some(cellBCandidate => !cellACandidates.includes(cellBCandidate))
    )
  }))
)


// Log utils
const logBoard = (board: Board) => {
  console.log(`=> Board`)
  board.forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      console.log(' ----------------------------------- ')
    }
    const rowString = `| ${[
      row.slice(0, 3).join('   '),
      row.slice(3, 6).join('   '),
      row.slice(6).join('   '),
    ].join(' | ')} |`
    console.log(rowString)
    if (rowIndex === 8) {
      console.log(' ----------------------------------- ')
    } else if (((rowIndex + 1) % 3) === 0) {
      console.log('| --------- | --------- | --------- |')
    }
  })
  const flatCells = board.flat()
  const filledCells = flatCells.filter(v => v !== '.')
  console.log(`(${flatCells.length - filledCells.length} remaining)`)
}

const logCandidates = (candidates: BoardCandidates) => {
  console.log(`=> Candidates`)
  candidates.forEach((rowCandidates, rowIndex) => {
    if (rowIndex === 0) {
      console.log(' ----------------------------------- ')
    }
    const rowString = `| ${[
      rowCandidates.slice(0, 3).map(cellCandidates => cellCandidates.length).map(l => l > 0 ? l : '✓').join('   '),
      rowCandidates.slice(3, 6).map(cellCandidates => cellCandidates.length).map(l => l > 0 ? l : '✓').join('   '),
      rowCandidates.slice(6).map(cellCandidates => cellCandidates.length).map(l => l > 0 ? l : '✓').join('   '),
    ].join(' | ')} |`
    console.log(rowString)
    if (rowIndex === 8) {
      console.log(' ----------------------------------- ')
    } else if (((rowIndex + 1) % 3) === 0) {
      console.log('| --------- | --------- | --------- |')
    }
  })
  const flatCandidates = candidates.map(rowCandidates => rowCandidates.flat()).flat()
  const flatCandidatesCells = candidates.map(rowCandidates => rowCandidates.filter(cellCandidates => cellCandidates.length > 0)).flat()
  console.log(`(${flatCandidates.length} candidates in ${flatCandidatesCells.length} cells)`)
}

const logFullCandidates = (candidates: BoardCandidates) => {
  candidates.forEach((rowCandidates, rowIndex) => {
    if (rowIndex === 0) {
      console.log(' ----------------------------------------------------------------------- ')
    }
    [0, 3, 6].forEach(
      subRowIndex => {
        const candidatesToFind = [1, 2, 3].map(c => `${subRowIndex + c}`)

        const subRowString = `| ${[
          rowCandidates.slice(0, 3).map(cellCandidates => candidatesToFind.map(c => cellCandidates.includes(c) ? c : '.').join(' ')).join('   '),
          rowCandidates.slice(3, 6).map(cellCandidates => candidatesToFind.map(c => cellCandidates.includes(c) ? c : '.').join(' ')).join('   '),
          rowCandidates.slice(6).map(cellCandidates => candidatesToFind.map(c => cellCandidates.includes(c) ? c : '.').join(' ')).join('   ')
        ].join(' | ')} |`
        console.log(subRowString)
      }
    )

    if (rowIndex === 8) {
      console.log(' ----------------------------------------------------------------------- ')
    } else if (((rowIndex + 1) % 3) === 0) {
      console.log('| --------------------- | --------------------- | --------------------- |')
    } else {
      console.log('|                       |                       |                       |')
    }
  })
  const flatCandidates = candidates.map(rowCandidates => rowCandidates.flat()).flat()
  const flatCandidatesCells = candidates.map(rowCandidates => rowCandidates.filter(cellCandidates => cellCandidates.length > 0)).flat()
  console.log(`(${flatCandidates.length} candidates in ${flatCandidatesCells.length} cells)`)
}

const logFullBoard = (board: Board, candidates: BoardCandidates) => {
  candidates.forEach((rowCandidates, rowIndex) => {
    if (rowIndex === 0) {
      console.log(' ----------------------------------------------------------------------- ')
    }

    const logSubRowCell = (board: Board) => (
      candidatesToFind: string[],
      subRowIndex: number,
      subColIndex: number
    ) => (
      cellCandidates: string[],
      cellRelativeIndex: number
    ) => {
      const cellAbsoluteIndexInRow = cellRelativeIndex + subColIndex
      const n = board[rowIndex][cellAbsoluteIndexInRow]

      return n !== '.'
        ? NUMBERS_LOG[n as keyof typeof NUMBERS_LOG][subRowIndex].join('')
        : candidatesToFind.map(c => cellCandidates.includes(c) ? c : ' ').join(' ')
    }

    [0, 3, 6].forEach(
      (subRowNumber, subRowIndex) => {
        const candidatesToFind = [1, 2, 3].map(c => `${subRowNumber + c}`)

        const subRowString = `| ${[
          // rowCandidates.slice(0, 3).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 0)).join(' \' '),
          rowCandidates.slice(0, 3).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 0)).join('   '),
          // rowCandidates.slice(3, 6).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 3)).join(' \' '),
          rowCandidates.slice(3, 6).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 3)).join('   '),
          // rowCandidates.slice(6).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 6)).join(' \' ')
          rowCandidates.slice(6).map(logSubRowCell(board)(candidatesToFind, subRowIndex, 6)).join('   ')
        ].join(' | ')} |`
        console.log(subRowString)
      }
    )

    if (rowIndex === 8) {
      console.log(' ----------------------------------------------------------------------- ')
    } else if (((rowIndex + 1) % 3) === 0) {
      console.log('| --------------------- | --------------------- | --------------------- |')
    } else {
      // console.log('| - - - - - - - - - - - | - - - - - - - - - - - | - - - - - - - - - - - |')
      console.log('|                       |                       |                       |')
    }
  })
  const flatCandidates = candidates.map(rowCandidates => rowCandidates.flat()).flat()
  const flatCandidatesCells = candidates.map(rowCandidates => rowCandidates.filter(cellCandidates => cellCandidates.length > 0)).flat()
  console.log(`(${flatCandidates.length} candidates in ${flatCandidatesCells.length} cells)`)
}

const NUMBERS_LOG = {
  '1': [
    [' ', ' ', ' ', '.', ' '],
    [' ', '/', ' ', '|', ' '],
    [' ', ' ', ' ', '|', ' ']
  ],
  '2': [
    [' ', ' ', '_', '_', ' '],
    [' ', ' ', '_', '_', '|'],
    [' ', '|', '_', '_', ' ']
  ],
  '3': [
    [' ', '_', '_', ' ', ' '],
    [' ', ' ', '_', '|', ' '],
    [' ', '_', '_', '|', ' ']
  ],
  '4': [
    [' ', ' ', ' ', '.', ' '],
    [' ', '/', '_', '|', ' '],
    [' ', ' ', ' ', '|', ' ']
  ],
  '5': [
    [' ', ' ', '_', '_', ' '],
    [' ', '|', '_', '_', ' '],
    [' ', ' ', '_', '_', '|']
  ],
  '6': [
    [' ', ' ', '_', '_', ' '],
    [' ', '|', '_', '_', ' '],
    [' ', '|', '_', '_', '|']
  ],
  '7': [
    [' ', '_', '_', '_', ' '],
    [' ', ' ', ' ', '/', ' '],
    [' ', ' ', '/', ' ', ' ']
  ],
  '8': [
    [' ', ' ', '_', '_', ' '],
    [' ', '|', '_', '_', '|'],
    [' ', '|', '_', '_', '|']
  ],
  '9': [
    [' ', ' ', '_', '_', ' '],
    [' ', '|', '_', '_', '|'],
    [' ', ' ', '_', '_', '|']
  ]
}

export {
  Box,
  BoxCandidates,
  Dimension,
  CellIndex,
  Board,
  BoardCandidates
}

export {
  _solveSudoku,
  getCellValue,
  getBox,
  findSingleHiddenCandidates
}
