const getRandomIndex = <T>(array: T[]): number => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return randomIndex
}

const getRandomElementInArray = <T>(array: T[]): [T, number] => {
  const randomIndex = getRandomIndex(array)
  return [array[randomIndex], randomIndex]
}

class Solution {
  nums: number[]

  constructor(nums: number[]) {
    this.nums = nums
  }

  reset(): number[] {
    return this.nums
  }

  shuffle(): number[] {
    let availableIndexes = (new Array(this.nums.length)).fill(null).map((v, i) => i)
    let shuffled = new Array(this.nums.length)

    this.nums.forEach((v => {
      const [randomIndex, randomIndexPosition] = getRandomElementInArray(availableIndexes)
      shuffled[randomIndex] = v
      availableIndexes = [
        ...availableIndexes.slice(0, randomIndexPosition),
        ...availableIndexes.slice(randomIndexPosition + 1)
      ]
    }))

    return shuffled
  }
}

export {
  Solution
}
