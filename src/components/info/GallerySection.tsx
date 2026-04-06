// TODO: Podmień na właściwy link do galerii celebrio.app
const GALLERY_URL = 'https://celebrio.app';

const GallerySection = () => {
  return (
    <section className="info-gallery" id="gallery-section">
      <p className="info-gallery__label">Wspólna galeria</p>
      <h2 className="info-gallery__title">Zdjęcia i filmy</h2>
      <p className="info-gallery__desc">
        Wrzucaj zdjęcia i filmiki z wesela. Zobaczymy się wszystkimi oczami.
      </p>
      <a
        id="btn-open-gallery"
        href={GALLERY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="info-gallery__btn"
      >
        Dodaj zdjęcia i filmy
      </a>
    </section>
  );
};

export default GallerySection;
