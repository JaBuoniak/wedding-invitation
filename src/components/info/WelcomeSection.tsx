import imageHeader from '../../assets/photo/header/07.jpg';
import type { WeddingPhase } from './weddingPhase';

interface WelcomeSectionProps {
  phase: WeddingPhase;
}

const WELCOME_MESSAGE: Record<WeddingPhase, string> = {
  before: 'Kochani, nie możemy się już doczekać!\nPoniżej garść informacji organizacyjnych.',
  during: 'Cieszymy się, że jesteście!\nŻyczymy Wam szampańskiej zabawy.\nSprawdźcie, co dla Was przygotowaliśmy.',
  after: 'Dziękujemy za Waszą obecność!\nMamy nadzieję, że dobrze się bawiliście\ni będziecie miło wspominać ten dzień.',
};

const WelcomeSection = ({ phase }: WelcomeSectionProps) => {
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
        </div>

        <span className="info-welcome__ampersand">&amp;</span>

        <div className="info-welcome__name-col info-welcome__name-col--right">
          <span className="info-welcome__first-name">Paweł</span>
        </div>
      </div>

      <p className="info-welcome__subtitle"></p>

      <p className="info-welcome__message">{WELCOME_MESSAGE[phase]}</p>
    </section>
  );
};

export default WelcomeSection;
