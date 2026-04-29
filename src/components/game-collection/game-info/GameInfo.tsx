import { Chip, useMediaQuery, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import './GameInfo.css';
import clsx from 'clsx';
import { GameImageModalButton } from '../game-image-modal-button/GameImageModalButton';
import { Button, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GameModelViewer } from '../game-model-viewer/GameModelViewer';
import { FaBoxOpen as BoxOpenIcon } from "react-icons/fa";
import { LuRotate3D as RotateIcon } from "react-icons/lu";

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
    hasGlb: boolean;
    hasContentsPic: boolean;
    gameImageWidth: number;
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
    hasGlb,
    hasContentsPic,
    gameImageWidth,
}) => {
    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(1000));
    const [is3DModalOpened, { open: open3DModal, close: close3DModal }] = useDisclosure(false);
    const [isContentsModalOpened, { open: openContentsModal, close: closeContentsModal }] = useDisclosure(false);

    return (
        <>
            <div className={(clsx("game-info", isVeryLastGame && "very-last-game-info"))}>
                <div className="image-and-title">
                    <div className="image-container">
                        <img className="game-image" style={{ maxWidth: isSmallBreakpoint ? `${gameImageWidth - 20}px` : `${gameImageWidth}px` }} src={`/images/${filePath}.webp`} />
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
                                {chipInfo.hasGame && <GameImageModalButton text={`My copy of ${text}`} image={personalCopyImage} />}
                            </div>
                        }
                    </div>
                    {!isSmallBreakpoint && (hasGlb || hasContentsPic) &&
                        <Stack 
                            style={{
                                marginLeft: 'auto',
                                paddingLeft: '16px',
                            }}
                        >
                            {hasGlb &&
                                <Button
                                    color="black"
                                    leftSection={<RotateIcon size={20} />}
                                    onClick={open3DModal}
                                >
                                    View 3D
                                </Button>
                            }
                            {hasContentsPic && 
                                <Button
                                    color="black"
                                    leftSection={<BoxOpenIcon size={20} />}
                                    onClick={openContentsModal}
                                >
                                    View contents
                                </Button>
                            }
                        </Stack>
                    }
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
                            {hasGlb &&
                                <Button
                                    color="black"
                                    leftSection={<RotateIcon size={20} />}
                                    onClick={open3DModal}
                                >
                                    View 3D
                                </Button>
                            }
                            {hasContentsPic && 
                                <Button
                                    color="black"
                                    leftSection={<BoxOpenIcon size={20} />}
                                    onClick={openContentsModal}
                                >
                                    View contents
                                </Button>
                            }
                        </div>
                    </div>
                }
            </div>
            <Modal
                opened={is3DModalOpened}
                onClose={close3DModal}
                title={`My copy of ${text}`}
                centered
                size="100%"
                styles={{
                    title: {
                        fontWeight: 'bold',
                        fontSize: '20px',
                    },
                }}
            >
                <GameModelViewer filePath={filePath} />
            </Modal>
            <Modal
                opened={isContentsModalOpened}
                onClose={closeContentsModal}
                title={`Contents of ${text}`}
                centered
                size="auto"
                styles={{
                    title: {
                        fontWeight: 'bold',
                        fontSize: '20px',
                    },
                    body: {
                        overflow: 'visible',
                    },
                    content: {
                        overflow: 'visible',
                    },
                }}
            >
                <img
                    className="contents-image"
                    src={`https://pub-1c3c24ac600e4d4daf14cd109a0897f1.r2.dev/${filePath}.jpg`}
                    alt={`An image of the contents inside my copy of ${text}`}
                    style={{ touchAction: 'pinch-zoom' }}
                />
            </Modal>
        </>
    )
}