import { reactive, ref } from "vue";
import type { Collection } from "../iguanodo/types/Collection";
import type { Item } from "../data/items";

export const gameDataStore = reactive({
    collections: [] as Collection[],
    items: [] as Item[],

    getCollectionById(id: string): Collection | undefined {
        return this.collections.find(collection => collection.id === id)
    },

    getItemById(id: string): Item | undefined {
        return this.items.find(item => item.id === id)
    },

    setCollections(collections: Collection[]) {
        this.collections = collections
    },

    setItems(items: Item[]) {
        this.items = items
    }

})