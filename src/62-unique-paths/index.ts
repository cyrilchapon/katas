const _initEmptyGrid = (m: number, n: number): null[][] => (
  new Array(n).fill(null).map(row => new Array(m).fill(null))
)

// const findCellPaths = (grid: null[][]) => (cellIndex: [number, number]) => {
//   const [rowIndex, colIndex] = cellIndex
//   const row = grid[rowIndex]

//   const isLastRow = rowIndex === grid.length - 1
//   const isLastCol = colIndex === row.length - 1

//   if (isLastRow && isLastCol) {
//     return [[cellIndex]]
//   }

//   const possibleCellPaths: [number, number][][] = []

//   if (!isLastRow) {
//     const nextRowPossibleSubPaths = findCellPaths(grid)([rowIndex + 1, colIndex])
//     nextRowPossibleSubPaths.forEach(possibleSubPath => {
//       possibleCellPaths.push([cellIndex, ...possibleSubPath])
//     })
//   }

//   if (!isLastCol) {
//     const nextColPossibleSubPaths = findCellPaths(grid)([rowIndex, colIndex + 1])
//     nextColPossibleSubPaths.forEach(possibleSubPath => {
//       possibleCellPaths.push([cellIndex, ...possibleSubPath])
//     })
//   }

//   return possibleCellPaths
// }

// const findCellPaths = (m: number, n: number) => {
//   const __findCellPaths = (cellIndex: [number, number]) => {
//     const [colIndex, rowIndex] = cellIndex
//     const isLastRow = rowIndex === n - 1
//     const isLastCol = colIndex === m - 1
  
//     if (isLastRow && isLastCol) {
//       return [[cellIndex]]
//     }
  
//     const possibleCellPaths: [number, number][][] = []
  
//     if (!isLastRow) {
//       const nextRowPossibleSubPaths = __findCellPaths([rowIndex + 1, colIndex])
//       nextRowPossibleSubPaths.forEach(possibleSubPath => {
//         possibleCellPaths.push([cellIndex, ...possibleSubPath])
//       })
//     }
  
//     if (!isLastCol) {
//       const nextColPossibleSubPaths = __findCellPaths([rowIndex, colIndex + 1])
//       nextColPossibleSubPaths.forEach(possibleSubPath => {
//         possibleCellPaths.push([cellIndex, ...possibleSubPath])
//       })
//     }
  
//     return possibleCellPaths
//   }

//   return __findCellPaths
// }

// const findUniquePaths = (m: number, n: number) => findCellPaths(m, n)([0, 0])

const countUniquePaths = (m: number, n: number) => {
  let cpt = 0

  const _countCellPaths = (rowIndex: number, colIndex: number) => {
    const isLastRow = rowIndex === n - 1
    const isLastCol = colIndex === m - 1
  
    if (isLastRow && isLastCol) {
      cpt++
      return
    }

    if (!isLastRow) {
      _countCellPaths(rowIndex + 1, colIndex)
    }
  
    if (!isLastCol) {
      _countCellPaths(rowIndex, colIndex + 1)
    }
  }

  _countCellPaths(0, 0)

  return cpt
}

function uniquePaths(m: number, n: number): number {
  // const grid = _initEmptyGrid(m, n)

  // const uniquePaths = findUniquePaths(m, n)
  // const uniquePathsCount = uniquePaths.length

  const uniquePathsCount = countUniquePaths(m, n)

  return uniquePathsCount
}

export {
  _initEmptyGrid,
  // findUniquePaths,
  uniquePaths
}
