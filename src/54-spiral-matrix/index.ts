const corners = ['tl', 'tr', 'br', 'bl'] as const

type Corner = typeof corners[number]

const getNextCorner = (corner: Corner): Corner => corners[(corners.indexOf(corner) + 1) % corners.length]

const getToRemove = (corner: Corner): ['row' | 'col', 'first' | 'last'] => ({
  'tl': ['col', 'first'],
  'tr': ['row', 'first'],
  'br': ['col', 'last'],
  'bl': ['row', 'last']
}[corner] as ['row' | 'col', 'first' | 'last'])

const getRange = (matrix: number[][]) => (corner: Corner) => ({
  'tl': matrix[0],
  'tr': matrix.map((row, rowIndex) => matrix[rowIndex][row.length - 1] ),
  'br': matrix[matrix.length - 1].slice().reverse(),
  'bl': matrix.map((row, rowIndex) => matrix[rowIndex][0]).slice().reverse()
}[corner])

function spiralOrder(matrix: number[][]): number[] {
  _checkMatrix(matrix)

  const spiralLength = matrix.length * (matrix[0]?.length ?? 1)

  let currentCorner: Corner = 'tl'
  let currentMatrix = matrix

  let currentRange = getRange(currentMatrix)(currentCorner)
  let relativeI = 0
  const aggregate = []
  for (let i = 0; i < spiralLength; i++) {
    aggregate.push(currentRange[relativeI])

    if (i < spiralLength - 1 && relativeI === currentRange.length - 1) {
      currentCorner = getNextCorner(currentCorner)
      const toRemove = getToRemove(currentCorner)
      currentMatrix = remove(currentMatrix)(toRemove[0])(toRemove[1])
      currentRange = getRange(currentMatrix)(currentCorner)
      relativeI = 0

      // _printMove(
      //   currentCorner,
      //   toRemove,
      //   currentMatrix,
      //   currentRange
      // )
    } else {
      relativeI++
    }
  }

  return aggregate
}

const remove = (matrix: number[][]) => (rowOrCol: 'row' | 'col') => (firstOrLast: 'first' | 'last'): number[][] => {
  return rowOrCol === 'row'
    ? removeRow(matrix)(firstOrLast)
    : removeCol(matrix)(firstOrLast)
}

const removeRow = (matrix: number[][]) => (firstOrLast: 'first' | 'last'): number[][] => {
  return firstOrLast === 'first'
    ? matrix.slice(1)
    : matrix.slice(0, -1)
}

const removeCol = (matrix: number[][]) => (firstOrLast: 'first' | 'last'): number[][] => {
  return matrix.map(row => (
    firstOrLast === 'first'
      ? row.slice(1)
      : row.slice(0, -1)
  ))
}

const _checkMatrix = (matrix: number[][]): void => {
  if (matrix.some((row, rowIndex) => rowIndex !== 0 && row.length !== matrix[rowIndex - 1].length)) {
    throw new Error('Every rows should have same length')
  }
}

const _printMatrix = (matrix: number[][]): void => {
  const padding = 2
  const height = matrix.length
  const width = matrix[0]?.length ?? 0

  const rows = matrix.map(row => {
    return `| ${row.map(cell => `${cell}`.padStart(padding, '0')).join(' | ')} |`
  })
  const separatorLine = new Array(width).fill('-'.repeat(padding + 2)).join('|')
  const internal = rows.join(`\n|${separatorLine}|\n`)

  const baseLine = '-'.repeat(((padding + 2) * width) + (width - 1))
  const total = ` ${baseLine} \n${internal}\n ${baseLine} `
  console.log(total)
}

const _printMove = (
  currentCorner: Corner,
  toRemove: ['row' | 'col', 'first' | 'last'],
  currentMatrix: number[][],
  currentRange: number[]
) => {
  console.log('-------------------------')
  console.log(`Reached ${currentCorner}`)
  console.log(`Removed ${toRemove[1]} ${toRemove[0]}`)
  console.log('New matrix')
  _printMatrix(currentMatrix)
  console.log(`New range`)
  console.log(JSON.stringify(currentRange))
  console.log('-------------------------')
}

export {
  spiralOrder,
  _checkMatrix,
  _printMatrix,
  getNextCorner
}
