let accessedTimestamp: Date | null = null

export const setAccessedTimestamp = (timestamp: Date) => {
  accessedTimestamp = timestamp
}

export const getAccessedTimestamp = () => {
  return accessedTimestamp ?? new Date()
}
