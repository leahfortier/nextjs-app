import BottomNav from "@/components/bottom-nav";
import styles from "@/styles/add.module.css";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { Box, Grid } from "@material-ui/core";
import { ServerStyleSheets } from "@material-ui/core/styles";
import Head from "next/head";
import React, { ReactNode } from "react";
import LoginButton from "./login-button";

const sheets = new ServerStyleSheets();
const cssString = sheets.toString();
const siteTitle = "Doggy Town??";

export default function Layout({ children }): JSX.Element {
    const { isLoading, isAuthenticated, error, user }: Auth0ContextInterface = useAuth0();

    let body: ReactNode;
    if (isLoading) {
        body = <div>Loading...</div>;
    } else if (!isAuthenticated && !user) {
        body = <LoginButton />;
    } else if (!isAuthenticated || error) {
        body = <div>Oh no!! Error: {error}</div>;
    } else {
        body = children;
    }

    return (
        <div className={styles.layout}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="A cute place to look at cute pups" />
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
                <style id="jss-server-side">{cssString}</style>
            </Head>
            <Grid>
                <Box className={styles.box}>{body}</Box>
                <BottomNav />
            </Grid>
        </div>
    );
}
