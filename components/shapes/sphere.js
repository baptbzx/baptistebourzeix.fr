import { useState, useMemo, React } from "react";
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Float } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRouter } from 'next/router'


function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Sphere(props) {
    const router = useRouter()
    const isAbout = router.pathname === '/about'
    const colorMap = isAbout ? useLoader(TextureLoader, '/profile.jpg') : ''
    const { viewport, camera } = useThree()
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
    }, [viewport])
   
    return (
        <Float position={position} speed={speed} rotationIntensity={randomIntFromInterval(10,100)} floatIntensity={randomIntFromInterval(30,100)} dispose={null}>
            <mesh {...props} recieveShadow={false} castShadow>
                <sphereGeometry 
                    attach="geometry"
                    args={[.4, 32, 32]} 
                />
                <meshPhysicalMaterial 
                    attach="material" 
                    metalness={isAbout ? 0 : 0.9}
                    roughness={0.25} 
                    wireframe={false}
                    map={colorMap}
                />
            </mesh>
        </Float>
    );
}
export default Sphere;
