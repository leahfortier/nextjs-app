import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import React from "react";

type User = {
    // Both
    nickname?: string;
    name?: string;
    picture?: string;
    updated_at?: string;
    email?: string;
    email_verified?: boolean;
    sub?: string;

    // Google only
    given_name?: string;
    family_name?: string;
    locale?: string;
};

export default function UserInfo(): JSX.Element {
    const ctx: Auth0ContextInterface = useAuth0();
    const user: User = ctx.user as User;

    if (!user) {
        return null;
    }

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>{JSON.stringify(user)}</p>
        </div>
    );
}
