import { ref, onUnmounted } from 'vue';

export function useIndexedDB(dbName: string, storeName: string) {
  const db = ref<IDBDatabase | null>(null);
  const isReady = ref(false);

  const openDB = () => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = () => {
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

  const addLog = (logData: Record<string, unknown>) => {
    const database = db.value;
    if (!database) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const request = store.add(logData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  const getAllLogs = () => {
    const database = db.value;
    if (!database) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<unknown[]>((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);

      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const clearLogs = () => {
    const database = db.value;
    if (!database) {
      console.error('Database is not initialized.');
      return Promise.reject('Database is not initialized.');
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  openDB();

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
