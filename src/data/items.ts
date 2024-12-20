export const items = {
    kiwi: {
        affordances: ["cut", 2, "kiwi_cut"]
    },
    kiwi_cut: {
    },
    knife: {
        capabilities: ["cut", 1]
    },
    car: {
        capabilities: ["park", 0]
    },
    parking_lot: {
        affordances: ["park", 3]
    }
} as const

export enum Reaction {
    Disappear,
    Return,
    ChangeTo,
    AddImage
}