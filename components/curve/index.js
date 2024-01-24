import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { text, curve, translate } from '@/components/curve/anim';
import { useRouter } from 'next/router';

const routes = {
    "/": "🏠 welcome",
    "/about": "🧑‍💻 hello, it's me",
    "/contact": "Contact"
}

const anim = (variants) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants
    }
}


export default function Curve({children, backgroundColor}) {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({
        height: null,
        width: null
    })

    useEffect( () => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize()

        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    }, [])

    return (
        <div className='page curve' style={{backgroundColor}}>
            <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
            <motion.p className='route' {...anim(text)}>
                {routes[router.route]}
            </motion.p>
            {dimensions.width != null && <SVG {...dimensions}/>}
            {
                children
            }
        </div>
    )
}

const SVG = ({height, width}) => {
    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `

    return (
        <motion.svg {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}