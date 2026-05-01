const StaySection = () => {
  return (
    <div>
      <div className="info-logistics__block">
        <p className="info-logistics__subtitle">Zakwaterowanie</p>
        <p className="info-logistics__name">Domki w ośrodku Piękny Brzeg</p>
        {/* TODO: Uzupełnij godziny zameldowania i wymeldowania */}
        <p className="info-logistics__address">
          Zameldowanie: TODO · Wymeldowanie: TODO
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
          {/* TODO: Uzupełnij wszelkie dodatkowe informacje */}
          Prosimy o zabranie własnych ręczników.
        </p>
        <a
          id="btn-accommodation-details"
          href="https://pieknybrzeg.pl/domki-letniskowe-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', marginBottom: '0.75rem' }}
        >
          Informacje o domkach
        </a>
      </div>

      <div className="info-logistics__block" style={{ marginBottom: 0 }}>
        <a
          id="btn-resort-map"
          href="https://pieknybrzeg.pl/wp-content/uploads/2025/08/mapa-www.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          Mapka ośrodka
        </a>
      </div>
    </div>
  );
};

export default StaySection;
