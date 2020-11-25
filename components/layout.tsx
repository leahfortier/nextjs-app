import classNames from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren, ReactNode } from 'react'
import utilStyles from '../styles/utils.module.css'
import styles from './layout.module.css'

const name = 'Pakks and Kirbs!'
export const siteTitle = 'Doggy Town!!'

// Same image but different style depending on if on the homepage or not
function getHeaderImage(home: boolean): ReactNode {
    const circleStyle = home ? styles.headerHomeImage : styles.headerImage
    return <img
        src="/images/profile.jpg"
        className={classNames(circleStyle, utilStyles.borderCircle)}
        alt={name}
    />
}

function getHeader(home: boolean): ReactNode {
    const img: ReactNode = getHeaderImage(home)

    // Larger image and name on homepage
    if (home) {
        return <>
            {img}
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
    }

    // Other pages will link back to the homepage from the header
    return <>
        <Link href="/"><a>{img}</a></Link>
        <h2 className={utilStyles.headingLg}>
            <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
        </h2>
    </>
}

type LayoutProps = { home?: boolean }
export default function Layout({ home, children }: PropsWithChildren<LayoutProps>): JSX.Element {
    const header: ReactNode = getHeader(home)

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="A cute place to look at cute pups" />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>{header}</header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
