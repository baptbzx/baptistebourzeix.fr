import React, { useEffect } from 'react';
import Layout from "../components/layout";
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        document.body.className = 'bg-white p-6';
    });

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
