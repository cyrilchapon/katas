// const books = [
//   0, 0,
//   1,
//   2, 2,
//   3,
//   4, 4, 4
// ]

import { bookPrice, discounts } from './prices'
import { sum, replaceAtIndex } from './util'

const decrementAtIndex = replaceAtIndex<number>(
  old => old - 1
)

const getBestPrice = (cartBooks: number[]): number => {
  const bundles = buildBundles(cartBooks)
  const bundlePrices = bundles.map(getPriceForBundle)

  const cartPrice = sum(...bundlePrices)

  return cartPrice
}

const buildBundles = (cartBooks: number[]): number[][] => {
  if (cartBooks.length === 0) {
    return []
  }

  // Get quantities at indexes
  // Like [2, 1, 0, 4, 2]
  let booksQties = getBooksQuantities(cartBooks)

  // Get indexes sorted desc by quantities
  // Like [3, 4, 0, 1, 2]
  const booksIndexes = booksQties.map((v, i) => i)
  const booksIndexesByQtyDesc = [...booksIndexes]
    .sort((iBook1, iBook2) => booksQties[iBook1] - booksQties[iBook2])
    .reverse()

  // Build bundles starting, following highest quantities order
  // Like [ [3, 4, 0, 1], [3, 4, 0], [3], [3] ]
  let bundles: number[][] = []
  while(booksQties.some(qty => qty > 0)) {
    // Build each bundle by accumulating items
    let [
      bundle,
      newBooksQties
    ] = booksIndexesByQtyDesc.reduce<[number[], number[]]>(
      ([bundle, prevBooksQties], bookIndex) => {
        if (prevBooksQties[bookIndex] === 0) {
          return [bundle, prevBooksQties]
        }

        return [
          [...bundle, bookIndex],
          decrementAtIndex(prevBooksQties, bookIndex)
        ]
      },
      [[], booksQties]
    )

    bundle = [...bundle].sort()
    bundles.push(bundle)

    // At each iteration, update quantities with consumption
    booksQties = newBooksQties
  }

  return bundles
}

const getBooksQuantities = (cartBooks: number[]): number[] => {
  const maxBookIndex = Math.max(...cartBooks)

  const booksQties = cartBooks.reduce<number[]>((acc, bookId) => {
    acc[bookId]++
    return acc
  }, (new Array(maxBookIndex + 1)).fill(0))

  return booksQties
}

const getPriceForBundle = (bundleBooks: number[]): number => {
  if (bundleBooks.length === 0) {
    return 0
  }

  const discount = discounts[bundleBooks.length - 1]

  return (bundleBooks.length * bookPrice) * (1 - discount)
}

export {
  getBestPrice
}
