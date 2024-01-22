import Caption from '../components/caption'


export default function Home({children, ...props}) {
  return (
      <Caption>
          {` Hi, I'm Baptiste,\n an independant front-end developer \n I'm based in Strasbourg (FR) \n but working remotely worldwide.`}
      </Caption>
  )
}


/*<div className="w-128">
    <p className="block uppercase text-[1.5vw] font-light">Hi, I'm Baptiste, an independant <span className="italic capitalize">front-end developer</span> focusing on <span className="italic lowercase">interaction</span> and <span className="italic lowercase">animations</span>. I'm based in Strasbourg (FR) but working remotely worldwide.</p>
</div>*/
