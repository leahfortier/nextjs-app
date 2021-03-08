import { Button } from "@material-ui/core";
import { signIn } from "next-auth/client";
import React from "react";

export default function LoginButton(): JSX.Element {
    return (
        <Button onClick={() => signIn()} variant="outlined" color="secondary">
            Login
        </Button>
    );
}
