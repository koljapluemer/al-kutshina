import type { Exercise } from "../../../data/exercises";
import { pickRandom } from "../../../utils/arrayUtils";
import type { Collection } from "../Collection";

export class CollectionHelper {
    public static getRandomExerciseFromCollection(collection:Collection):Exercise | undefined {
        return pickRandom(collection.exercises)
    }
}