interface AccommodationSectionProps {
    accommodation: {
        friSat: boolean;
        satSun: boolean;
        sunMon: boolean;
    };
    onChange: (field: 'friSat' | 'satSun' | 'sunMon') => void;
}

const AccommodationSection = ({ accommodation, onChange }: AccommodationSectionProps) => {
    return (
        <div className="form-group">
            <label className="form-label">Rezerwacja noclegu</label>
            <div className="d-flex flex-col gap-1">
                <label className="form-checkbox-label">
                    <input
                        type="checkbox"
                        checked={accommodation.friSat}
                        onChange={() => onChange('friSat')}
                    />
                    Piątek / Sobota (12-13.06)
                </label>
                <label className="form-checkbox-label">
                    <input
                        type="checkbox"
                        checked={accommodation.satSun}
                        onChange={() => onChange('satSun')}
                    />
                    Sobota / Niedziela (13-14.06)
                </label>
                <label className="form-checkbox-label">
                    <input
                        type="checkbox"
                        checked={accommodation.sunMon}
                        onChange={() => onChange('sunMon')}
                    />
                    Niedziela / Poniedziałek (14-15.06)
                </label>
            </div>
        </div>
    );
};

export default AccommodationSection;
