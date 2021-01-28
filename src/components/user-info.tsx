import { UseState } from "@/util/util";
import React, { useState } from "react";
import { loadUser, User } from "src/user/user";

export default function UserInfo(): JSX.Element {
    const [user, setUser]: UseState<User> = useState(null);
    const [loading, setLoading]: UseState<boolean> = useState(true);

    if (loading) {
        loadUser()
            .then((result) => {
                setUser(result);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    } else if (!user) {
        return null;
    }

    return (
        <div>
            <p>Name: {user.authUser.name}</p>
            <p>{JSON.stringify(user)}</p>
        </div>
    );
}
