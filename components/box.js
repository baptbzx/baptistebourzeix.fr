import React from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Box(props) {
    const myMesh = React.useRef();

    useFrame(({ clock }) => {
       const t = clock.getElapsedTime();
       myMesh.current.rotation.x = t*0.3;
       myMesh.current.rotation.y = t*0.2;

        //myMesh.current.rotation.x = THREE.MathUtils.lerp(myMesh.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
        myMesh.current.rotation.y = THREE.MathUtils.lerp(myMesh.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
        myMesh.current.rotation.z = THREE.MathUtils.lerp(myMesh.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
        myMesh.current.position.y = THREE.MathUtils.lerp(myMesh.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
    });

    return (
        <mesh {...props} recieveShadow={false} castShadow ref={myMesh}>
            <boxBufferGeometry />
            <meshPhysicalMaterial metalness={0.9} roughness={0.25} wireframe={false} />
        </mesh>
    );
}
export default Box;
