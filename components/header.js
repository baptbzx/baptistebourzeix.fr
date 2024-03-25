import { useEffect, useRef, useState } from 'react'
import { Logo } from '../components/logo'
import Link from 'next/link'
import Scramble from 'react-scramble'

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full flex justify-between z-10 p-10 items-center">
            <h1 className={"flex items-center justify-between"}>
                <Link href="/">
                    <Logo className="max-h-28" />
                </Link>
            </h1>
            <div className="flex flex-col">
                <Link 
                    className="inline-flex items-center border border-white text-white text-xl font-medium px-5 py-1 rounded-full text-center overflow-hidden" 
                    href="/contact"
                >
                    <Scramble 
                        autoStart 
                        text='Contact me'
                        speed="slow"
                        steps={[
                            {
                            roll: 10,
                            text: 'Contact me',
                            },
                            {
                            roll: 10,
                            type: 'random',
                            action: '+',
                            },
                            { roll: 5 },
                            {
                            roll: 3,
                            type: 'random',
                            action: '-',
                            },
                            { roll: 5 },
                            {
                            roll: 5,
                            type: 'random',
                            action: '+',
                            },
                            { roll: 5 },
                            {
                            roll: 20,
                            type: 'random',
                            action: '-',
                            },
                        ]}
                    />
                </Link>
            </div>
        </header>
    )
}
