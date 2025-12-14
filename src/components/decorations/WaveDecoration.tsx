import waveVector from '../../assets/images/wave.png';

interface WaveDecorationProps {
    className?: string;
}

const WaveDecoration = ({ className = "" }: WaveDecorationProps) => {
    return (
        <div className={`text-center ${className}`}>
            <img
                src={waveVector}
                alt="Decorative wave"
                style={{ width: '40%', opacity: 0.7 }}
            />
        </div>
    );
};

export default WaveDecoration;
