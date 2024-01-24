import * as THREE from 'three'
import { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/router'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Stats } from "@react-three/drei";
import css from '../styles/Home.module.css'
import Footer from "./footer"
import Box from '../components/shapes/box'
import Cone from '../components/shapes/cone'
import Sphere from '../components/shapes/sphere'
import LightBulb from '../components/light'
import Background from '@/components/background'
import Coffee from '@/components/shapes/coffee'
import KeyCap from '@/components/shapes/keycap'
import Rig from '@/components/rig'
import { useRouter, useLocation } from 'wouter'
import Curve from '@/components/curve/'


export default function Layout({ children }) {

    const router = useRouter()

    return (
        <>
            <Curve>
                <main className="h-full flex flex-row items-center justify-between">
                    <div className="w-full h-full">
                        <Canvas
                            shadows
                            className={css.canvas}
                            dpr={[1, 2]}
                            camera={{ position: [0, 0, 10], fov: 22 }}
                        >
                            {children}
                            <Rig />
                            <ambientLight color={"#FFFFFF"} intensity={0.1} />
                            <LightBulb position={[0, 4, 0]} />
                            <LightBulb position={[0, 4, -10]} />
                            <Background />
                            <Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone /><Cone />
                            <Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere /><Sphere />

                            <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                            <Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee /><Coffee />
                            <KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap /><KeyCap />
                        </Canvas>
                    </div>
                </main>
            </Curve>
            <Footer />
        </>
    )
}
