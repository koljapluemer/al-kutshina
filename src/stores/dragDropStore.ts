// dragDropStore.ts
import { reactive } from 'vue';
import type { Card, Coordinate, FieldData } from '../types';
import type { Item } from '../data/items';

export const dragDropStore = reactive({
  dragStartedFromField: undefined as (FieldData | undefined),



  handleDrop(droppedOnField: (FieldData | undefined)) {
    console.info('drop on item registered', droppedOnField, 'from', this.dragStartedFromField)
  }
});
