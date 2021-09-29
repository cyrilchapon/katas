const _roundTo = (multiplier: number) => (value: number) => {
  return Math.round(value * multiplier) / multiplier
}

const _multiply = (precision: number) => (x: number, y: number) => (
  ((precision * x) * (precision * y)) / (precision * precision)
)

const _divide = (precision: number) => (x: number, y: number) => (
  (precision * x) / (precision * y)
)

const posPow = (x: number, n: number): number => {
  const operate = n === 0
    ? (x: number, y: number) => x === 0 ? 0 : 1
    : (n > 0
      ? _multiply(1_000_000_000)
      : _divide(1_000_000_000)
    )

  let result = 1
  for (let i = 0; i < Math.abs(n); i++) {
    const prevResult = result
    result = operate(result, x)

    if (prevResult === result) {
      break
    }
    // console.log('iteration', result)
  }

  return result
}

function myPow(x: number, n: number): number {
  const roundTo = _roundTo(1_000_000_000)

  switch (true) {
    case roundTo(x) === 0:
      return 0
    case roundTo(x) === 1.0:
      return 1
    case roundTo(x) === -1.0:
      return (n % 2) === 0 ? 1.0 : -1.0
    // case n < 0:
    //   return _roundTo(100_000)(1 / posPow(x, n))
    default :
      return _roundTo(100_000)(posPow(x, n))
  }
}

export {
  myPow
}
