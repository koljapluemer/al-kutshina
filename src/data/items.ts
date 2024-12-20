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
    }
] as const


