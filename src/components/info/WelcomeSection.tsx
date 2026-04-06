import imageHeader from '../../assets/photo/header/07.jpg';

// TODO: Podmień href na właściwy link do galerii celebrio.app
const GALLERY_URL = 'https://celebrio.app';

interface WelcomeSectionProps {
  onScrollToPlan: () => void;
}

const WelcomeSection = ({ onScrollToPlan }: WelcomeSectionProps) => {
  return (
    <section className="info-welcome">
      <img
        src={imageHeader}
        alt="Ania i Paweł"
        className="info-welcome__photo"
      />

      <div className="info-welcome__names">
        <div className="info-welcome__name-col info-welcome__name-col--left">
          <span className="info-welcome__first-name">Ania</span>
          <span className="info-welcome__last-name">Imbiorkiewicz</span>
        </div>

        <span className="info-welcome__ampersand">&amp;</span>

        <div className="info-welcome__name-col info-welcome__name-col--right">
          <span className="info-welcome__first-name">Paweł</span>
          <span className="info-welcome__last-name">Jabłoński</span>
        </div>
      </div>

      <p className="info-welcome__subtitle">13 czerwca 2026 &nbsp;·&nbsp; Giżycko</p>

      <div className="info-welcome__actions">
        <button
          id="btn-see-plan"
          className="info-btn info-btn--outline"
          onClick={onScrollToPlan}
        >
          Plan dnia
        </button>

        <a
          id="btn-add-photos-hero"
          href={GALLERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--primary"
        >
          Dodaj zdjęcia i filmy
        </a>
      </div>
    </section>
  );
};

export default WelcomeSection;
