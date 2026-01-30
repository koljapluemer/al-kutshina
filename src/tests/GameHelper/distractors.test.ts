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

const oldYellowCar = items[3] as Item
const redCar = items[0] as Item
const greenCar = items[1] as Item
const yellowNewCar = items[4] as Item

test('GameHelper possible keys works', () => {
    const possibleKeys = GameHelper.getPossibleQuestKeysForItem(oldYellowCar)
    expect(possibleKeys).toEqual(['car', 'car__color__yellow', 'car__age__old'])
})

test('distrators for yellow car work', () => {
    const yellowCarDistractors = GameHelper.getNarrowDistractorsBasedOnItemExerciseString(oldYellowCar, 'car__color__yellow', items)
    expect(yellowCarDistractors).toEqual([redCar, greenCar])
})

test('distrators for old car work', () => {
    const yellowCarDistractors = GameHelper.getNarrowDistractorsBasedOnItemExerciseString(oldYellowCar, 'car__age__old', items)
    expect(yellowCarDistractors).toEqual([yellowNewCar])
})

test('no narrow distractors for unspecified property', () => {
    // When no property is specified in the exercise string,
    // there are no narrow distractors (they only apply when filtering by property)
    const distractors = GameHelper.getNarrowDistractorsBasedOnItemExerciseString(oldYellowCar, 'car', items)
    expect(distractors).toEqual([])
})
