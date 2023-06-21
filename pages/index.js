import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import css from '../styles/Home.module.css'
import Floor from '../components/floor';
import Box from '../components/box';
import Cone from '../components/cone';
import Sphere from '../components/sphere';
import LightBulb from '../components/light';
import Caption from '../components/caption';
import Background from '@/components/background';
import { OrbitControls, PerspectiveCamera, View as ViewImpl, useGLTF, Float } from '@react-three/drei'

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
            <LightBulb position={[0, 7, 0]} />
            <Background />
          
              <Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone />
              <Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere />
              <Caption>{`I'm a front-end\nweb developer\nbased in\nStrasbourg, France`}</Caption>
              <Rig />
              <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
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
