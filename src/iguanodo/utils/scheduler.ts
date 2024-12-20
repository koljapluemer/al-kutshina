import type { Exercise } from "../../data/exercises";
import { pickRandom } from "../../utils/arrayUtils";
import type { Collection } from "../types/Collection";

export class Scheduler {

    public static getAnyExerciseFromCollection(collection: Collection): (Exercise | undefined) {
        return pickRandom(collection.exercises)
    }
}