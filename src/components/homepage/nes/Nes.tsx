import { useState } from "react";
import './Nes.css';
import clsx from "clsx";
import Typewriter from "../../common/typewriter/Typewriter";

type NESProps = {};

export const NES: React.FC<NESProps> = () => {

    const [poweredOn, setPoweredOn] = useState(false);
        const [resetButtonClicked, setResetButtonClicked] = useState(false);
    
        const handlePowerButtonMouseDown = () => {
            setPoweredOn(!poweredOn);
        }
    
        const handleResetButtonDown = () => {
            setResetButtonClicked(true);
        }
    
        const handleResetButtonUp = () => {
            setResetButtonClicked(false);
        }

    return (
        <>
            <div className="nes-top">
                <div className="nes-top-left">
                    <div className="cart-slot-outline">
                        <div className="cart-slot-text title nes-text-theme">
                            Hello, I'm Jacob Mauro!
                        </div>
                        <div className="cart-slot-text subtitle nes-text-theme">
                            {!resetButtonClicked && <Typewriter text={["Software engineer", "Nintendo collector", "Dev tools wiz"]} />}
                        </div>
                    </div>
                </div>
                <div className="nes-top-middle"></div>
                <div className="nes-top-right"></div>
            </div>
            <div className="nes-middle" />
            <div className="nes-bottom">
                <div className="nes-bottom-left">
                    <div className="buttons">
                        <div className={clsx("power-light", poweredOn ? "powered-on" : "powered-off")} />
                        <div 
                            className={clsx("power-button", "nes-buttons", poweredOn && "nes-buttons-pushed")}
                            onMouseDown={handlePowerButtonMouseDown}
                        >
                            <div className="nes-buttons-text nes-text-theme">POWER</div>
                        </div>
                        <div 
                            className={clsx("reset-button", "nes-buttons", resetButtonClicked && "nes-buttons-pushed")}
                            onMouseDown={handleResetButtonDown}
                            onTouchStart={handleResetButtonDown}
                            onMouseUp={handleResetButtonUp}
                            onTouchEnd={handleResetButtonUp}
                        >
                            <div className="nes-buttons-text nes-text-theme">RESET</div>
                        </div>
                    </div>
                </div>
                <div className="nes-bottom-middle">
                    <div className="controller-ports">
                        <div className="controller-port-container">
                            <div className="controller-port">
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector hidden-connector" />
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="controller-port-container second-controller-port">
                            <div className="controller-port">
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector hidden-connector" />
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nes-bottom-right"></div>
            </div>
        </>
    );
}