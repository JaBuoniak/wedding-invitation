import { MapPin } from "lucide-react";

const TravelSection = () => {
  return (
    <div>
      <div className="info-logistics__block">
        <p className="info-logistics__subtitle">Ślub</p>
        <p className="info-logistics__name">Kościół św. Kazimierza Królewicza</p>
        <p className="info-logistics__address">Tadeusza Kościuszki 12, Giżycko · godz. 15:00</p>
        <a
          id="btn-map-church"
          href="https://maps.google.com/?q=Kościół+św.+Kazimierza+Królewicza,+Giżycko"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          <MapPin size={16} /> Otwórz w Mapach
        </a>
      </div>

      <div className="info-logistics__block" style={{ marginBottom: 0 }}>
        <p className="info-logistics__subtitle">Wesele</p>
        <p className="info-logistics__name">Tawerna „Piękny Brzeg"</p>
        <p className="info-logistics__address">Leśna 18, Węgorzewo</p>
        <a
          id="btn-map-venue"
          href="https://maps.google.com/?q=Ośrodek+Wypoczynkowy+Piękny+Brzeg,+Węgorzewo"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          <MapPin size={16} /> Otwórz w Mapach
        </a>
      </div>
    </div>
  );
};

export default TravelSection;
