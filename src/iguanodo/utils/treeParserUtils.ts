import { exercises, type Exercise } from "../../data/exercises";
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
}