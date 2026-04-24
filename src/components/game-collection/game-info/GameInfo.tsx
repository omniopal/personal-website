import { Chip, useMediaQuery, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import './GameInfo.css';
import clsx from 'clsx';
import { GameImageModalButton } from '../game-image-modal-button/GameImageModalButton';
import { TbView360Number as Interactive360Icon } from "react-icons/tb";
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PresentationControls, OrbitControls } from '@react-three/drei';

type ChipInfo = {
    hasGame: boolean;
    hasBox: boolean;
    hasManual?: boolean;
    hasPlayed: boolean;
}

type GameInfoProps = PropsWithChildren & {
    text: string;
    filePath: string;
    personalCopyImage?: string;
    chipInfo: ChipInfo;
    gameReleaseDate: string;
    physicalGameType: string;
    boxType: string;
    isVeryLastGame: boolean;
};

export const GameInfo: React.FC<GameInfoProps> = ({
    text,
    filePath,
    personalCopyImage,
    chipInfo,
    gameReleaseDate,
    physicalGameType,
    boxType,
    isVeryLastGame,
}) => {
    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const [opened, { open, close }] = useDisclosure(false);

    const isMobile = window.innerWidth < 768;

    const Model = (props: any) => { // temp any find right type and fix
        //  const { scene } = useGLTF('/objects/test.glb');
        const { scene } = useGLTF('https://pub-1c3c24ac600e4d4daf14cd109a0897f1.r2.dev/SNES/SMRPG.glb');
        return <primitive object={scene} {...props} />
    }

    return (
        <div className={(clsx("game-info", isVeryLastGame && "very-last-game-info"))}>
            <div className="image-and-title">
                <div className="image-container">
                    <img className="game-image" src={`/images/${filePath}.webp`} />
                </div>
                <div className="title-and-chips">
                    <h2>{text}</h2>
                    {gameReleaseDate && <div className="game-release-date">{gameReleaseDate}</div>}
                    {!isSmallBreakpoint && 
                        <div className="chips">
                            <Chip label={physicalGameType} color="success" variant={chipInfo.hasGame ? "filled" : "outlined"} />
                            <Chip label={boxType} color="success" variant={chipInfo.hasBox ? "filled" : "outlined"} />
                            {chipInfo.hasManual !== undefined && <Chip label="Manual" color="success" variant={chipInfo.hasManual ? "filled" : "outlined"} />}
                            <Chip label="Played" color="success" variant={chipInfo.hasPlayed ? "filled" : "outlined"} />
                            <Button
                                variant="default"
                                onClick={open}
                                size="xs"
                            >
                                <Interactive360Icon size="28px" />
                            </Button>
                            <Modal
                                opened={opened}
                                onClose={close}
                                title="testing title"
                                centered
                                size="100%"
                            >
                                <Canvas
                                    style={{ height: '80vh' }}
                                    dpr={[1, 2]}
                                    shadows
                                    camera={{ fov: 45, position: [0, 0, isMobile ? 1.5 : 1] }}
                                >
                                    <color attach="background" args={["#101010"]} />
                                    <ambientLight intensity={2.25} />
                                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                                    <directionalLight position={[-5, -5, -5]} intensity={0.2} />
                
                                    <PresentationControls
                                        speed={1.25}
                                        global
                                    >
                                        <Model
                                            scale={1}
                                            position={[0, -0.25, 0]}
                                            rotation={[0, Math.PI, 0]}
                                        />
                                    </PresentationControls>
                
                                    <OrbitControls 
                                        enableRotate={false}
                                        enablePan={true}
                                        enableZoom={true}
                                        zoomSpeed={0.8}
                                    />
                                </Canvas>
                            </Modal>    
                            {chipInfo.hasGame && <GameImageModalButton text={`My copy of ${text}`} image={personalCopyImage} />}
                        </div>
                    }
                </div>
            </div>
            {isSmallBreakpoint && 
                <div className="chips-small-breakpoint">
                    <div className="chip-space">
                        <Chip label={physicalGameType} color="success" variant={chipInfo.hasGame ? "filled" : "outlined"} />
                        <Chip label={boxType} color="success" variant={chipInfo.hasBox ? "filled" : "outlined"} />
                        {chipInfo.hasManual !== undefined && <Chip label="Manual" color="success" variant={chipInfo.hasManual ? "filled" : "outlined"} />}
                        <Chip label="Played" color="success" variant={chipInfo.hasPlayed ? "filled" : "outlined"} />
                        <div className="modal-button">
                            {chipInfo.hasGame && <GameImageModalButton text={`My copy of ${text}`} image={personalCopyImage} />}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}