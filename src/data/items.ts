export enum Reaction {
    Disappear,
    Return,
    ChangeTo,
    AddImage
}

export type Item = {
    id: string,
    affordances?: AffordanceInfo[],
    capabilities?: AffordanceInfo[]

}

type AffordanceInfo = [
    string, Reaction, string?
]


export const items: Item[] = [
    {
        id: "kiwi",
        affordances: [["cut", 2, "kiwi_cut"]]
    },
    {
        id: "kiwi_cut"
    },
    {
        id: "knife",
        capabilities: [["cut", 1]]
    },
    {
        id: "car",
        capabilities: [["park", Reaction.Disappear]]
    },
    {
        id: "parking_lot",
        affordances: [["park", 3]]
    }
]


