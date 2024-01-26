import React, {useEffect} from 'react';
import {useRouter} from 'next/router'
import {motion, AnimatePresence} from 'framer-motion';
import '../styles/globals.css';

export default function MyApp({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        document.body.className = 'bg-white font-ahamono';
    });

    return (
        <AnimatePresence mode="wait">
            <div key={router.pathname}>
                <Component {...pageProps} />
            </div>
        </AnimatePresence>
    )
}
