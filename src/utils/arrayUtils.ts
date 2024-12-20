/**
 * Picks a random element from an array.
 * @param array The array to pick from.
 * @returns A random element from the array, or undefined if the array is empty.
 */
export const pickRandom = <T>(array: T[]): T | undefined => {
    if (!array.length) return undefined;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};