import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-1/2 pl-12">
        <p className="block uppercase w-2/3 font-light">Hi, I'm Baptiste, an independant <span className="italic capitalize">front-end developer</span> focusing on <span className="italic lowercase">interaction</span> and <span className="italic lowercase">animations</span>. I'm based in Strasbourg (FR) but working remotely worldwide.</p>
        <Link className="mt-6 inline-block" href="/about">Info</Link>
    </div>
  )
}
