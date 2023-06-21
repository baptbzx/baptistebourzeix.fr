import { Logo } from '../components/Logo'
import Link from 'next/link'

export default function Header() {
    return (
        <h1 className={"absolute z-10 top-0 left-0 p-10 flex items-center justify-between w-full"}>
            <Link href="/">
                <Logo className={"max-h-35"} />
            </Link>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Status:
                <code className="font-mono font-bold ml-2">available</code>
            </p>
        </h1>
    )
}
