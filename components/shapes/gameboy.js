import * as THREE from 'three'
import { useState, useMemo, useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import { LayerMaterial, Base, Depth, Fresnel, Noise } from 'lamina/vanilla'

useGLTF.preload('/fck_off_keycap.glb')

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Gameboy (...props) {
    const { viewport, camera } = useThree()
    const { nodes } = useGLTF('/gameboy.glb')
    console.log('nodes', nodes)
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
      }, [viewport])
    const material = new THREE.MeshPhysicalMaterial({metalness:0.9, roughness:0.25, wireframe:false})
      return (
        <Float position={[0,0,-15]} speed={speed} rotationIntensity={0} floatIntensity={0} dispose={null}>
            <group dispose={null}>
                <group scale={0.5}>
                    <mesh geometry={nodes.Box_low.children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Button_low.children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[0].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[1].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[2].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[3].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[4].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[5].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[6].children[0].geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.game_low.children[7].geometry} material={material} receiveShadow castShadow />
                </group>
            </group>
        </Float>
      )
}

export default Gameboy;
