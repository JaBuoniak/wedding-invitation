const LogisticsSection = () => {
  return (
    <div>
      <div className="info-logistics__block">
        <p className="info-logistics__subtitle">Ślub</p>
        <p className="info-logistics__name">Kościół św. Kazimierza Królewicza</p>
        <p className="info-logistics__address">Tadeusza Kościuszki 12, Giżycko</p>
        <a
          id="btn-map-church"
          href="https://maps.google.com/?q=Parafia+św.+Kazimierza+Królewicza,+Giżycko"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          Otwórz w Mapach
        </a>
      </div>

      <div className="info-logistics__block">
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
          Otwórz w Mapach
        </a>
      </div>

      <div className="info-logistics__block" style={{ marginBottom: 0 }}>
        <p className="info-logistics__subtitle">Parking i noclegi</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
          Noclegi w domkach na terenie ośrodka. Parking bezpośrednio przy Tawernie.
        </p>
        {/* TODO: Wstaw grafikę mapki parkingu i noclegów — zastąp poniższy placeholder */}
        <div
          style={{
            width: '100%',
            background: 'var(--color-secondary)',
            borderRadius: '10px',
            padding: '2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--color-text-light)',
          }}
        >
          Mapka parkingu i noclegów — wkrótce
        </div>
      </div>
    </div>
  );
};

export default LogisticsSection;
