import { fetchUrl } from "@/lib/fetcher";
import { getSession, Session } from "next-auth/client";
import { User, UserRow } from "./user";

let current: User = undefined;

export async function loadUser(): Promise<User> {
    const session: Session = await getSession();
    if (current && current.session.user.email == session.user.email) {
        current.session = session;
        return current;
    }

    const userRow: UserRow = await fetchGetUser();
    current = {
        session: session,
        userRow: userRow,
    };

    return current;
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
    current = undefined;
    await fetchUrl(`/api/update-name?name=${name}`);
}
