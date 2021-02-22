import { fetchUrl } from "@/lib/fetcher";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";

export type AuthUser = {
    // Both
    email: string;
    email_verified: boolean;
    nickname?: string;
    name?: string;
    picture?: string;
    updated_at?: string;
    sub?: string;

    // Google only
    given_name?: string;
    family_name?: string;
    locale?: string;
};

export type UserData = {
    name?: string;
};

export type UserRow = {
    id: number;
    email: string;
    data: UserData;
};

export type User = {
    authUser: AuthUser;
    userRow: UserRow;
};

export async function loadUser(): Promise<User> {
    const authUser: AuthUser = getAuthUser();
    const email: string = authUser.email;
    const url: string = `/api/get-user?email=${email}`;

    let userRow: UserRow;

    const fetched = await fetchUrl(url);
    if (!fetched) {
        userRow = await addUser(email);
    } else if (!Array.isArray(fetched)) {
        throw Error("Unexpected data type for loadUser response:" + fetched);
    } else if (fetched.length != 1) {
        throw Error("Too many users found????");
    } else {
        userRow = fetched[0];
    }

    const user: User = {
        authUser: authUser,
        userRow: userRow,
    };
    return user;
}

async function addUser(email: string): Promise<UserRow> {
    console.log("Adding user: ", email);
    const fetched = await fetchUrl(`/api/add-user?email=${email}`);
    if (!fetched) {
        throw Error("Empty response from /add-user.");
    }

    const insertId = fetched["insertId"];
    if (!Number.isInteger(insertId)) {
        throw Error("Unknown response from /add-user: " + JSON.stringify(fetched));
    }

    return {
        id: insertId,
        email: email,
        data: {},
    };
}

export function getAuthUser(): AuthUser {
    const ctx: Auth0ContextInterface = useAuth0();
    const user: AuthUser = ctx.user as AuthUser;
    return user || null;
}
