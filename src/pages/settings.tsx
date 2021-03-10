import { FormButton, FormText } from "@/components/form-button";
import LogoutButton from "@/components/logout-button";
import UserInfo from "@/components/user-info";
import styles from "@/styles/add.module.css";
import { fetchUpdateName } from "@/user/user";
import { UseState } from "@/util/util";
import { Button } from "@material-ui/core";
import React, { ReactNode } from "react";
import Layout from "src/components/layout";

export default function Settings() {
    return (
        <Layout>
            <p>(SETTING?S?S??S??)</p>
            <UserInfo />
            <LogoutButton />
        </Layout>
    );
}
