export function GetRandomIndexes(max: number) {
  const memosNum = Array(...Array(max)).map((v, i) => {
    return i
  })
  for (let i = memosNum.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = memosNum[i]
    memosNum[i] = memosNum[j]
    memosNum[j] = temp
  }

  return memosNum
}
