import BottomNav from "@/components/bottom-nav";
import styles from "@/styles/add.module.css";
import { Box, Grid } from "@material-ui/core";
import { ServerStyleSheets } from "@material-ui/core/styles";
import Head from "next/head";
import React from "react";

const sheets = new ServerStyleSheets();
const cssString = sheets.toString();
const siteTitle = "Doggy Town??";

export default function Layout({ children }): JSX.Element {
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
                <Box className={styles.box}>{children}</Box>
                <BottomNav />
            </Grid>
        </div>
    );
}
