export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "QuotaExceededError") {
        console.error("Storage quota exceeded");
      } else {
        console.error(`Error writing ${key} to storage:`, error);
      }
      return false;
    }
  },

  remove(key: string): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  },
};

export const STORAGE_KEYS = {
  CHECK_INS: "checkIns",
  JOURNAL_ENTRIES: "journalEntries",
  LAST_CHECK_IN: "lastCheckInTime",
} as const;
