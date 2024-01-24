import Layout from '../components/layout'
import Caption from '../components/caption'
import Button from '@/components/button';

export default function Home({children, ...props}) {
  return (
      <Layout>
          <Caption>
              {` Hi, I'm Baptiste,\n an independant front-end developer \n I'm based in Strasbourg (FR) \n but working remotely worldwide.`}
          </Caption>
          <Button>About me</Button>
      </Layout>
  )
}
