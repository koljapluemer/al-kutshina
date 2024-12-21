// dragDropStore.ts
import { reactive } from 'vue';
import type { Card, Coordinate, ExtraImage, Field, ItemNameGrid } from '../types';
import { AffordanceReaction, CapabilityReaction, } from '../data/items';
import { GameHelper } from '../classes/GameHelper';
import { gameDataStore } from './gameData';


export const dragDropStore = reactive({
    dragStartedFromField: undefined as (Field | undefined),
    grid: undefined as (ItemNameGrid | undefined),
    extraImage: undefined as (ExtraImage | undefined),
    lastActionsThatWereDone: [] as (string[]),

    setGrid(grid: ItemNameGrid) {
        this.grid = grid
        this.extraImage = undefined
    },

    getLastActions(): string [] {
        return this.lastActionsThatWereDone
    },

    handleDrop(droppedOnField: (Field)) {
        if (!this.grid) return
        if (!this.dragStartedFromField) { console.warn('drop without drop start, should be impossible'); return }


        const interactions = GameHelper.getInteractionsBetweenFields(this.dragStartedFromField, droppedOnField)
        console.log('interactions', interactions)
        // should only be one interaction, but who knows
        this.lastActionsThatWereDone = []
        interactions.forEach(interaction => {
            const actionString = this.dragStartedFromField!.itemId + '-' + interaction + '-' + droppedOnField.itemId
            // TODO: this is super unideal that we're generting this string here, in this semi SSOT state component
            this.lastActionsThatWereDone.push(actionString)
            console.log('actionString', actionString)
            this.changeGridAfterCapabilityTriggeredOnField(this.dragStartedFromField!, interaction)
            this.changeGridAfterAffordanceTriggeredOnField(this.dragStartedFromField!, droppedOnField, interaction)
        })
    },



});
