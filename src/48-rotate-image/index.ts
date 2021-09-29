/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  const rotatedMatrix = rotateImage(matrix)
  _copyMatrix(rotatedMatrix)(matrix)
}

const _copyMatrix = (srcMatrix: number[][]) => (dstMatrix: number[][]) => {
  srcMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      dstMatrix[rowIndex][cellIndex] = cell
    })
  })
}

const rotateImage = (matrix: number[][]): number[][] => {
  _checkMatrix(matrix)

  const size = matrix.length

  const rotatedMatrix = new Array(size).fill(null).map(() => new Array(size).fill(null))

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      rotatedMatrix[cellIndex][size - 1 - rowIndex] = cell
    })
  })

  return rotatedMatrix
}

const _checkMatrix = (matrix: number[][]): void => {
  if (matrix.some(row => row.length !== matrix.length)) {
    throw new Error(`Matrix should be equal width and height`)
  }
}

const _printMatrix = (matrix: number[][]): void => {
  const padding = 3
  const size = matrix.length

  const rows = matrix.map(row => {
    return `| ${row.map(cell => `${cell}`.padStart(padding, '0')).join(' | ')} |`
  })
  const separatorLine = new Array(size).fill('-'.repeat(padding + 2)).join('|')
  const internal = rows.join(`\n|${separatorLine}|\n`)

  const baseLine = '-'.repeat(((padding + 2) * size) + 2)
  const total = ` ${baseLine} \n${internal}\n ${baseLine} `
  console.log(total)
}

export {
  rotateImage,
  _checkMatrix,
  _printMatrix
}
