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
    id: string,
    affordances?: AffordanceInfo[],
    capabilities?: CapabilityInfo[]

}

type CapabilityInfo = [
    string, CapabilityReaction, string?
]

type AffordanceInfo = [
    string, AffordanceReaction, string?
]


export const items: Item[] = [
    {
        id: "kiwi",
        affordances: [["cut", AffordanceReaction.ChangeTo, "kiwi_cut"]]
    },
    {
        id: "kiwi_cut"
    },
    {
        id: "broccoli_half"
    },
    {
        id: "apple_half"
    },
    {
        id: "lemon_cut"
    },
    {
        id: "mango_cut"
    },
    {
        id: "onion_cut"
    },
    {
        id: "melon_cut"
    },
    {
        id: "knife",
        capabilities: [["cut", 1]]
    },
    {
        id: "car",
        capabilities: [["park", CapabilityReaction.Disappear]]
    },
    {
        id: "parking_lot",
        affordances: [["park", 3]]
    },
    {
        id: "apple",
        affordances: [["cut", 2, "apple_half"]]
    },
    {
        id: "broccoli",
        affordances: [["cut", 2, "broccoli_half"]]
    },
    {
        id: "lemon",
        affordances: [["cut", 2, "lemon_cut"]]
    },
    {
        id: "mango",
        affordances: [["cut", 2, "mango_cut"]]
    },
    {
        id: "onion",
        affordances: [["cut", 2, "onion_cut"]]
    },
] as const


