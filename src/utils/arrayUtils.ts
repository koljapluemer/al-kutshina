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

export function getGridDimensions<T>(grid: T[][]): { rows: number; cols: number } {
    const rows = grid.length;
    const cols = grid[0]?.length || 0; // Fallback to 0 if no columns exist
    return { rows, cols };
  }
  