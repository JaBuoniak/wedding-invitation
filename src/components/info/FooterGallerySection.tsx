const GALLERY_URL = 'https://aniaipawel.celebrio.app/gallery/vdrydjiu';

const FooterGallerySection = () => {
  return (
    <section className="info-footer-gallery">
      <h2 className="info-footer-gallery__title">Twoje zdjęcia są ważne</h2>
      <p className="info-footer-gallery__desc">
        Każde zdjęcie i film trafią do wspólnej galerii i będą pamiątką dla nas wszystkich.
      </p>
      <a
        id="btn-add-photos-footer"
        href={GALLERY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="info-btn info-btn--primary"
        style={{ display: 'inline-block', width: 'auto', padding: '0.9rem 2rem' }}
      >
        Dodaj zdjęcia i filmy
      </a>
    </section>
  );
};

export default FooterGallerySection;
