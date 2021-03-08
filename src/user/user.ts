import CacheService from "@/lib/cache";
import { fetchUrl } from "@/lib/fetcher";
import { Password } from "@/util/auth";
import { getSession, Session } from "next-auth/client";

export type UserData = {
    name?: string;
    password: Password;
};

export type UserRow = {
    id: number;
    email: string;
    data: UserData;
};

export type User = {
    session: Session;
    userRow: UserRow;
};

export async function loadUser(): Promise<User> {
    const session: Session = await getSession();
    const email: string = session.user.email;
    const key: string = CacheService.createKey("get-user", email);

    const cached: string = await CacheService.get(key, async () => {
        const userRow: UserRow = await fetchUserRow();
        const user: User = {
            session: session,
            userRow: userRow,
        };
        return JSON.stringify(user);
    });

    return JSON.parse(cached);
}

async function fetchUserRow(): Promise<UserRow> {
    const fetched = await fetchUrl(`/api/get-user`);
    if (!fetched) {
        throw Error("No data found for current user.");
    } else {
        return fetched;
    }
}
