import type { Item } from "./data/items"

export type Coordinate = [number, number]

export type Card = {
    item: Item,
    // todo: replace any by a reasonable type
    extraImages?: any,
}

export type FieldData = {
    itemId: string,
    cellSize: string,
    coordinate: Coordinate
}

export type ItemNameGrid = string[][]