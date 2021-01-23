import styles from "@/styles/add.module.css";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import React from "react";

export default function LogoutButton(): JSX.Element {
    const { logout }: Auth0ContextInterface = useAuth0();
    const onClick = () => logout();
    return (
        <Button onClick={onClick} variant="outlined" color="secondary">
            Logout
        </Button>
    );
}
