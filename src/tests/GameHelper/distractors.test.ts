import { expect, test } from "vitest"
import { GameHelper } from "../../classes/GameHelper"
import type { Item } from "../../types"


// red car, green car, red suitcase, yellow old car, yellow new car, big dog, small dog, cat
const items: Item[] = [
    {
        "img": "red-car",
        key: "car",
        "affordances": [
            ["store-medium", 0],
            ["store-small", 0]
        ],
        capabilities: [],
        props: {
            "color": "red"
        }
    },

    {
        img: "green-car",
        key: "car",
        affordances: [
            ["store-medium", 0],
            ["store-small", 0]
        ],
        capabilities: [],
        props: {
            "color": "green"
        }
    },
    {
        img: "red-suitcase",
        key: "suitcase",
        affordances: [
            ["store-small", 0]
        ],
        capabilities: [
            ["store-medium", 0],
        ],
        props: {
            "color": "red"
        }
    },

    {
        img: "yellow-old-car",
        key: "car",
        affordances: [
            ["store-medium", 0],
            ["store-small", 0]
        ],
        capabilities: [],
        props: {
            "color": "yellow",
            "age": "old"
        }
    },
    {
        img: "yellow-new-car",
        key: "car",
        affordances: [
            ["store-medium", 0],
            ["store-small", 0]
        ],
        capabilities: [],
        props: {
            "color": "yellow",
            "age": "new"
        }
    },
    {
        img: "big-dog",
        key: "dog",
        affordances: [
        ],
        capabilities: [
            ["store-medium", 0],
            ["feed", 0]
        ],
        props: {
            "size": "big"
        }
    },
    {
        img: "small-dog",
        key: "dog",
        affordances: [
        ],
        capabilities: [
            ["store-medium", 0],
            ["feed", 0]
        ],
        props: {
            "size": "small"
        }
    },
    {
        img: "cat",
        key: "cat",
        affordances: [
        ],
        capabilities: [
            ["store-medium", 0],
            ["feed", 0]
        ],
        props: {
        }
    }
]


test('GameHelper has functions for getting distractors', () => {
    GameHelper.getDistractorsBasedOnInteractionString('a-b', [])
    GameHelper.getDistractorsBasedOnItemExerciseString('a-b', [])
})


test('GameHelper possible keys works', () => {
    const oldYellowCar = items[3]
    const possibleKeys = GameHelper.getPossibleQuestKeysForItem(oldYellowCar)
    expect(possibleKeys).toEqual(['car', 'car__color__yellow', 'car__age__old'])
})