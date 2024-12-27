import type { Exercise } from "../data/exercises";
import { AffordanceReaction, CapabilityReaction, items, type Item } from "../data/items";
import { gameDataStore } from "../stores/gameData";
import type { ExtraImage, Field, Grid, ItemNameGrid } from "../types";
import { pickRandom, shuffleArray } from "../utils/arrayUtils";

// handles the stuff that encompasses interactions, affordances, capabilities
export class GameHelper {
    public static getInteractionsBetweenFields(sender: Field, receiver: Field): string[] {
        const senderItem = gameDataStore.getItemById(sender.itemId)
        const receiverItem = gameDataStore.getItemById(receiver.itemId)
        console.log('sender item, rec item', senderItem, receiverItem)
        if (!senderItem || !receiverItem) return []

        const senderCapabilityKeys = senderItem.capabilities?.map(([key]) => key)
        const receiverAffordanceKeys = receiverItem.affordances?.map(([key]) => key)

        const actionableKeywords = senderCapabilityKeys?.filter(capabilityKey => receiverAffordanceKeys?.includes(capabilityKey))

        return actionableKeywords || []
    }

    public static getFieldAfterCapabilityTriggered(field: Field, capabilityKey: string): Field {
        const relevantItem = gameDataStore.getItemById(field.itemId)
        const itemCapabilityData = relevantItem?.capabilities
        if (!itemCapabilityData) return field
        const relevantCapabilityData = itemCapabilityData.find(aff => aff[0] === capabilityKey)
        if (!relevantCapabilityData) return field


        switch (relevantCapabilityData[1]) {
            case CapabilityReaction.Disappear:
                console.log('disappear')
                field.itemId = ""
                break
            case CapabilityReaction.Return:
                console.log('return')
                break
        }
        return field
    }

    public static getFieldAfterAffordanceTriggered(sender: Field, receiver: Field, affordanceKey: string): Field {
        const relevantItem = gameDataStore.getItemById(receiver.itemId)
        const itemAffordanceData = relevantItem?.affordances
        if (!itemAffordanceData) return receiver
        const relevantAffordanceData = itemAffordanceData.find(aff => aff[0] === affordanceKey)
        if (!relevantAffordanceData) return receiver


        switch (relevantAffordanceData[1]) {
            case AffordanceReaction.Disappear:
                // grid[receiver.coordinate[0]][receiver.coordinate[1]] = ""
                receiver.itemId = ""
                break
            case AffordanceReaction.DoNothing:
                break
            case AffordanceReaction.ChangeTo:
                console.log('changing...')
                if (relevantAffordanceData[2]) {
                    // grid[receiver.coordinate[0]][receiver.coordinate[1]] = relevantAffordanceData[2]
                    receiver.itemId = relevantAffordanceData[2]
                } else {
                    console.warn('should change to image but none set')
                }
                break
            case AffordanceReaction.AddImage:
                const extraImage: ExtraImage = {
                    id: sender.itemId,
                    scale: 1,
                    offset: [0, 0],
                    rotation: 0
                }
                receiver.extraImage = extraImage
        }
        return receiver
    }

    public static createGameGrid(exercise: Exercise): Grid {
        let grid: Grid = exercise.grid.map((row, rowIndex) =>
            row.map((itemId, colIndex) => ({
                itemId,
                coordinate: { row: rowIndex, col: colIndex },
            }))
        );
        if (!exercise.disallowShuffle) {
            grid = this.shuffleGrid(grid)
            return grid
        } else {
            return grid

        }
    }

    private static shuffleGrid(grid: Grid): Grid {
        const copiedGrid = JSON.parse(JSON.stringify(grid))
        const flattenedGrid: Field[] = copiedGrid.flat();
        const shuffledFields = shuffleArray(flattenedGrid)

        const nrRows = copiedGrid.length
        const nrCols = copiedGrid[0].length

        const shuffledGrid: Grid = []
        for (let i = 0; i < nrRows; i++) {
            shuffledGrid.push(shuffledFields.slice(i * nrCols, (i + 1) * nrCols))
        }
        return shuffledGrid
    }

    public static findRelatedItems(targetItem: Item, itemList: Item[]): Item[] {
        // Extract affordance and capability names from the target item
        const targetAffordanceNames = targetItem.affordances.map((aff) => aff[0]);
        const targetCapabilityNames = targetItem.capabilities.map((cap) => cap[0]);

        return itemList.filter((item) => {
            // Check if the item has any matching capabilities with the target affordances
            const hasMatchingCapabilities = item.capabilities.some((cap) =>
                targetAffordanceNames.includes(cap[0])
            );

            // Check if the item has any matching affordances with the target capabilities
            const hasMatchingAffordances = item.affordances.some((aff) =>
                targetCapabilityNames.includes(aff[0])
            );

            return hasMatchingCapabilities || hasMatchingAffordances;
        });
    }

    public static getRandomItem(): Item {
        return pickRandom(items)!
    }

    public static getTwoRandomMatchingItems(): [Item, Item] {
        const itemA = this.getRandomItem()
        const itemB = pickRandom(this.findRelatedItems(itemA, items))!
        return [itemA, itemB]
    }

    public static generateRandomGrid(): string[][] {
        const items = this.getTwoRandomMatchingItems()
        const grid: string[][] = [
            [
                items[0].key,
                items[1].key
            ]
        ]

        return grid
    }


}