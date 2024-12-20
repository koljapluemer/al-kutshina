type Exercise = {
    grid: string[][],
    quest: string,
    collections: string[]
}

export const exercises:Exercise[] = [
    {
        grid: [["kiwi", "knife"]],
        quest: "knife-cut-kiwi",
        collections: ["cutting-things"]
    },
    {
        grid: [["knife", "kiwi"]],
        quest: "knife-cut-kiwi",
        collections: ["cutting-things"]
    },
    {
        grid: [["car", "parking_lot"]],
        quest: "car-park-parking_lot",
        collections: ["parking"]
    }
] 