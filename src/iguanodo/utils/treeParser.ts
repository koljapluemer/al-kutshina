import { exercises, type Exercise } from "../../data/exercises";
import { items, type Item } from "../../data/items";
import type { Collection } from "../types/Collection";

export class IguanodoTreeParser {


    public static getCollectionsFromJSON():Collection[] {
        // TODO: pass the JSON in, so it does not depend on side effects
        const collectionIdsFromExercises:string[] = [
            ...new Set(exercises.flatMap(exercise => exercise.collections))
        ]
        // may add collections to this from other sources later on, this is why we're splitting it
        const collections:Collection[]  = collectionIdsFromExercises.map(
            id => ({
                id: id,
                exercises: []
            })
        )
        // add exercises from file to the collections array
        exercises.forEach(exercise => {
            exercise.collections.forEach((exerciseCollection) => {
                const relevantCollection = collections.find(c => c.id === exerciseCollection)
                if (relevantCollection) {
                    relevantCollection.exercises.push(exercise)
                }
            })
        })

        return collections
    }

    // this one if probably not going to be abstractable in the general library,
    // items are a pretty "only tpr-game-vue" kinda thing
    public static getItemsFromJSON():Item[] {
        // ...it's also a somewhat silly function, with items still being perfectly adapted to
        // this game, not represented as abstract learning cards or anything...
        return items
    }
}