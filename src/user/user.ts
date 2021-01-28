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
    const auth_user: AuthUser = getAuthUser();
    const email: string = auth_user.email;

    let res = await fetch(`/api/get-user?email=${email}`);
    let json = await res.json();
    if (!res.ok) {
        throw Error(json.message);
    } else if (!json || json.length == 0) {
        addUser(email);
        return loadUser();
    } else if (json.length > 1) {
        throw Error("Too many users found????");
    } else {
        console.log("User found!!!!");
        return {
            authUser: auth_user,
            userRow: json[0] as UserRow,
        };
    }
}

async function addUser(email: string) {
    let res = await fetch(`/api/add-user?email=${email}`);
    let json = await res.json();
    console.log("addUser RES: " + JSON.stringify(json));
    if (!res.ok) {
        throw Error(json.message);
    }
}

export function getAuthUser(): AuthUser {
    const ctx: Auth0ContextInterface = useAuth0();
    const user: AuthUser = ctx.user as AuthUser;
    return user || null;
}
