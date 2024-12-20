import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useCellSize(horizontalCells: number, verticalCells: number) {
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);

  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
  });

  const cellSize = computed(() => {
    let size = 300; // Default size
    const maxWidth = (screenWidth.value / horizontalCells) * 0.85;
    const maxHeight = (screenHeight.value / verticalCells) - 170 * 0.7;

    size = Math.min(size, maxWidth, maxHeight);
    return `${size}px`;
  });

  return {
    cellSize,
  };
}
