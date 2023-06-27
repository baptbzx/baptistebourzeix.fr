import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import css from '../styles/Home.module.css'
import Box from '../components/shapes/box';
import Cone from '../components/shapes/cone';
import Sphere from '../components/shapes/sphere';
import LightBulb from '../components/light';
import Caption from '../components/caption';
import Background from '@/components/background';
import Coffee from '@/components/shapes/coffee';
import KeyCap from '@/components/shapes/keycap';
import Button from '@/components/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={css.scene}>
          <Canvas
              shadows
              className={css.canvas}
              dpr={[1, 2]} 
              camera={{ position: [0, 0, 10], fov: 22 }}
          >
            <ambientLight color={"#FFFFFF"} intensity={0.1} />
            <LightBulb position={[0, 4, 0]} />
            <LightBulb position={[0, 4, -10]} />
            <Background />
              <Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone />
              <Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere />
              <Caption>{`I'm a front-end\nweb developer\nbased in\nStrasbourg, France`}</Caption>
              <Button>about me</Button>
              <Rig />
              <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
              <Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee />
              <KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap />
          </Canvas>
      </div>
    </main>
  )
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}
