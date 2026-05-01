import { useState } from 'react';
import './GameCollection.css';
import * as gameCollectionDataJson from '../../data/game-collection-data.json';
import { getPhysicalGameType } from '../../utils/get-physical-game-type';
import { CollapsibleConsoleButton } from './collapsible-console-button/CollapsibleConsoleButton';
import { getGameBoxType } from '../../utils/get-game-box-type';
import { NoGamesWarning } from './no-games-warning/NoGamesWarning';
import { GameInfo } from './game-info/GameInfo';
import { getConsoleImageDimensions } from '../../utils/get-console-image-width';
import { SegmentedControl } from '@mantine/core';

type GameCollectionProps = {};

export type FilterValues = 'all-games' | 'owned-games' | 'unowned-games';

interface Game {
    title: string;
    filePath: string;
    hasGame: boolean;
    hasCase: boolean;
    hasManual?: boolean;
    hasPlayed: boolean;
    hasGlb: boolean;
    hasContentsPic: boolean;
    releaseDate: string;
}

interface Console {
    name: string;
    image: string;
    releaseDate: string;
    games: Game[];
}

export const GameCollection: React.FC<GameCollectionProps> = () => {
    const [filterValue, setFilterValue] = useState<FilterValues>('all-games');
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const gameData: { consoles: Console[] } = gameCollectionDataJson;

    const addOpenIndex = (index: number) => {
        if (!openIndices.includes(index)) {
            setOpenIndices(openIndices.concat([index]));
        }
    }

    const removeOpenIndex = (index: number) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter((i) => i !== index));
        }
    }

    return (
        <div className="background">
            <div className="jacobs-games">
                <img className="jacobs-games-image" src="/images/jacobs-games.png" alt="TODO" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="filters-container">
                <SegmentedControl
                    value={filterValue}
                    onChange={setFilterValue}
                    color="#2e7d32"
                    data={[
                        { label: 'All Games', value: 'all-games' },
                        { label: 'Owned', value: 'owned-games' },
                        { label: 'Unowned', value: 'unowned-games' },
                    ]}
                />
            </div>
            <nav className="game-collection">
                {gameData.consoles.map((console, index) => {
                    const physicalGameType = getPhysicalGameType(console.name);
                    const boxType = getGameBoxType(console.name);
                    const isLast = index === gameData.consoles.length - 1;

                    return (
                        <div key={index}>
                            <CollapsibleConsoleButton
                                consoleIndex={index}
                                consoleName={console.name}
                                consoleImage={console.image}
                                consoleReleaseDate={console.releaseDate}
                                top={index === 0}
                                bottom={isLast}
                                addOpenIndex={addOpenIndex}
                                removeOpenIndex={removeOpenIndex}
                                openIndices={openIndices}
                                Warning={<NoGamesWarning filter={filterValue} isLast={isLast} />}
                            >
                                {console.games
                                    .filter((game) => {
                                        return (filterValue === "owned-games" && game.hasGame) || 
                                                (filterValue === "unowned-games" && !game.hasGame) || 
                                                filterValue === "all-games";    
                                    })
                                    .map((game, gameIndex) => {
                                        const isVeryLastGame = isLast && (gameIndex === console.games.length - 1)

                                        return (<div key={gameIndex}>
                                            <GameInfo 
                                                text={game.title}
                                                filePath={game.filePath}
                                                gameReleaseDate={game.releaseDate}
                                                physicalGameType={physicalGameType}
                                                boxType={boxType}
                                                isVeryLastGame={isVeryLastGame}
                                                hasGlb={game.hasGlb}
                                                hasContentsPic={game.hasContentsPic}
                                                gameImageWidth={getConsoleImageDimensions(console.name)}
                                                chipInfo={{
                                                    hasGame: game.hasGame,
                                                    hasBox: game.hasCase,
                                                    hasManual: game.hasManual,
                                                    hasPlayed: game.hasPlayed,
                                                }}
                                            />
                                        </div>)
                                    })
                                }
                            </CollapsibleConsoleButton>
                        </div>
                    )
                })}
            </nav>
        </div>
    );
}