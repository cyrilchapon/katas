const hardIsNegative = (n: number): boolean => (
  n < 0 ||
  Object.is(n, -0)
)
const xor = (a: boolean, b: boolean): boolean => a !== b
const isNegativeProduct = (a: number, b: number): boolean => xor(
  hardIsNegative(a),
  hardIsNegative(b)
)
const getProductSign = (a: number, b: number): number => (
  isNegativeProduct(a, b)
    ? -1
    : +1
)

const MIN_QUOTIENT = -2147483648
const MAX_QUOTIENT = 2147483647

const divide = (dividend: number, divisor: number): number => {
  let quotient = 0
  let quotientSign = getProductSign(dividend, divisor)

  const _dividend = Math.abs(dividend)
  const _divisor = Math.abs(divisor)

  if (_divisor === 1) {
    quotient = _dividend
  } else {
    let overflew = false
    let _tempDividend = _dividend
  
    do {
      _tempDividend = _tempDividend - _divisor
      overflew = _tempDividend < 0
      quotient++
    } while(!overflew)
  
    quotient = quotient - 1
  }

  return (quotientSign === -1)
    ? (-quotient < MIN_QUOTIENT ? MIN_QUOTIENT : -quotient)
    : (quotient > MAX_QUOTIENT ? MAX_QUOTIENT : quotient)
}

export {
  divide,
  hardIsNegative,
  xor,
  isNegativeProduct,
  getProductSign
}
