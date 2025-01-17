import rawObjects from '../data/admin/objects.json';

// probably going nowhere
// anyways, the idea of this class was to support "boxes" (aka topics, tags) from the iguanodo idea
// so that boxes can get listed, and user can practice a specific box, like "kitchen" or "packing things"
export class BoxesHelper {
    static getBoxes(): string[] {
        // an object in objects.json may have an boxes: str[] property
        // this returns all unique box names
        const boxes = new Set<string>();
        Object.values(rawObjects).forEach((object: any) => {
            if (object.boxes) {
                object.boxes.forEach((box: string) => boxes.add(box));
            }
        }
        );

        return Array.from(boxes);
    }
}