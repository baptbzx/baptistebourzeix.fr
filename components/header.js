import { Logo } from '../components/logo'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full flex justify-between z-10 p-10 items-center">
            <h1 className={"flex items-center justify-between"}>
                <Link href="/">
                    <Logo className="max-h-28" />
                </Link>
            </h1>
            <div className="flex flex-col">
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mb-2">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Available
                </span>
                <Link className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 text-center" href="/contact">
                    Contact Me
                </Link>
            </div>
        </header>
    )
}
