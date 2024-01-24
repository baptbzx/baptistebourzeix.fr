import { Text, Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'


export default function Caption({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
        <Text
            anchorX="center"
            anchorY="center"
            position={[0, 1, -10]}
            transform
            fontSize={width / 22}
            lineHeight={1.2}
            font="/AHAMONO-Regular.ttf"
            material-toneMapped={true}
        >
            {children}
        </Text>
    )
}
