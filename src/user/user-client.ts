import { CacheService } from "@/lib/cache";
import { fetchUrl } from "@/lib/fetcher";
import { getSession, Session } from "next-auth/client";
import { User, UserRow } from "./user";

// TODO: This makes no sense it should just be the current user instead of a cache
// Email -> User cache to prevent unnecessary api calls
const cache: CacheService<User> = new CacheService();

export async function loadUser(): Promise<User> {
    const session: Session = await getSession();
    const email: string = session.user.email;
    if (cache.has(email)) {
        return cache.get(email);
    }

    const userRow: UserRow = await fetchGetUser();
    return {
        session: session,
        userRow: userRow,
    };
}

async function fetchGetUser(): Promise<UserRow> {
    const fetched = await fetchUrl(`/api/get-user`);
    if (!fetched) {
        throw Error("No data found for current user.");
    } else {
        return fetched;
    }
}

export async function fetchUpdateName(name: string): Promise<void> {
    await fetchUrl(`/api/update-name?name=${name}`);
}
