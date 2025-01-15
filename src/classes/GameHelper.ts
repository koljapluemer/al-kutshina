import { AffordanceReaction, CapabilityReaction, type Item, type Exercise, type ExtraImage, type Field, type Grid, type ItemNameGrid } from "../types";
import { pickRandom, pickRandomN, shuffleArray } from "../utils/arrayUtils";

import rawItems from '../data/items.json';

// @ts-ignore
const items: Item[] = rawItems;

// handles the stuff that encompasses interactions, affordances, capabilities
export class GameHelper {

    public static getItemById(id: string) {
        return items.find(item => item.img === id)
    }

    public static getInteractionsBetweenFields(sender: Field, receiver: Field): string[] {
        const senderItem = this.getItemById(sender.itemId)
        const receiverItem = this.getItemById(receiver.itemId)
        if (!senderItem || !receiverItem) return []

        const senderCapabilityKeys = senderItem.capabilities?.map(([key]) => key)
        const receiverAffordanceKeys = receiverItem.affordances?.map(([key]) => key)

        const actionableKeywords = senderCapabilityKeys?.filter(capabilityKey => receiverAffordanceKeys?.includes(capabilityKey))

        return actionableKeywords || []
    }

    public static getInteractionsBetweenItems(sender: Item, receiver: Item): string[] {
        const senderCapabilityKeys = sender.capabilities?.map(([key]) => key)
        const receiverAffordanceKeys = receiver.affordances?.map(([key]) => key)

        const actionableKeywords = senderCapabilityKeys?.filter(capabilityKey => receiverAffordanceKeys?.includes(capabilityKey))
        return actionableKeywords || []

    }

    public static getFieldAfterCapabilityTriggered(field: Field, capabilityKey: string): Field {
        const relevantItem = this.getItemById(field.itemId)
        const itemCapabilityData = relevantItem?.capabilities
        if (!itemCapabilityData) return field
        const relevantCapabilityData = itemCapabilityData.find(aff => aff[0] === capabilityKey)
        if (!relevantCapabilityData) return field


        switch (relevantCapabilityData[1]) {
            case CapabilityReaction.Disappear:
                field.itemId = ""
                break
            case CapabilityReaction.Return:
                break
        }
        return field
    }

    public static getFieldAfterAffordanceTriggered(sender: Field, receiver: Field, affordanceKey: string): Field {
        const relevantItem = this.getItemById(receiver.itemId)
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

    public static getPossibleQuestKeysForItem(item: Item): string[] {
        const keys = [item.key]
        Object.entries(item.props).forEach(([prop, propVal]) => {
            keys.push(item.key + '__' + prop + '__' + propVal)
        })
        return keys
    }

    public static getRandomItem(): Item {
        return pickRandom(items)!
    }

    public static getTwoRandomMatchingItems(): [Item, Item] {
        const itemA = this.getRandomItem()
        const itemB = pickRandom(this.findRelatedItems(itemA, items))!
        return [itemA, itemB]
    }

    private static getBroadDistractors(otherFields: Field[]): Item[] {
        const itemsThatCouldBeDistractors = items.filter(item => {
            let couldBeValidDistractor = true
            otherFields.forEach(field => {
                if (this.getPossibleQuestKeysForItem(item).includes(field.key)) {
                    couldBeValidDistractor = false
                }
                if (field.itemId === item.key) {
                    couldBeValidDistractor = false
                }
            })
            return couldBeValidDistractor
        })
        return itemsThatCouldBeDistractors

    }

    public static getNarrowDistractorsBasedOnItemExerciseString(item: Item, exerciseString: string, items: Item[]): Item[] {

        // find items with
        // a) same key, but chosen property different
        // b) same property, but key different

        const [key, prop, value] = exerciseString.split('__')
        console.log('GOT VALUES', key, prop, value)
        const distractors: Item[] = items.filter(otherItem => {
            if (otherItem === item) return false
            // check a)
            if (otherItem.key === key && otherItem.props[prop] !== value && otherItem.props[prop] !== undefined) {
                return true
            }
            // check b)
            if (otherItem.props[prop] === value && otherItem.key !== key) {
                return true
            }
            return false
        })

        return distractors
    }


    public static generateRandomExercise(): Exercise {
        const items = this.getTwoRandomMatchingItems()
        if (items[0] === undefined || items[1] === undefined) {
            console.error('items incomplete:', items)
            return this.generateRandomExercise()
        }
        const itemAString = pickRandom(this.getPossibleQuestKeysForItem(items[0]))!
        const itemBString = pickRandom(this.getPossibleQuestKeysForItem(items[1]))!


        const fieldA: Field = {
            itemId: items[0].img,
            key: itemAString
        }
        const fieldB: Field = {
            itemId: items[1].img,
            key: itemBString

        }

        const fields = [fieldA, fieldB]

        const broadDistractors = this.getBroadDistractors(fields)
        const narrowDistractorsForA = this.getNarrowDistractorsBasedOnItemExerciseString(items[0], itemAString, broadDistractors)
        const narrowDistractorsForB = this.getNarrowDistractorsBasedOnItemExerciseString(items[1], itemBString, broadDistractors)

        const allDistractors = narrowDistractorsForA.concat(narrowDistractorsForB).concat(broadDistractors)
        const nrOfDistractors = Math.floor(Math.random() * 4) 

        const distractors = pickRandomN(allDistractors, nrOfDistractors)
        distractors.forEach(distractor => {
            fields.push({
                itemId: distractor.img,
                key: this.getPossibleQuestKeysForItem(distractor)[0],
            })
        }
        )

        const shuffledFields = shuffleArray(fields)


        // split long grids into rows
        let grid:Grid;
        if (shuffledFields.length > 2) {
            grid = [
                shuffledFields.slice(0, 2),
                shuffledFields.slice(2)
            ]
        } else {
            grid = [
                shuffledFields
            ]
        }

        let quest = ""
        let interactions = this.getInteractionsBetweenFields(fieldA, fieldB)
        if (interactions.length > 0) {
            quest = `${fieldA.key}-${interactions[0]}-${fieldB.key}`
        } else {
            interactions = this.getInteractionsBetweenFields(fieldB, fieldA)
            quest = `${fieldB.key}-${interactions[0]}-${fieldA.key}`

        }


        const exercise: Exercise = {
            grid: grid,
            quest: quest,
        }

        return exercise
    }


    public static getAllPossibleExerciseStrings(): string[] {
        const exercises: string[] = []
        items.forEach(
            item => {
                const relatedItems = this.findRelatedItems(item, items)
                relatedItems.forEach(
                    relatedItem => {
                        const interactions = this.getInteractionsBetweenItems(item, relatedItem)
                        interactions.forEach(interaction => {
                            const itemKeys = this.getPossibleQuestKeysForItem(item)
                            const relatedItemKeys = this.getPossibleQuestKeysForItem(relatedItem)
                            itemKeys.forEach(itemKey => {
                                relatedItemKeys.forEach(relatedItemKey => {
                                    const key = `${itemKey}-${interaction}-${relatedItemKey}`
                                    if (!exercises.includes(key)) exercises.push(key)
                                })
                            })
                        })
                    }
                )

            }
        )
        console.warn(exercises)
        return exercises
    }


}