type TestCase = {
  input: string
  expected: boolean
}

const testCases: TestCase[] = [
  {
    input: 'a1',
    expected: false
  },
  {
    input: 'h3',
    expected: true
  },
  {
    input: 'c7',
    expected: false
  }
]

export {
  testCases
}
export type {
  TestCase
}
