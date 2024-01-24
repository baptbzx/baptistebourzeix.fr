import * as THREE from 'three'
import { useState, useMemo } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRouter } from 'next/router'

useGLTF.preload('/bialetti_moka_express.glb')

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Coffee () {
    const router = useRouter()
    const isAbout = router.pathname === '/about'
    const colorMap = isAbout ? useLoader(TextureLoader, '/profile.jpg') : ''
    const { viewport, camera } = useThree()
    const { nodes } = useGLTF('/bialetti_moka_express.glb')
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
      }, [viewport])
    const material = new THREE.MeshPhysicalMaterial({metalness:isAbout ? 0 : 0.9, roughness:0.25, wireframe:false, map:colorMap})
      return (
        <Float position={position} speed={speed} rotationIntensity={randomIntFromInterval(10,100)} floatIntensity={randomIntFromInterval(30,100)} dispose={null}>
            <group dispose={null}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
                    <mesh geometry={nodes.SM_KettleLid_M_Kettle_0.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.SM_Kettle_M_Kettle_0.geometry} material={material} receiveShadow castShadow />
                </group>
            </group>
        </Float>
      )
}

export default Coffee;
