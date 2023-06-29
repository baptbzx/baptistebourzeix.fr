import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRouter } from 'next/router'

export default function Button({children, ...props}) {
    const ref = useRef()
    const sphere = useRef()
    const { width } = useThree((state) => state.viewport)
    const [hovered, hover] = useState(false)
    const [clicked, setClicked] = useState(false)
    const p = new THREE.Vector3
    const router = useRouter()
    useCursor(hovered)
    
    useFrame((state, dt) => {
        
        //console.log('sphere', new THREE.Vector3(state.mouse.x / 2, state.mouse.y / 2, 10))
        //console.log('camera', state.camera)
        
        easing.damp3(sphere.current.scale, [1 * (hovered ? 1 : 0), 1 * (hovered ? 1 : 0), 1 * (hovered ? 1 : 0)], 0.1, dt)
        easing.damp3(state.camera.position, [state.camera.position.x, state.camera.position.y, clicked ? -6 : 10], 0.4, dt)
        //vec.set((state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0)
        sphere.current.position.setX((state.pointer.x * state.viewport.width) / 2)
        sphere.current.position.setY(((state.pointer.y * state.viewport.height) / 2) -0.9)
        sphere.current.position.setZ(-6)
        sphere.current.rotation.y += 0.01;
        sphere.current.rotation.x += 0.01;

        //clicked ? state.camera.position.setZ(-6) : state.camera.position.setZ(10);

        //console.log('clicked', clicked)
      })
      useEffect(() => {
        document.body.style.cursor = hovered ? `none` : `auto`
      })
    return (
        <group 
            ref={ref} 
            onPointerOver={(e) => (hover(true))}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
        >
            <mesh ref={sphere}>
                <sphereGeometry 
                    attach="geometry"
                    args={[.4, 6, 6]} 
                />
                <meshPhysicalMaterial 
                    attach="material" 
                    metalness={0.3} 
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

    function handleClick() {
    setClicked(true)
    console.log('setClicked')
}
}

