// dragDropStore.ts
import { reactive } from 'vue';
import type { Card } from '../types';
import type { Item } from '../data/items';

export const dragDropStore = reactive({
  draggedCard: undefined as (Card | undefined),

  setDraggedCard(card: Card | undefined) {
    dragDropStore.draggedCard = card;
  },

  clearDraggedCard() {
    this.draggedCard = undefined
  },

  handleDrop(droppedOnItem: Item) {
    console.info('drop on item registered', droppedOnItem, 'from', this.draggedCard)
  }
});
