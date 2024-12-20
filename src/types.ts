import type { Item } from "./data/items"

export type Coordinate = [number, number]

export type Card = {
    item: Item,
    // todo: replace any by a reasonable type
    extraImages?: any,
}