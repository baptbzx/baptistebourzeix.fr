import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export default function Button({children, ...props}) {
    const ref = useRef()
    const sphere = useRef()
    const { width } = useThree((state) => state.viewport)
    const [hovered, hover] = useState(false)
    const vec = new THREE.Vector3
    useCursor(hovered)
    
    useFrame((state, dt) => {
        
        //console.log('sphere', new THREE.Vector3(state.mouse.x / 2, state.mouse.y / 2, 10))
        
        easing.damp3(sphere.current.scale, [1 * (hovered ? 1 : 0), 1 * (hovered ? 1 : 0), 1 * (hovered ? 1 : 0)], 0.1, dt)
        //vec.set((state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0)
        sphere.current.position.setX((state.pointer.x * state.viewport.width) / 2)
        sphere.current.position.setY(((state.pointer.y * state.viewport.height) / 2) -0.9)
        sphere.current.position.setZ(-6)
      })
      useEffect(() => void (document.body.style.cursor = hovered ? `none` : `auto`), [
        hovered
      ])
    return (
        <group 
            ref={ref} 
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
        >
            <mesh ref={sphere}>
                <sphereGeometry 
                    attach="geometry"
                    args={[.2, 6, 6]} 
                />
                <meshPhysicalMaterial 
                    attach="material" 
                    metalness={0} 
                    roughness={0.1} 
                    wireframe={true} 
                />
            </mesh>
            <Text 
                position={[-0.03, -1.9, -5]}
                transform 
                lineHeight={1}
                font="/AHAMONO-Regular.ttf"
                fontSize={width / 44}
                material-toneMapped={true}
            >
                {children}
            </Text>
        </group>
    )
}