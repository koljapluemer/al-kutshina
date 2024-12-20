import { reactive, ref } from "vue";
import type { Collection } from "../iguanodo/types/Collection";

export const gameDataStore = reactive({
    collections: [] as Collection[],

    setCollections(collections: Collection[]) {
        this.collections = collections
    },

    getCollectionById(id: string): Collection | undefined {
        console.info('finding id', this.collections.find(collection => collection.id === id))
        return this.collections.find(collection => collection.id === id)
    }
})