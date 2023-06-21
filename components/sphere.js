import { useState, useMemo, React } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Float } from '@react-three/drei'

function Sphere(props) {
    const { viewport, camera } = useThree()
    const [speed] = useState(() => 0.1 + Math.random() / 10)
    const position = useMemo(() => {
        const z = Math.random() * -30
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
        return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
    }, [viewport])
   
    return (
        <Float position={position} speed={speed} rotationIntensity={10} floatIntensity={40} dispose={null}>
            <mesh {...props} recieveShadow={false} castShadow>
                <sphereBufferGeometry 
                    attach="geometry"
                    args={[.4, 32, 32]} 
                />
                <meshPhysicalMaterial 
                    attach="material" 
                    metalness={0.9} 
                    roughness={0.25} 
                    wireframe={false} 
                />
            </mesh>
        </Float>
    );
}
export default Sphere;
