import LogoutButton from "@/components/logout-button";
import UserInfo from "@/components/user-info";
import React from "react";
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
