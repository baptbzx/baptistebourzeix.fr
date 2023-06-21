import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function Caption({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
      <Text
        position={[0, 0, -5]}
        lineHeight={1}
        font="/AHAMONO-Regular.ttf"
        fontSize={width / 22}
        material-toneMapped={true}
        anchorX="center"
        anchorY="middle">
        {children}
      </Text>
    )
}
