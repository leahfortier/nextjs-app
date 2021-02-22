// Simple cache that is just a map in memory
class Cache {
    private cache: Map<string, string>;

    constructor() {
        this.cache = new Map();
    }

    public async get(key: string, storeFunction: () => Promise<string>): Promise<string> {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        return await storeFunction().then((result: string) => {
            this.cache.set(key, result);
            return result;
        });
    }

    public del(...keys: string[]): void {
        for (let key of keys) {
            this.cache.delete(key);
        }
    }

    public delPrefix(prefix: string): void {
        if (!prefix) {
            return;
        }

        prefix = this.getPrefix(prefix);
        for (const key in this.cache.keys()) {
            if (key.startsWith(prefix)) {
                this.del(key);
            }
        }
    }

    public flush() {
        this.cache.clear();
    }

    // Ex: "get-user", "username123", "user@email.com" -> __get-user__~username123~user@email.com
    public createKey(prefix: string, ...ids: string[]): string {
        ids.unshift(this.getPrefix(prefix));
        return ids.join("~");
    }

    private getPrefix(prefix: string): string {
        return "__" + prefix + "__";
    }
}

const CacheService = new Cache();
export default CacheService;
