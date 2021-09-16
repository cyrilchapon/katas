const _getArea = (heights: number[]) => (i1: number, i2: number): number => {
  const h1 = heights[i1]
  const h2 = heights[i2]

  const width = Math.abs(i2 - i1)
  const height = Math.min(h1, h2)

  return width * height
}

function maxArea(heights: number[]): number {
  const getArea = _getArea(heights)

  let greatestArea: number = 0

  // Loop on every heights
  let h1prev = 0
  for (let i1 = 0; i1 < heights.length; i1++) {
    const h1 = heights[i1]

    if (h1 <= h1prev) {
      continue
    }

    // Subloop on remainings
    let h2prev = 0
    for (let i2 = heights.length - 1; i2 > i1; i2--) {
      const h2 = heights[i2]

      if (h2 <= h2prev) {
        continue
      }

      const currentArea = getArea(i1, i2)

      greatestArea = Math.max(currentArea, greatestArea)

      h2prev = h2
    }

    h1prev = h1
  }

  return greatestArea
}

export {
  maxArea
}
