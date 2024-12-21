export type Exercise = {
    grid: string[][],
    quest: string,
    collections: string[]
}

export const exercises:Exercise[] = [
    {
        grid: [["kiwi", "knife", ""]],
        quest: "knife-cut-kiwi",
        collections: ["cutting-things"]
    },
    {
        grid: [["knife", "apple", ""]],
        quest: "knife-cut-apple",
        collections: ["cutting-things"]
    },
    {
        grid: [["knife", "mango", ""]],
        quest: "knife-cut-mango",
        collections: ["cutting-things"]
    },
    {
        grid: [["knife", "mango", "lemon"]],
        quest: "knife-cut-mango",
        collections: ["cutting-things"]
    },
    {
        grid: [["knife", "lemon", "onion"]],
        quest: "knife-cut-lemon",
        collections: ["cutting-things"]
    },
    {
        grid: [["car", ""], ["", "parking_lot"]],
        quest: "car-park-parking_lot",
        collections: ["parking", "cars"]
    }
] 