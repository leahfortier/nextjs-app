import BottomNav from "@/components/bottom-nav";
import styles from "@/styles/add.module.css";
import { Box, Grid } from "@material-ui/core";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { Session, useSession } from "next-auth/client";
import Head from "next/head";
import React, { ReactNode } from "react";
import LoginButton from "./login-button";

const sheets = new ServerStyleSheets();
const cssString = sheets.toString();
const siteTitle = "Doggy Town??";

export default function Layout({ children }): JSX.Element {
    const [session, loading]: [Session, boolean] = useSession();

    let body: ReactNode;
    if (loading) {
        body = <div>Loading...</div>;
    } else if (!session) {
        body = <LoginButton />;
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
