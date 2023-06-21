import ImprovedNoise from 'improved-noise';
import { ScrollControls, useScroll, Text, Loader, Line, Shadow, useTexture, meshBounds } from "@react-three/drei"


function Noise(props) {
    let quality = 1;
    const perlin = new ImprovedNoise(),
        size = 56 * 56,
        data = new Uint8Array(size),
        z = Math.random() * 100,
        width = 56,
        height = 56;

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < size; i++) {
            const x = i % width, y = ~~(i / width);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 2);
        }
        quality *= 5;
    }
    console.log('data', data)

    return (
        <group scale={1}>

        </group>
    );
}

export default Noise;