import React, { useState } from 'react';
import './GameCollection.css';
import * as gameCollectionDataJson from '../../data/game-collection-data.json';
import { getPhysicalGameType } from '../../utils/get-physical-game-type';
import { CollapsibleConsoleButton } from './collapsible-console-button/CollapsibleConsoleButton';
import { Filters } from './filters/Filters';
import { getGameBoxType } from '../../utils/get-game-box-type';
import { NoGamesWarning } from './no-games-warning/NoGamesWarning';
import { GameInfo } from './game-info/GameInfo';


type GameCollectionProps = {};

export type ListFilter = 'all-games' | 'owned-games' | 'unowned-games';

interface Game {
    title: string;
    boxArt: string;
    hasGame: boolean;
    hasCase: boolean;
    hasManual?: boolean;
    hasPlayed: boolean;
    image?: string;
    releaseDate: string;
}

interface Console {
    name: string;
    image: string;
    releaseDate: string;
    games: Game[];
}

export const GameCollection: React.FC<GameCollectionProps> = () => {
    const [filterValue, setFilterValue] = useState<ListFilter>('all-games');
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const gameData: { consoles: Console[] } = gameCollectionDataJson;

    const onFilterChange = (filter: ListFilter) => {
        setFilterValue(filter);
    }

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
                <Filters onFilterChange={onFilterChange} />
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
                                                boxArt={game.boxArt}
                                                personalCopyImage={game.image}
                                                gameReleaseDate={game.releaseDate}
                                                physicalGameType={physicalGameType}
                                                boxType={boxType}
                                                isVeryLastGame={isVeryLastGame}
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