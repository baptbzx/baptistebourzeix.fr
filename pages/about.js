import Layout from '../components/layout'
import Caption from '../components/caption';
import Header from "../components/header"
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <>
            <Header/>
            <motion.div className="fixed bottom-0 left-0 z-20 flex w-full text-white">
                <motion.div className="w-1/3 p-10">
                    <h2>Technologies</h2>
                    <p>Front-End Developmnent / WordPress / WooCommerce / Adobe Commerce / WebFlow / React / Next.Js / THREE.JS</p>
                </motion.div>
                <motion.div className="w-1/3 p-10 text-center">
                    <h2>Need more informations ?</h2>
                    <p>hello@baptiste.cool</p>
                </motion.div>
                <motion.div className="w-1/3 p-10 text-right">
                    <h2>Certifications</h2>
                    <p>Adobe Commerce Front-End Developer Professional</p>
                    <p>WebFlow Certified Developer</p>
                </motion.div>
            </motion.div>

            <Layout>
                <Caption>
                    {`in this game since 2013 \n and ready for new challenges`}
                </Caption>
                <Html className="fixed bottom-0 left-0 pointer-events-none" anchorX="bottom" >
                </Html>
            </Layout>
        </>
    );
}