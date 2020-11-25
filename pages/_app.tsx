import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactNode } from 'react'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps): ReactNode {
    return <Component {...pageProps} />
}
