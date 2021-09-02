type TestCase = {
  expected: number,
  books: number[]
}

const basics: TestCase[] = [
  { expected: 0, books: [] },
  { expected: 8, books: [1] },
  { expected: 8, books: [2] },
  { expected: 8, books: [3] },
  { expected: 8, books: [4] },
  { expected: 8 * 3, books: [1, 1, 1] }
]

const simpleDiscounts: TestCase[] = [
  { expected: 8 * 2 * 0.95, books: [0, 1] },
  { expected: 8 * 3 * 0.9, books: [0, 2, 4] },
  { expected: 8 * 4 * 0.8, books: [0, 1, 2, 4] },
  { expected: 8 * 5 * 0.75, books: [0, 1, 2, 3, 4] }
]

const severalDiscounts: TestCase[] = [
  { expected: 8 + (8 * 2 * 0.95), books: [0, 0, 1] },
  { expected: 2 * (8 * 2 * 0.95), books: [0, 0, 1, 1] },
  { expected: (8 * 4 * 0.8) + (8 * 2 * 0.95), books: [0, 0, 1, 2, 2, 3] },
  { expected: 8 + (8 * 5 * 0.75), books: [0, 1, 1, 2, 3, 4] }
]

const edgeCases: TestCase[] = [
  { expected: 2 * (8 * 4 * 0.8), books: [0, 0, 1, 1, 2, 2, 3, 4] },
  {
    expected: 3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8), 
    books: [
      0, 0, 0, 0, 0, 
      1, 1, 1, 1, 1, 
      2, 2, 2, 2, 
      3, 3, 3, 3, 3, 
      4, 4, 4, 4
    ]
  }
]

export type {
  TestCase
}

export {
  basics,
  simpleDiscounts,
  severalDiscounts,
  edgeCases
}
