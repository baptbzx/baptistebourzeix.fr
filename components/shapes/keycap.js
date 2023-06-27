import * as THREE from 'three'
import { useState, useMemo, useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import { LayerMaterial, Base, Depth, Fresnel, Noise } from 'lamina/vanilla'

useGLTF.preload('/fck_off_keycap.glb')

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function KeyCap (...props) {
    const { viewport, camera } = useThree()
    const { nodes } = useGLTF('/fck_off_keycap.glb')
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
      }, [viewport])
    const material = new THREE.MeshPhysicalMaterial({metalness:0.9, roughness:0.25, wireframe:false})
      return (
        <Float position={position} speed={speed} rotationIntensity={randomIntFromInterval(10,100)} floatIntensity={randomIntFromInterval(30,100)} dispose={null}>
            <group dispose={null}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={25}>
                    <mesh geometry={nodes.Object_4.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_6.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_8.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_10.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_12.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_14.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_16.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_18.geometry} material={material} receiveShadow castShadow />
                    <mesh geometry={nodes.Object_19.geometry} material={material} receiveShadow castShadow />
                </group>
            </group>
        </Float>
      )
}

export default KeyCap;
