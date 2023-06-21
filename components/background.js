import * as THREE from 'three'
import { LayerMaterial, Depth, Noise } from 'lamina'

export default function Background() {
    return (
      <mesh scale={100}>
        <boxGeometry args={[1, 1, 1]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth colorB="blue" colorA="black" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
          <Noise mapping="local" type="white" scale={1000} colorA="black" colorB="black" mode="darken" alpha={0.75} />
        </LayerMaterial>
      </mesh>
    )
}
