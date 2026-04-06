// TODO: Podmień href na właściwy link do galerii celebrio.app
const GALLERY_URL = 'https://celebrio.app';

const ThankYouSection = () => {
  return (
    <div className="info-page">
      <section className="info-welcome" style={{ paddingTop: '3rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 10vw, 3rem)',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            fontWeight: 400,
          }}
        >
          Dziękujemy
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '320px',
            margin: '0 auto 2rem',
          }}
        >
          Cieszymy się, że byliście z nami. Każde wspomnienie, każde zdjęcie — bezcenne.
        </p>
      </section>

      <section className="info-gallery" id="gallery-section-after">
        <p className="info-gallery__label">Wspólna galeria</p>
        <h2 className="info-gallery__title">Zdjęcia i filmy</h2>
        <p className="info-gallery__desc">
          Galeria jest nadal otwarta. Dodaj zdjęcia, które jeszcze nie trafiły do wspólnego albumu.
        </p>
        <a
          id="btn-open-gallery-after"
          href={GALLERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="info-gallery__btn"
        >
          Otwórz galerię
        </a>
      </section>

      <div style={{ height: '1.5rem' }} />

      <section className="info-footer-gallery">
        <h2 className="info-footer-gallery__title">Kontakt</h2>
        <p className="info-footer-gallery__desc">
          Masz pytanie? Napisz lub zadzwoń.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            id="btn-call-ania-after"
            href="tel:+48504094280"
            className="info-btn info-btn--outline"
            style={{ width: 'auto', padding: '0.7rem 1.5rem' }}
          >
            Ania · 504 094 280
          </a>
          <a
            id="btn-call-pawel-after"
            href="tel:+48600228402"
            className="info-btn info-btn--outline"
            style={{ width: 'auto', padding: '0.7rem 1.5rem' }}
          >
            Paweł · 600 228 402
          </a>
        </div>
      </section>

      <footer
        style={{
          textAlign: 'center',
          padding: '2rem 1.5rem 3rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-light)',
        }}
      >
        &copy; {new Date().getFullYear()} Ania &amp; Paweł
      </footer>
    </div>
  );
};

export default ThankYouSection;
