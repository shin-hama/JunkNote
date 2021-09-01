export interface IMemo {
  id: number
  text: string
  attached: string
  reference: string
}

export function MemoFactory({
  id = -1,
  text = '',
  attached = '',
  reference = '',
}) {
  return {
    id: id,
    text: text,
    attached: attached,
    reference: reference,
  }
}

export interface IMemos {
  containts: string
  reference: string
  created: Date
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
