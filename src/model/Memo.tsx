export function MemoFactory({
  id = -1,
  text = '',
  created = Date(),
  reference = '',
  pinned = false,
}): IMemo {
  return {
    contents: text,
    reference: reference,
    created: created,
    id: id,
    pinned: pinned,
  }
}

export interface IMemo {
  id: number
  contents: string
  reference: string
  created: string
  pinned: boolean
}

export interface IMemoCreate {
  contents: string
  reference: string
}

export interface IMemoUpdate {
  contents: string
  reference: string
  removed: boolean
}
