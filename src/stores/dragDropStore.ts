// dragDropStore.ts
import { reactive } from 'vue';
import type { Card, Coordinate, FieldData, ItemNameGrid } from '../types';
import { AffordanceReaction, CapabilityReaction, } from '../data/items';
import { Alchemy } from '../classes/Alchemy';
import { gameDataStore } from './gameData';

export const dragDropStore = reactive({
    dragStartedFromField: undefined as (FieldData | undefined),
    grid: undefined as (ItemNameGrid | undefined),

    setGrid(grid: ItemNameGrid) {
        this.grid = grid
    },

    handleDrop(droppedOnField: (FieldData)) {
        if (!this.grid) return
        if (!this.dragStartedFromField) { console.warn('drop without drop start, should be impossible'); return }


        const interactions = Alchemy.getInteractionsBetweenFields(this.dragStartedFromField, droppedOnField)
        console.log('interactions', interactions)
        interactions.forEach(interaction => {
            console.log('trigger for', this.dragStartedFromField!, interaction)
            if (this.dragStartedFromField) this.changeGridAfterCapabilityTriggeredOnField(this.dragStartedFromField, interaction)
            this.changeGridAfterAffordanceTriggeredOnField(droppedOnField, interaction)
        })
    },

    changeGridAfterCapabilityTriggeredOnField(field: FieldData, capabilityKey: string) {
        if (!this.grid) return
        const relevantItem = gameDataStore.getItemById(field.itemId)
        const itemCapabilityData = relevantItem?.capabilities
        if (!itemCapabilityData) return
        const relevantCapabilityData = itemCapabilityData.find(aff => aff[0] === capabilityKey)
        if (!relevantCapabilityData) return


        switch (relevantCapabilityData[1]) {
            case CapabilityReaction.Disappear:
                console.log('disappear')
                this.grid[field.coordinate[0]][field.coordinate[1]] = ""
                break
            case CapabilityReaction.Return:
                console.log('return')
                break
        }
    },

    changeGridAfterAffordanceTriggeredOnField(field: FieldData, affordanceKey: string) {
        if (!this.grid) return
        const relevantItem = gameDataStore.getItemById(field.itemId)
        const itemAffordanceData = relevantItem?.affordances
        if (!itemAffordanceData) return
        const relevantAffordanceData = itemAffordanceData.find(aff => aff[0] === affordanceKey)
        if (!relevantAffordanceData) return


        switch (relevantAffordanceData[1]) {
            case AffordanceReaction.Disappear:
                this.grid[field.coordinate[0]][field.coordinate[1]] = ""
                break
            case AffordanceReaction.DoNothing:
                break
            case AffordanceReaction.ChangeTo:
                console.log('changing...')
                if (relevantAffordanceData[2]) {
                    this.grid[field.coordinate[0]][field.coordinate[1]] = relevantAffordanceData[2]
                } else {
                    console.warn('should change to image but none set')
                }
                break
            case AffordanceReaction.AddImage:
                console.warn('not implemented')
        }
    },

});
