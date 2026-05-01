import type { WeddingPhase } from './weddingPhase';

const GALLERY_URL = 'https://aniaipawel.celebrio.app/gallery/vdrydjiu';

const GALLERY_DESC: Record<WeddingPhase, string> = {
  before:
    'Utrwaleniem ślubu w kościele\nzajmą się profesjonaliści,\nale potem nie oszczędzajcie aparatu!',
  during:
    'Upamiętnijcie ten dzień z Waszej perspektywy,\na potem wrzućcie tu zdjęcia i filmiki z wesela.',
  after:
    'Macie jakieś fajne ujęcia?\nKoniecznie podzielcie się z nami!',
};

interface GallerySectionProps {
  phase: WeddingPhase;
}

const GallerySection = ({ phase }: GallerySectionProps) => {
  return (
    <section className="info-gallery" id="gallery-section">
      <p className="info-gallery__label">Wspólna galeria</p>
      <h2 className="info-gallery__title">Zdjęcia i filmy</h2>
      <p className="info-gallery__desc">{GALLERY_DESC[phase]}</p>
      {phase !== 'before' && (
        <a
          id="btn-open-gallery"
          href={GALLERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="info-gallery__btn"
        >
          Dodaj zdjęcia i filmy
        </a>
      )}
    </section>
  );
};

export default GallerySection;
