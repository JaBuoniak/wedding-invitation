interface GuestCountSectionProps {
    counts: {
        adults: number;
        children: number;
        under10: number;
        under2: number;
    };
    limits: {
        maxAdults: number;
        maxChildren: number;
        maxUnder10: number;
        maxUnder2: number;
    };
    onUpdate: (field: 'adults' | 'children' | 'under10' | 'under2', delta: number, max: number) => void;
}

const GuestCountSection = ({ counts, limits, onUpdate }: GuestCountSectionProps) => {
    const items = [
        { label: 'Dorośli', key: 'adults' as const, max: limits.maxAdults },
        limits.maxChildren > 0 && { label: 'Dzieci (pow. 10 lat)', key: 'children' as const, max: limits.maxChildren },
        limits.maxUnder10 > 0 && { label: 'Dzieci (2-10 lat)', key: 'under10' as const, max: limits.maxUnder10 },
        limits.maxUnder2 > 0 && { label: 'Dzieci (do 2 lat)', key: 'under2' as const, max: limits.maxUnder2 }
    ].filter(Boolean) as { label: string; key: 'adults' | 'children' | 'under10' | 'under2'; max: number }[];

    return (
        <div className="form-group">
            <label className="form-label mb-2">Liczba osób</label>
            {items.map(item => (
                <div key={item.key} className="d-flex justify-between items-center mb-1">
                    <span>{item.label}</span>
                    <div className="d-flex items-center gap-1">
                        <button type="button" onClick={() => onUpdate(item.key, -1, item.max)} className="btn btn-secondary btn-sm">-</button>
                        <span className="counter-display">{counts[item.key]}</span>
                        <button type="button" onClick={() => onUpdate(item.key, 1, item.max)} className="btn btn-secondary btn-sm">+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuestCountSection;
