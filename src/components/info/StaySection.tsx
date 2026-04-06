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
        <p className="info-logistics__subtitle">Atrakcje ośrodka</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
          Jezioro Święcajty, sprzęt wodny, plaża i wiele więcej.
        </p>
        <a
          id="btn-resort-attractions"
          href="https://pieknybrzeg.pl/atrakcje/"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          Atrakcje ośrodka
        </a>
      </div>
    </div>
  );
};

export default StaySection;
