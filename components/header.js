import { Logo } from '../components/Logo'
import Link from 'next/link'

export default function Header() {
    return (
        <h1 className={"flex items-center justify-start"}>
            <Link href="/">
                <Logo className={"max-h-35"} />
            </Link>
        </h1>
    )
}
