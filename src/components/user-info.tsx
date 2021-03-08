import { loadUser, User } from "@/user/user";
import { UseState } from "@/util/util";
import React, { useState } from "react";

export default function UserInfo(): JSX.Element {
    const [user, setUser]: UseState<User> = useState(null);
    const [loading, setLoading]: UseState<boolean> = useState(true);

    if (loading) {
        loadUser()
            .then((result: User) => {
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
            <p>User: {JSON.stringify(user)}</p>
        </div>
    );
}
