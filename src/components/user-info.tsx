import { User } from "@/user/user";
import { fetchUpdateName, loadUser } from "@/user/user-client";
import { UseState } from "@/util/util";
import React, { ReactNode, useState } from "react";
import { FormButton, FormText } from "./form-button";

export default function UserInfo(): JSX.Element {
    const [user, setUser]: UseState<User> = useState(null);
    const [loading, setLoading]: UseState<boolean> = useState(true);
    const [name, setName]: UseState<string> = React.useState("");

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

    const handleSaveName = () => {
        fetchUpdateName(name);
    };

    const changeNameButton: ReactNode = (
        <FormButton buttonText="Change Name" handleSave={handleSaveName}>
            <FormText label="Name" onChange={(event) => setName(event.target.value)} />
        </FormButton>
    );

    return (
        <div>
            <p>User: {JSON.stringify(user)}</p>
            {changeNameButton}
        </div>
    );
}
