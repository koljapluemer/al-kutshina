export enum Reaction {
    Disappear,
    Return,
    ChangeTo,
    AddImage
}

type Item = {
    affordances?: AffordanceInfo[],
    capabilities?: AffordanceInfo[]

}

type AffordanceInfo = [
    string, Reaction, string?
]


export const items: Record<string, Item> = {
    kiwi: {
        affordances: [["cut", 2, "kiwi_cut"]]
    },
    kiwi_cut: {
    },
    knife: {
        capabilities: [["cut", 1]]
    },
    car: {
        capabilities: [["park", Reaction.Disappear]]
    },
    parking_lot: {
        affordances: [["park", 3]]
    }
}


