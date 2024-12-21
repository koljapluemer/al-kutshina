import { AffordanceReaction, CapabilityReaction } from "../data/items";
import { gameDataStore } from "../stores/gameData";
import type { ExtraImage, Field, Grid, ItemNameGrid } from "../types";

// handles the stuff that encompasses interactions, affordances, capabilities
export class GameHelper {
    public static getInteractionsBetweenFields(sender: Field, receiver: Field):string[] {
        const senderItem = gameDataStore.getItemById(sender.itemId)
        const receiverItem = gameDataStore.getItemById(receiver.itemId)
        if (!senderItem || !receiverItem) return []

        const senderCapabilityKeys = senderItem.capabilities?.map(([key])=> key)
        const receiverAffordanceKeys = receiverItem.affordances?.map(([key])=> key)

        const actionableKeywords = senderCapabilityKeys?.filter(capabilityKey => receiverAffordanceKeys?.includes(capabilityKey))

        return actionableKeywords || []
    }

    public static changeFieldAfterCapabilityTriggered(field: Field, capabilityKey: string) {
        const relevantItem = gameDataStore.getItemById(field.itemId)
        const itemCapabilityData = relevantItem?.capabilities
        if (!itemCapabilityData) return
        const relevantCapabilityData = itemCapabilityData.find(aff => aff[0] === capabilityKey)
        if (!relevantCapabilityData) return


        switch (relevantCapabilityData[1]) {
            case CapabilityReaction.Disappear:
                console.log('disappear')
                // grid[field.coordinate[0]][field.coordinate[1]] = {
                //     itemId: "",
                //     coordinate: field.coordinate
                // }
                field.itemId = ""
                break
            case CapabilityReaction.Return:
                console.log('return')
                break
        }
    }

    public static  changeFieldAfterAffordanceTriggered(sender: Field, receiver: Field, affordanceKey: string) {
        const relevantItem = gameDataStore.getItemById(receiver.itemId)
        const itemAffordanceData = relevantItem?.affordances
        if (!itemAffordanceData) return
        const relevantAffordanceData = itemAffordanceData.find(aff => aff[0] === affordanceKey)
        if (!relevantAffordanceData) return


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
                const extraImage:ExtraImage = {
                    coordinate: receiver.coordinate,
                    id: sender.itemId,
                    scale: 1,
                    offset: [0, 0],
                    rotation: 0
                }
                receiver.extraImage = extraImage
        }
    }

    public static createGameGrid(itemGrid: ItemNameGrid): Field[][] {
        return itemGrid.map((row, rowIndex) =>
          row.map((itemId, colIndex) => ({
            itemId,
            coordinate: { row:rowIndex, col:colIndex },
          }))
        );
      }


}