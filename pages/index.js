import { Canvas } from '@react-three/fiber'
import css from '../styles/Home.module.css'
import Floor from '../components/floor';
import Box from '../components/box';
import LightBulb from '../components/light';
import Noise from '../components/noise';
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={css.scene}>
          <Canvas
              shadows
              className={css.canvas}
              camera={{
                  position: [-6, 0, 0],
              }}
          >
            <ambientLight color={"#FFFFFF"} intensity={1} />
            <LightBulb position={[0, 4, 0]} />
            <Box />
            <Noise />
            <Floor position={[0, -4, 0]} />
            <PerspectiveCamera makeDefault fov={95} position={[0, 1, 6]} />
          </Canvas>
      </div>
    </main>
  )
}
