import { Text, Html } from '@react-three/drei'

export default function Caption({ children }) {
    return (
      <Html transform position={[0, 0, -5]}>
        {children}
      </Html>
    )
}
