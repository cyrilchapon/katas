const mergeSorted = (nums1: number[], nums2: number[]): number[] => {
  let i1 = 0
  let i2 = 0

  let numsRes: number[] = []
  while (i1 < nums1.length && i2 < nums2.length) {
    if (nums1[i1] <= nums2[i2]) {
      numsRes.push(nums1[i1])
      i1++
    } else {
      numsRes.push(nums2[i2])
      i2++
    }
  }
  numsRes = numsRes.concat(nums1.slice(i1))
  numsRes = numsRes.concat(nums2.slice(i2))

  return numsRes
}

const isEven = (num: number): Boolean => (num % 2) === 0

const getMedian = (nums: number[]): number => {
  if (nums.length === 0) {
    return 0
  }

  // [2, 4, 6, 8, 9, 0]
  if (!isEven(nums.length)) {
    const middleN = (nums.length - 1) / 2
    return nums[middleN]
  }

  const middle = (nums.length) / 2
  return (nums[middle - 1] + nums[middle]) / 2
}

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const numsMerged = mergeSorted(nums1, nums2)
  const mergedMedian = getMedian(numsMerged)

  return mergedMedian
}

export {
  mergeSorted,
  getMedian
}