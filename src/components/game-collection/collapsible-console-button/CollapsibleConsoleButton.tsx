import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useState, PropsWithChildren, Children } from 'react';
import './CollapsibleConsoleButton.css';
import clsx from 'clsx';

export type CollapsibleConsoleButtonProps = PropsWithChildren & {
    consoleIndex: number;
    consoleName: string;
    consoleImage: string;
    consoleReleaseDate: string;
    top?: boolean;
    bottom?: boolean;
    openIndices: number[];
    Warning: React.JSX.Element;
    addOpenIndex: (index: number) => void;
    removeOpenIndex: (index: number) => void;
};

export const CollapsibleConsoleButton: React.FC<CollapsibleConsoleButtonProps> = (props) => {
    const {
        consoleIndex,
        consoleName,
        consoleImage,
        consoleReleaseDate,
        top,
        bottom,
        openIndices,
        Warning,
        addOpenIndex,
        removeOpenIndex,
        children
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isPreviousButtonOpen = openIndices.includes(consoleIndex - 1);

    const toggleCollapse = () => {
        if (Children.count(children) === 0) {
            console.log('Jacob there are no children!');
        }

        !isOpen ? addOpenIndex(consoleIndex) : removeOpenIndex(consoleIndex);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className={(clsx(
                    "collapsible-button",
                    top && "top-button",
                    bottom && !isOpen && "bottom-button",
                    isOpen && "curve-bottom-left",
                    isPreviousButtonOpen && "curve-top-left",
                ))}
                onClick={toggleCollapse}>
                <div className="console-info">
                    <div className="console-image-container">
                        <img src={`/images/${consoleImage}`} alt="TODO" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div className="name-and-release-date">
                        <h2>{consoleName}</h2>
                        <div className="console-release-date">{consoleReleaseDate}</div>
                    </div>
                </div>
                <div className="chevron">
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </div>
            </button>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {Children.count(children) > 0 ? children : Warning}
            </Collapse>
        </>
    )
}