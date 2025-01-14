import { ref, onUnmounted } from 'vue';

export function useIndexedDB(dbName: string, storeName: string) {
  const db = ref<IDBDatabase | null>(null);
  const isReady = ref(false);

  // Open or create the database
  const openDB = () => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = (_event) => {
        const database = request.result;
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = () => {
        db.value = request.result;
        isReady.value = true;
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
    });
  };

  // Add an entry to the store
  const addLog = (logData: any) => {
    if (!db.value) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = db.value.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const request = store.add(logData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  // Retrieve all entries from the store
  const getAllLogs = () => {
    if (!db.value) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<any[]>((resolve, reject) => {
      const transaction = db.value.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);

      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  // Clear all entries in the store
  const clearLogs = () => {
    if (!db.value) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = db.value.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  // Initialize the database when the composable is used
  openDB();

  // Close the database when the component is unmounted
  onUnmounted(() => {
    if (db.value) {
      db.value.close();
    }
  });

  return {
    isReady,
    addLog,
    getAllLogs,
    clearLogs,
  };
}
