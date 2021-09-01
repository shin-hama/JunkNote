export function MemoFactory({
  id = -1,
  text = '',
  created = Date(),
  reference = '',
}): IMemo {
  return {
    containts: text,
    reference: reference,
    created: created,
    id: id,
  }
}

export interface IMemo {
  containts: string
  reference: string
  created: string
  id: number
}

export interface IMemoCreate {
  containts: string
  reference: string
}

export interface IMemoUpdate {
  containts: string
  reference: string
  isRemoved: boolean
}
