import React, { useEffect } from 'react';
import Layout from "../components/layout";
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        document.body.className = 'p-8 bg-white';
    });

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
