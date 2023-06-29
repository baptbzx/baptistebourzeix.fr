import Caption from '../components/caption';
import Button from '@/components/button';

export default function Home() {
  return (
    <group>
      <Caption>{`I'm a front-end\nweb developer\nbased in\nStrasbourg, France`}</Caption>
      <Button>about me</Button>
    </group>  
  )
}
