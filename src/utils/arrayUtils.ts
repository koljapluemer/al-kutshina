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

export const pickRandomN = <T>(array: T[], n: number): T[] => {
  if (!array.length || n <= 0) return [];
  if (n >= array.length) return [...array].sort(() => Math.random() - 0.5);

  const result: T[] = [];
  const usedIndices = new Set<number>();

  while (result.length < n) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex);
          const item = array[randomIndex];
          if (item !== undefined) {
              result.push(item);
          }
      }
  }

  return result;
};


export function getGridDimensions<T>(grid: T[][]): { rows: number; cols: number } {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;
    return { rows, cols };
}


// Fisher-Yates shuffle function to shuffle the array
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      const swapVal = array[j];
      if (temp !== undefined && swapVal !== undefined) {
          array[i] = swapVal;
          array[j] = temp;
      }
    }
    return array;
  }
