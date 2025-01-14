import { watch, ref, type Ref } from "vue";


export function useLocalStorage<T>(key: string, defaultValue: T) {
    // Initialize the state from localStorage or use the default value
    const storedValue = localStorage.getItem(key);
    const val: Ref<T> = ref(storedValue ? JSON.parse(storedValue) : defaultValue) as Ref<T>;
    // Watch the topicLearningData and update localStorage when it changes
    watch(
        val,
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        },
        { deep: true } // Ensures nested objects are tracked
    );


    return { val: val };
}
