import styles from "@/styles/add.module.css";
import { BottomNavigation, BottomNavigationAction, BottomNavigationActionProps } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import TodayIcon from "@material-ui/icons/Today";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";

function getTabValue(link: string): string {
    if (link.startsWith("/")) {
        link = link.substring(1);
    }
    return link == "" ? "add" : link;
}

export default function BottomNav(): JSX.Element {
    const router = useRouter();
    const [value, setValue] = useState(getTabValue(router.route));

    function createTab(link: string, icon: ReactNode): ReactNode {
        const props: BottomNavigationActionProps = {
            value: getTabValue(link),
            icon: icon,
            onClick: (e) => {
                e.preventDefault();
                router.push("/" + link);
            },
        };

        return <BottomNavigationAction key={props.value} onClick={props.onClick} {...props} />;
    }

    const tabs: ReactNode[] = [
        createTab("calendar", <TodayIcon />),
        createTab("", <AddIcon />),
        createTab("settings", <SettingsIcon />),
    ];

    const handleChange = (_event, newValue) => setValue(newValue);

    return (
        <BottomNavigation className={styles.navbar} value={value} onChange={handleChange}>
            {tabs}
        </BottomNavigation>
    );
}
