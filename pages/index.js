import Layout from '../components/layout'
import Caption from '../components/caption'
import Button from '@/components/button';
import Header from "@/components/header"


export default function Home({children, ...props}) {
  return (
      <>
          <Header/>
          <Layout>
              <Caption>
                  {` Hi, I'm Baptiste,\n an independant front-end developer \n I'm based in Strasbourg (FR) \n but working remotely worldwide.`}
              </Caption>
              <Button>About me</Button>
          </Layout>
      </>
  )
}
