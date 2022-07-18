//    0   1   2  3   4   5  6   7
// 8  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  0
// 7  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  1
// 6  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  2
// 5  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  3
// 4  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  4
// 3  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  5
// 2  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  6
// 1  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  ⬛  ⬜  7
//    a   b   c  d   e   f  g   h

type CellIndex = [number, number]

const rowToIndex = (row: string): number => Math.abs(parseInt(row) - 8)
// 97 is 'a', and sequence is linear until h
const colToIndex = (col: string): number => col.charCodeAt(0) - 97
const cellToIndex = ([col, row]: string): CellIndex => [rowToIndex(row), colToIndex(col)]

const indexToRow = (index: number): string => `${String.fromCharCode(index + 97)}`
const indexToCol = (index: number): string => `${Math.abs(index - 8)}`
const indexToCell = ([colIndex, rowIndex]: CellIndex) => `${indexToRow(rowIndex)}${indexToCol(colIndex)}`

const isEven = (n: number) => (n % 2) === 0
const xor = (a: boolean, b: boolean) => a !== b
const cellIsEven = ([colIndex, rowIndex]: CellIndex) => xor(
  isEven(rowIndex),
  isEven(colIndex)
)

const squareIsWhite = (coordinates: string): boolean => {
  const cellIndex = cellToIndex(coordinates)
  const isWhite = !cellIsEven(cellIndex)
  return isWhite
}

export {
  squareIsWhite,
  rowToIndex,
  colToIndex,
  indexToRow,
  indexToCol,
  cellToIndex,
  indexToCell
}
