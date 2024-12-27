
export type Coordinate = { row: number, col: number }

export type Card = {
    item: Item,
}

export type Field = {
    itemId: string,
    key: string,
    extraImage?: ExtraImage,
}

export type Grid = Field[][]

export type ItemNameGrid = string[][]

export type ExtraImage = {
    id: string
    scale: number
    offset: [number, number]
    rotation: number
}

export type Exercise = {
    grid: Grid,
    quest: string,
    disallowShuffle?: boolean
}


export enum CapabilityReaction {
    Disappear,
    Return
}

export enum AffordanceReaction {
    Disappear,
    DoNothing,
    ChangeTo,
    AddImage
}


export type Item = {
    key: string,
    img: string,
    props: Record<string, string>,
    affordances: AffordanceInfo[],
    capabilities: CapabilityInfo[]

}

export type CapabilityInfo = [
    string, CapabilityReaction, string?
]

export type AffordanceInfo = [
    string, AffordanceReaction, string?
]
