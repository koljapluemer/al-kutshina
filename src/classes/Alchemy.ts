import { gameDataStore } from "../stores/gameData";
import type { FieldData } from "../types";

// handles the stuff that encompasses interactions, affordances, capabilities
export class Alchemy {
    public static getInteractionsBetweenFields(sender: FieldData, receiver: FieldData):string[] {
        const senderItem = gameDataStore.getItemById(sender.itemId)
        const receiverItem = gameDataStore.getItemById(receiver.itemId)
        if (!senderItem || !receiverItem) return []

        const senderCapabilityKeys = senderItem.capabilities?.map(([key])=> key)
        const receiverAffordanceKeys = receiverItem.affordances?.map(([key])=> key)

        const actionableKeywords = senderCapabilityKeys?.filter(capabilityKey => receiverAffordanceKeys?.includes(capabilityKey))

        return actionableKeywords || []
    }

}