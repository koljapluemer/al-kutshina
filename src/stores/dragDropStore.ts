// dragDropStore.ts
import { reactive } from 'vue';
import type { Card, Coordinate, FieldData, ItemNameGrid } from '../types';
import { Reaction, type Item } from '../data/items';
import { Alchemy } from '../classes/Alchemy';
import { gameDataStore } from './gameData';

export const dragDropStore = reactive({
    dragStartedFromField: undefined as (FieldData | undefined),
    grid: undefined as (ItemNameGrid | undefined),

    setGrid(grid: ItemNameGrid) {
        this.grid = grid
    },

    handleDrop(droppedOnField: (FieldData)) {
        console.info('drop on item registered', droppedOnField, 'from', this.dragStartedFromField)


        if (!this.dragStartedFromField) { console.warn('drop without drop start, should be impossible'); return }


        const interactions = Alchemy.getInteractionsBetweenFields(this.dragStartedFromField, droppedOnField)
        console.log('interactions', interactions)
        interactions.forEach(interaction => {
            console.log('trigger for', this.dragStartedFromField!, interaction)
            if (this.dragStartedFromField) this.changeGridAfterCapabilityTriggeredOnField(this.dragStartedFromField, interaction)
        })
    },

    changeGridAfterCapabilityTriggeredOnField(field: FieldData, capabilityKey: string) {
        console.log('check 0')

        if (!this.grid) return

        console.info('check 1')

        const relevantItem = gameDataStore.getItemById(field.itemId)
        console.info('check 1b', relevantItem)

        const itemCapabilityData = relevantItem?.capabilities
        if (!itemCapabilityData) return
        console.info('check 2')
        const relevantAffordanceData = itemCapabilityData.find(aff => aff[0] === capabilityKey)
        console.info('check 3', relevantAffordanceData)

        if (!relevantAffordanceData) return

        console.info('about to cut', relevantAffordanceData[1])

        switch (relevantAffordanceData[1]) {
            case Reaction.Disappear:
                console.log('disappear')
                this.grid[field.coordinate[0]][field.coordinate[1]] = ""
                break
            case Reaction.Return:
                console.log('return')
                break
        }
    },

    changeGridAfterAffordanceTriggeredOnField(field: FieldData, affordanceKey: string) {

    },

});
