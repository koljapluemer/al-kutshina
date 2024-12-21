import type { Item } from "./data/items"

export type Coordinate = {row:number, col:number}

export type Card = {
    item: Item,
    // todo: replace any by a reasonable type
    extraImages?: any,
}

export type Field = {
    itemId: string,
    coordinate: Coordinate,
    extraImage?:ExtraImage
}

export type Grid = Field[][]

export type ItemNameGrid = string[][]

export type ExtraImage = {
    coordinate: Coordinate
    id: string
    scale: number
    offset: [number, number]
    rotation: number
  }