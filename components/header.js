import { Logo } from '../components/logo'
import Link from 'next/link'

export default function Header() {
    return (
        <h1 className={"absolute z-10 top-0 left-0 p-10 flex items-center justify-between"}>
            <Link href="/">
                <Logo className={"max-h-35"} />
            </Link>
        </h1>
    )
}
