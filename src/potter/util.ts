const sum = (...ns: number[]) => ns.reduce((acc, n) => acc + n, 0)

const replaceAtIndex = <T>(fn: (input: T) => T) => (ns: T[], index: number): T[] => ([
  ...ns.slice(0, index),
  fn(ns[index]),
  ...ns.slice(index + 1)
])

export {
  sum,
  replaceAtIndex
}