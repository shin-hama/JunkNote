export function MemoFactory({
  id = -1,
  text = '',
  created = Date(),
  reference = '',
}): IMemo {
  return {
    contents: text,
    reference: reference,
    created: created,
    id: id,
  }
}

export interface IMemo {
  contents: string
  reference: string
  created: string
  id: number
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
