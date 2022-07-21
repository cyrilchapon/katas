import { AssertionError } from "assert"

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
    // logFullBoard(currentBoard, currentCandidates)
    previousBoard = copyBoard(currentBoard)
    previousCandidates = copyCandidates(currentCandidates)
    somethingChanged = false
    boardOver = false

    currentCandidates = narrowCandidatesByFilled(EMPTY_VAL)(currentBoard, currentCandidates)
    currentCandidates = narrowResultantCandidatesByFilled(EMPTY_VAL)(currentBoard, currentCandidates)

    const hiddenSinglesCandidates: BoardCandidates = findHiddenSinglesCandidates(currentCandidates)
    currentCandidates = narrowHiddenSinglesCandidates(currentCandidates)(hiddenSinglesCandidates)

    const pairsCandidates: Record<Dimension, BoardCandidates> = findTuplesCandidates(2)(currentCandidates)
    currentCandidates = narrowHiddenTuplesToNaked(currentCandidates)(pairsCandidates)
    currentCandidates = narrowNakedTuplesResultant(currentCandidates)(pairsCandidates)

    // const tripletsCandidates: Record<Dimension, BoardCandidates> = findTuplesCandidates(3)(currentCandidates)
    // currentCandidates = narrowHiddenTuplesToNaked(currentCandidates)(tripletsCandidates)
    // currentCandidates = narrowNakedTuplesResultant(currentCandidates)(tripletsCandidates)

    // const quadsCandidates: Record<Dimension, BoardCandidates> = findTuplesCandidates(4)(currentCandidates)
    // currentCandidates = narrowHiddenTuplesToNaked(currentCandidates)(quadsCandidates)
    // currentCandidates = narrowNakedTuplesResultant(currentCandidates)(quadsCandidates)

    currentBoard = fillNakedSinglesCandidates(EMPTY_VAL)(currentBoard, currentCandidates)

    somethingChanged = (
      boardsDiffer(previousBoard, currentBoard) ||
      candidatesDiffer(previousCandidates, currentCandidates)
    )

    boardOver = isBoardOver(EMPTY_VAL)(currentBoard)

    if (!isBoardValid(EMPTY_VAL)(currentBoard)) {
      throw new AssertionError({ message: 'Invalid board' })
    }
  } while (somethingChanged || boardOver)

  logFullBoard(currentBoard, currentCandidates)

  return currentBoard
}


// Fillers
const fillNakedSinglesCandidates = (emptyVal: string) => (board: Board, boardCandidates: BoardCandidates) => (
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
        // Find intersecting boxes
        const intersections = getIntersections(board)([boxIndex, indexInBox])

        // Build a set where...
        const filledValues = [
          ...new Set(
            // ... we accumulate, for each intersecting boxes...
            Object.values(intersections).flatMap(
              ([box, [intersectingBoxIndex, indexInIntersectingBox]]) => (
                // each intersecting cell values where...
                box.filter((cellValue, cellIndexInBox) => (
                  // cell is not self
                  cellIndexInBox != indexInIntersectingBox &&
                  // and value is filled
                  cellValue !== emptyVal)
                )
              )
            )
          )
        ]

        return cellCandidates.filter(candidate => !filledValues.includes(candidate))
      }
    )
  )
)

const narrowHiddenSinglesCandidates = (boardCandidates: BoardCandidates) => (boardHiddenSinglesCandidates: BoardCandidates) => (
  boardCandidates.map(
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        const cellHiddenSinglesCandidates = boardHiddenSinglesCandidates[boxIndex][indexInBox]
        if (cellHiddenSinglesCandidates.length > 1) {
          throw new Error(`Multiple hidden candidates found in cell ${boxIndex},${indexInBox}`)
        }
        if (cellHiddenSinglesCandidates.length === 1) {
          return cellHiddenSinglesCandidates
        }
        return cellCandidates
      }
    )
  )
)

const narrowHiddenTuplesToNaked = (boardCandidates: BoardCandidates) => (boardHiddenPairsCandidates: Record<Dimension, BoardCandidates>) => (
  dimensions.reduce<BoardCandidates>((acc, dimension) => {
    const dimensionHiddenPairsCandidates = boardHiddenPairsCandidates[dimension]
    return acc.map((boxCandidates, boxIndex) => boxCandidates.map((cellCandidates, indexInBox) => {
      const cellHiddenPairsCandidates = getCellCandidates(dimensionHiddenPairsCandidates, dimension)('row', [boxIndex, indexInBox])

      return cellHiddenPairsCandidates.length > 0
        ? cellCandidates.filter(cellCandidate => cellHiddenPairsCandidates.includes(cellCandidate))
        : cellCandidates
    }))
  }, boardCandidates)
)

const narrowNakedTuplesResultant = (boardCandidates: BoardCandidates) => (tuplesCandidates: Record<Dimension, BoardCandidates>) => (
  dimensions.reduce<BoardCandidates>((acc, dimension) => {
    const dimensionTuplesCandidates = tuplesCandidates[dimension]
    return acc.map((boxCandidates, boxIndex) => {
      return boxCandidates.map((cellCandidates, indexInBox) => {
        const [dimensionBoxIndex] = transformIndex([boxIndex, indexInBox])(dimension)
        const boxTuplesCandidates = dimensionTuplesCandidates[dimensionBoxIndex]
        const boxFlatTuplesCandidates = [...new Set(boxTuplesCandidates.flat())]

        const cellTuplesCandidates = getCellCandidates(dimensionTuplesCandidates, dimension)('row', [boxIndex, indexInBox])

        const cellDisallowedTuplesCandidates = boxFlatTuplesCandidates.filter(
          // Every other tuple candidate in box
          boxTupleCandidate => !cellTuplesCandidates.includes(boxTupleCandidate)
        )
  
        return cellDisallowedTuplesCandidates.length > 0
          ? cellCandidates.filter(cellCandidate => !cellDisallowedTuplesCandidates.includes(cellCandidate))
          : cellCandidates
      })
    })
  }, boardCandidates)
)


// Finders
const findHiddenSinglesCandidates = (boardCandidates: BoardCandidates) => (
  // For each box...
  boardCandidates.map(
    // And each cell
    (boxCandidates, boxIndex) => boxCandidates.map(
      (cellCandidates, indexInBox) => {
        // Find intersecting boxes,
        const intersections = getCandidatesIntersections(boardCandidates)([boxIndex, indexInBox])

        // And keep only cell candidates...
        const hiddenSinglesCellCandidates = cellCandidates.filter(cellCandidate => (
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

        return hiddenSinglesCellCandidates
      }
    )
  )
)

const findTuplesCandidates = (n: 2 | 3 | 4) => (boardCandidates: BoardCandidates) => (
  Object.fromEntries(dimensions.map(dimension => [dimension, (new Array(9).fill(null).map((v, boxIndex) => {
    const boxCandidates = getCandidates(boardCandidates)(dimension, boxIndex)

    const candidatesRef = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const cellIndexesByCandidates = candidatesRef.reduce<[string, number[]][]>((acc, candidate) => ([
      ...acc,
      [candidate, boxCandidates.reduce<number[]>((acc, otherCellCandidates, otherCellIndexInBox) => ([
        ...acc,
        ...(otherCellCandidates.includes(candidate) ? [otherCellIndexInBox] : [])
      ]), [])]
    ]), [] as [string, number[]][])

    const findIntersectingTupleCellUnionForCandidate = (maxDepth: typeof n) => (entries: [string, number[]][], initialCandidate: string) => {
      const _findIntersectingTupleCellUnionForCandidate = (prevCandidates: string[], prevAllowedCellIndexes: number[][], currentDepth: typeof maxDepth | 1) => {
        let cellUnionForCandidate: number[] = []

        for (
          const [subCandidate, allowedCellIndexes]
          of entries
            .filter(([subCandidate]) => prevCandidates.every(prevCandidate => prevCandidate !== subCandidate))
        ) {
          const newCandidates = [...prevCandidates, subCandidate]
          const newAllowedCellIndexes = [...prevAllowedCellIndexes, allowedCellIndexes]

          if (currentDepth < maxDepth - 1) {
            cellUnionForCandidate = _findIntersectingTupleCellUnionForCandidate(
              newCandidates,
              newAllowedCellIndexes,
              currentDepth + 1 as typeof currentDepth
            )
          } else {
            const allowedCellsUnion = union(...newAllowedCellIndexes as [number[], number[], ...number[][]])
            if (
              allowedCellsUnion.length === maxDepth &&
              newAllowedCellIndexes.every(newAllowedCellIndexes => newAllowedCellIndexes.length >= 2)
            ) {
              cellUnionForCandidate = allowedCellsUnion
            }
          }

          if (cellUnionForCandidate.length > 0) {
            break
          }
        }

        return cellUnionForCandidate
      }

      return _findIntersectingTupleCellUnionForCandidate(
        [initialCandidate],
        entries.filter(([candidate]) =>  candidate === initialCandidate).map(([,allowedCellIndexes]) => allowedCellIndexes),
        1
      )
    }

    const tuplesIndexesByCandidates = cellIndexesByCandidates
      .map(([candidate], i, entries) => ([
        candidate,
        findIntersectingTupleCellUnionForCandidate(n)(entries, candidate)
      ] as [string, number[]]))

    return boxCandidates.map((cellCandidates, indexInBox) => {
      const tuplesCandidates = tuplesIndexesByCandidates
        .filter(([candidate, allowedCellindexes]) => (
          allowedCellindexes.includes(indexInBox)
        ))
        .map(([candidate, allowedCellindexes]) => candidate)

      return tuplesCandidates.length > 0
          ? tuplesCandidates
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

const getBoard = (
  srcBoard: Board,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension
): Board => {
  const initialBoard = (new Array(9)).fill(null)
  const board = initialBoard.map((v, dstBoxIndex) => {
    const box = getBox(srcBoard, srcDimension)(dstDimension, dstBoxIndex)
    return box
  })
  return board
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

const getBoardCandidates = (
  srcBoard: BoardCandidates,
  srcDimension: Dimension = 'row'
) => (
  dstDimension: Dimension
): BoardCandidates => {
  const initialBoard = (new Array(9)).fill(null)
  const boardCandidates = initialBoard.map((v, dstBoxIndex) => {
    const box = getCandidates(srcBoard, srcDimension)(dstDimension, dstBoxIndex)
    return box
  })
  return boardCandidates
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
      return getAbsoluteIndexFromSquareRelativeIndex([boxIndex, indexInBox])
  }
}

const getRelativeIndex = (dimension: Dimension) => ([rowIndex, colIndex]: CellIndex): CellIndex => {
  switch (dimension) {
    case 'row':
      return [rowIndex, colIndex]
    case 'col':
      return [colIndex, rowIndex]
    case 'square':
      return getSquareRelativeIndexFromAbsoluteIndex([rowIndex, colIndex])
  }
}

/**
 * Given a cell relative index (to its square), 
 * returns its absolute index
 */
const getAbsoluteIndexFromSquareRelativeIndex = ([boxIndex, indexInBox]: CellIndex): CellIndex => {
  const [squareRowIndex, squareColIndex] = deflattenIndex(boxIndex)
  const [cellRowSquareIndex, cellColSquareIndex] = deflattenIndex(indexInBox)

  return [
    (squareRowIndex * 3) + cellRowSquareIndex,
    (squareColIndex * 3) + cellColSquareIndex
  ]
}

/**
 * Given a cell absolute index, 
 * returns its relative index (to its square)
 */
const getSquareRelativeIndexFromAbsoluteIndex = (cellIndex: CellIndex): CellIndex => {
  const squareIndex = getSquare2dIndex(cellIndex)
  const flatSquareIndex = flattenIndex(squareIndex)
  const cellSquareIndex = getCell2dIndexInSquare(cellIndex, squareIndex)
  const flatCellSquareIndex = flattenIndex(cellSquareIndex)

  return [
    flatSquareIndex,
    flatCellSquareIndex
  ]
}

// Nota bene : A "2dIndex" is the bidimentional
// position of a square in the grid,
// or of a cell in a square, like so :
//    0  1  2
// 0 [ ][ ][ ]
// 1 [ ][ ][ ]
// 2 [ ][ ][ ]

/**
 * Gets the square 2dIndex of a given cell
 */
const getSquare2dIndex = ([rowIndex, colIndex]: CellIndex): CellIndex => {
  const squareIndex: CellIndex = [
    Math.floor(rowIndex / 3),
    Math.floor(colIndex / 3)
  ]
  return squareIndex
}

/**
 * Gets the 2dIndex in square of a given cell 
 */
const getCell2dIndexInSquare = ([rowIndex, colIndex]: CellIndex, squareIndex: CellIndex): CellIndex => {
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

/**
 * Given a bidimensionnal index (2dIndex), flatten it
 * to get its actual unidimensional index
 */
const flattenIndex = ([rowIndex, colIndex]: CellIndex): number => {
  const flatIndex = colIndex + (3 * rowIndex)
  return flatIndex
}

/**
 * Given an unidimensional index, deflatten it
 * to get its bidimensionnal index (2dIndex)
 */
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
  dimensions.every(dimension => (
    getBoard(board)(dimension).every(isBoxValid(emptyVal))
  ))
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

// Random utils
const intersection = <T, U extends Array<T> = Array<T>>(a1: U, a2: U, ...rest: Array<U>): ReturnType<U['filter']> => {
  const a12 = a1.filter(v1 => a2.includes(v1))
  if (rest.length === 0) { return a12 as ReturnType<U['filter']> }
  const [
    next,
    ...otherRest
  ] = rest
  return intersection<T, U>(a12 as U, next, ...otherRest)
}

const union = <T, U extends Array<T> = Array<T>>(a1: U, a2: U, ...rest: Array<U>): ReturnType<U['filter']> => {
  const a12 = [...new Set([...a1, ...a2])]

  if (rest.length === 0) { return a12 as ReturnType<U['filter']> }
  const [
    next,
    ...otherRest
  ] = rest
  return union<T, U>(a12 as U, next, ...otherRest)
}


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
  getBoard,
  getBoardCandidates,
  getBox,
  findHiddenSinglesCandidates,
  findTuplesCandidates,
  isBoardValid,
  isBoardOver,
  narrowCandidatesByFilled,
  narrowResultantCandidatesByFilled,
  narrowHiddenTuplesToNaked,
  narrowHiddenSinglesCandidates,
  narrowNakedTuplesResultant,
  generateInitialBoardCandidates
}

export {
  logFullBoard,
  logFullCandidates
}
