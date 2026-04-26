import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, OrbitControls } from "@react-three/drei";
import { JSX } from "react";
import { TOUCH } from "three";

type GameModelViewerProps = {
    filePath: string;
};

type ModelProps = {
  filePath: string;
} & Omit<JSX.IntrinsicElements["primitive"], "object">;

function Model({ filePath, ...props }: ModelProps) {
  const { scene } = useGLTF(`https://pub-1c3c24ac600e4d4daf14cd109a0897f1.r2.dev/${filePath}.glb`);
  return <primitive object={scene} {...props} />;
}

export const GameModelViewer: React.FC<GameModelViewerProps> = ({ filePath }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <Canvas
            style={{ height: "80vh" }}
            dpr={[1, 2]}
            shadows
            camera={{ fov: 45, position: [0, 0, isMobile ? 1.5 : 1] }}
        >
            <color attach="background" args={["#101010"]} />

            <ambientLight intensity={2.25} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, -5, -5]} intensity={0.2} />

            <PresentationControls speed={1.25} global>
                <Model
                    filePath={filePath}
                    scale={1}
                    position={[0, -0.25, 0]}
                    rotation={[0, Math.PI, 0]}
                />
            </PresentationControls>

            <OrbitControls
                enableRotate={true}
                enablePan={true}
                enableZoom={true}
                zoomSpeed={0.8}
                panSpeed={0.8}
                touches={{
                    ONE: TOUCH.ROTATE,
                    TWO: TOUCH.PAN,
                }}
                enableDamping={true}
                dampingFactor={0.05}
            />
        </Canvas>
    );
};