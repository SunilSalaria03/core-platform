// SSR safe check
const isBrowser = (): boolean => typeof window !== "undefined";

// Get value from localStorage
export function getFromStorage<T = string>(key: string): T | null {
  if (!isBrowser()) return null;

  const value = localStorage.getItem(key);
  if (value === null) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
}

// Set value in localStorage
export function setToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;

  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Remove value from localStorage
export function removeFromStorage(key: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

// Clear all storage
export function clearStorage(): void {
  if (!isBrowser()) return;
  localStorage.clear();
}
