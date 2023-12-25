import { Logo } from '../components/logo'
import Link from 'next/link'

export default function Header() {
    return (
        <h1 className={"absolute z-10 top-6 left-6 p-10 flex items-center justify-between"}>
            <Link href="/">
                <Logo className="max-h-28" />
            </Link>
        </h1>
    )
}
