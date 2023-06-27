import React from "react";

function LightBulb(props) {
    return (
        <mesh {...props} >
            <pointLight castShadow={true} color={0x0000FF} />
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshPhongMaterial emissive={"blue"}  />
        </mesh>
    );
}

export default LightBulb;