import type { Item } from "./data/items"

export type Coordinate = {row:number, col:number}

export type Card = {
    item: Item,
}

export type Field = {
    itemId: string,
    extraImage?:ExtraImage
}

export type Grid = Field[][]

export type ItemNameGrid = string[][]

export type ExtraImage = {
    id: string
    scale: number
    offset: [number, number]
    rotation: number
  }