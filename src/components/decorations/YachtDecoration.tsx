import yachtVector from '../../assets/images/yacht.png';

interface YachtDecorationProps {
    className?: string;
}

const YachtDecoration = ({ className = "" }: YachtDecorationProps) => {
    return (
        <div className={`text-center ${className}`}>
            <img
                src={yachtVector}
                alt="Decorative yacht"
                style={{ width: '50%', opacity: 0.8 }}
            />
        </div>
    );
};

export default YachtDecoration;
