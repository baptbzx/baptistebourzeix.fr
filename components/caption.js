import { Text, Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function Caption({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
      <Html transform position={[0, 0, -5]}>
        {children}
      </Html>
    )
}
