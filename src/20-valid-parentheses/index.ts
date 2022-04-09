type ValidPair = {
  s: string,
  e: string
}

const validPairs: ValidPair[] = [
  { s: '(', e: ')' },
  { s: '[', e: ']' },
  { s: '{', e: '}' }
]

const endsByStarts: Record<string, string> = validPairs.reduce((acc, pair) => ({
  ...acc,
  [pair.s]: pair.e
}), {})

const startsByEnds: Record<string, string> = validPairs.reduce((acc, pair) => ({
  ...acc,
  [pair.e]: pair.s
}), {})

type CharType = 'start' | 'end' | 'none'
type CharTypeResult = {
  type: CharType,
  pair: ValidPair | null
}
const detectCharType = (char: string): {
  type: CharType,
  pair: ValidPair | null
} => {
  const isStart = char in endsByStarts
  const isEnd = char in startsByEnds

  if (isStart) {
    return { type: 'start', pair: { s: char, e: endsByStarts[char] } }
  } else if (isEnd) {
    return { type: 'end', pair: { s: startsByEnds[char], e: char } }
  } else {
    return { type: 'none', pair: null }
  }
}

type ValidCharTypeResult = {
  type: 'start' | 'end',
  pair: ValidPair
}
const isValidChar = (charTypeResult: CharTypeResult): charTypeResult is ValidCharTypeResult => (
  charTypeResult.type !== 'none'
)

function isValid(input: string): boolean {
  let openPairs: ValidPair[] = []
  let valid = true

  for (const char of input.split('')) {
    const charTypeResult = detectCharType(char)

    // Invalid char
    if (!isValidChar(charTypeResult)) {
      valid = false
      break
    }

    const { type, pair } = charTypeResult

    // It's a start, go on
    if (type === 'start') {
      openPairs.push(pair)
      continue
    }

    // End found without start
    if (openPairs.length === 0) {
      valid = false
      break
    }

    const lastOpenPair = openPairs[openPairs.length - 1]
    // End mismatch with start
    if (lastOpenPair.e !== char) {
      valid = false
      break
    }

    openPairs = openPairs.slice(0, -1)
  }

  // Any pair left open
  if (openPairs.length > 0) {
    valid = false
  }

  return valid
}

export {
  isValid
}
