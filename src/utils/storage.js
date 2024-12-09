const CACHE_EXPIRATION = 1000 * 60 * 10; // Cache expiration time (10 minutes)

/**
 * Saves data to local storage with a timestamp.
 * @param {string} key - The key to store the data under.
 * @param {any} value - The data to store.
 */
export const saveToStorage = (key, value) => {
    const data = {
        value,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Retrieves data from local storage and checks for expiration.
 * @param {string} key - The key to retrieve the data from.
 * @returns {any|null} - The stored data or null if expired or not found.
 */
export const getFromStorage = (key) => {
    const storedData = localStorage.getItem(key);

    if (!storedData) return null;

    const { value, timestamp } = JSON.parse(storedData);

    // Check if the cached data has expired
    if (Date.now() - timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(key); // Remove expired cache
        return null;
    }

    return value;
};

/**
 * Clears specific key from local storage.
 * @param {string} key - The key to clear from storage.
 */
export const clearFromStorage = (key) => {
    localStorage.removeItem(key);
};

/**
 * Clears all keys related to a specific prefix from local storage.
 * @param {string} prefix - The prefix to clear keys for.
 */
export const clearAllWithPrefix = (prefix) => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
        }
    });
};
