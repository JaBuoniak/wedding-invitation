import flying1 from '../../assets/images/flying_seagull_1.png';
import flying2 from '../../assets/images/flying_seagull_2.png';
import flying3 from '../../assets/images/flying_seagull_3.png';
import sitting1 from '../../assets/images/sitting_seagull_1.png';
import sitting2 from '../../assets/images/sitting_seagull_2.png';
import sitting3 from '../../assets/images/sitting_seagull_3.png';
import buoy1 from '../../assets/images/seagull_on_buoy_1.png';
import buoy2 from '../../assets/images/seagull_on_buoy_2.png';

const VARIANTS = {
    flying1,
    flying2,
    flying3,
    sitting1,
    sitting2,
    sitting3,
    buoy1,
    buoy2
};

export type SeagullVariant = keyof typeof VARIANTS;

interface SeagullDecorationProps {
    variant: SeagullVariant;
    className?: string;
    style?: React.CSSProperties;
    width?: string;
    flip?: boolean;
}

const SeagullDecoration = ({
    variant,
    className = "",
    style = {},
    width = "100px",
    flip = false
}: SeagullDecorationProps) => {
    const src = VARIANTS[variant];

    const transformParts = [];
    if (style.transform) transformParts.push(style.transform);
    if (flip) transformParts.push('scaleX(-1)');

    const computedStyle = {
        width,
        ...style,
        transform: transformParts.length > 0 ? transformParts.join(' ') : undefined
    };

    return (
        <div className={`seagull-decoration ${className}`} style={{ lineHeight: 0 }}>
            <img
                src={src}
                alt="Decorative seagull"
                style={computedStyle}
            />
        </div>
    );
};

export default SeagullDecoration;
