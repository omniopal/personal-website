import './Cartridge.css';

type CartridgeProps = {
    title: string;
    description: string;
};

export const Cartridge: React.FC<CartridgeProps> = ({
    title,
    description,
}) => {
    return (
        <div className="cartridge-container">
            <div className="top">
                <div className="top-content">
                    <div className="ridges">

                    </div>
                    <div className="main-content">
                        <div className="project-name">{title}</div>
                        <div className="project-description">{description}</div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="triangle" />
                <div className="project-info">project info</div>
            </div>
        </div>
    )
}