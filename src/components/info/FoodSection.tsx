import { Globe, Phone } from 'lucide-react';

const FoodSection = () => {
  return (
    <div>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5', margin: 0, marginBottom: '1.25rem' }}>
        Nakarmimy Was do syta w sobotę wieczorem i w niedzielę od południa. Zatroszczcie się o pozostałe posiłki. Oto możliwości:
      </p>

      <div className="info-logistics__block">
        <p className="info-logistics__subtitle">Aneks kuchenny</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5', margin: 0 }}>
          W domkach znajdziecie podstawowe naczynia (talerze, sztućce, garnek, patelnia) i małe AGD (płyta indukcyjna, lodówka, czajnik). Nie spodziewajcie się jednak przypraw czy herbaty.
        </p>
      </div>

      <div className="info-logistics__block">
        <p className="info-logistics__subtitle">Tawerna</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5', margin: 0 }}>
          piątek: do 20<br />
          sobota: nieczynne<br />
          niedziela: od 9<br />
          - śniadania w formie bufetu kosztują 50 zł od osoby
        </p>
      </div>

      <div className="info-logistics__block" style={{ marginBottom: 0 }}>
        <p className="info-logistics__subtitle">Rusałka</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
          Restauracja tuż przed ośrodkiem<br />
          czynna od 12 do 19<br />
          - śniadania od 9 po zamówieniu poprzedniego dnia
        </p>
        <a
          id="btn-rusalka-call"
          href="tel:+48694555989"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Phone size={16} /> 694 555 989
        </a>
        <a
          id="btn-rusalka-website"
          href="https://apartamentylesnaprzystan.pl/restauracja-rusalka/"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          <Globe size={16} /> Strona restauracji
        </a>
      </div>
    </div>
  );
};

export default FoodSection;
