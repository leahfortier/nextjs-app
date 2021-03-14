import { fetchUrl } from "@/lib/fetcher";
import { getSession, Session } from "next-auth/client";
import { UserRow } from "./user";

let current: UserRow = undefined;

export async function loadUser(): Promise<UserRow> {
    const session: Session = await getSession();
    if (current && current.email == session.user.email) {
        return current;
    }

    current = await fetchGetUser();
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
    if (name) {
        await fetchUrl(`/api/update-name?name=${name}`);
    }
}
