// Simple cache that is just a map in memory
type Key = string | number;
export class CacheService<T> {
    private cache: Map<Key, T>;

    constructor() {
        this.cache = new Map();
    }

    public has(key: Key): boolean {
        return this.cache.has(key);
    }

    public get(key: Key): T {
        return this.cache.get(key);
    }

    public set(key: Key, value: T): T {
        this.cache.set(key, value);
        return value;
    }

    public del(...keys: Key[]): void {
        for (let key of keys) {
            this.cache.delete(key);
        }
    }

    public flush() {
        this.cache.clear();
    }
}
