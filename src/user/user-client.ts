import CacheService from "@/lib/cache";
import { fetchUrl } from "@/lib/fetcher";
import { getSession, Session } from "next-auth/client";
import { User, UserRow } from "./user";

export async function loadUser(): Promise<User> {
    const session: Session = await getSession();
    const email: string = session.user.email;
    const key: string = CacheService.createKey("get-user", email);

    const cached: string = await CacheService.get(key, async () => {
        const userRow: UserRow = await fetchGetUser();
        const user: User = {
            session: session,
            userRow: userRow,
        };
        return JSON.stringify(user);
    });

    return JSON.parse(cached);
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
