import { Button } from "@material-ui/core";
import { signOut } from "next-auth/client";
import React from "react";

export default function LogoutButton(): JSX.Element {
    return (
        <Button onClick={() => signOut()} variant="outlined" color="secondary">
            Logout
        </Button>
    );
}
