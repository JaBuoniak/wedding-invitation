import { useState } from 'react';
import { Navigation, Home, Phone, Clock, Star, HelpCircle } from 'lucide-react';
import WelcomeSection from './WelcomeSection';
import GallerySection from './GallerySection';
import AccordionSection from './AccordionSection';
import TravelSection from './TravelSection';
import StaySection from './StaySection';
import ContactSection from './ContactSection';
import DayPlanSection from './DayPlanSection';
import AttractionsSection from './AttractionsSection';
import QuizSection from './QuizSection';
import SeatSearchSection from './SeatSearchSection';
import FooterGallerySection from './FooterGallerySection';
import { getWeddingPhase, isTravelVisible, isSeatSearchActive } from './weddingPhase';
import type { WeddingPhase } from './weddingPhase';
import './info.css';

interface InfoPageProps {
  phase?: WeddingPhase;
}

const InfoPage = ({ phase: propsPhase }: InfoPageProps) => {
  const phase = propsPhase || getWeddingPhase();
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Wyszukiwarka miejsc dostępna tylko w dniu wesela (do 18:00)
  const showSeatSearch = isSeatSearchActive();
  const showTravel = isTravelVisible();

  const handleToggle = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="info-page">
      <WelcomeSection phase={phase} />

      {/* ===== FAZA: PRZED ŚLUBEM ===== */}
      {phase === 'before' && (
        <>
          <div style={{ height: '1.5rem' }} />
          <div className="info-accordion">
            <AccordionSection
              id="travel"
              title="Dojazd"
              Icon={Navigation}
              isOpen={openSections.includes('travel')}
              onToggle={handleToggle}
            >
              <TravelSection />
            </AccordionSection>

            <AccordionSection
              id="stay"
              title="Noclegi"
              Icon={Home}
              isOpen={openSections.includes('stay')}
              onToggle={handleToggle}
            >
              <StaySection />
            </AccordionSection>

            <AccordionSection
              id="attractions"
              title="Atrakcje"
              Icon={Star}
              isOpen={openSections.includes('attractions')}
              onToggle={handleToggle}
            >
              <AttractionsSection phase={phase} />
            </AccordionSection>

            <AccordionSection
              id="contact"
              title="Kontakt"
              Icon={Phone}
              isOpen={openSections.includes('contact')}
              onToggle={handleToggle}
            >
              <ContactSection phase={phase} />
            </AccordionSection>
          </div>

          <div style={{ height: '1.5rem' }} />
          <GallerySection phase={phase} />
        </>
      )}

      {/* ===== FAZA: W TRAKCIE WESELA ===== */}
      {phase === 'during' && (
        <>
          <div style={{ height: '1.5rem' }} />
          {showSeatSearch && (
            <>
              <SeatSearchSection />
              <div style={{ height: '1.5rem' }} />
            </>
          )}

          <GallerySection phase={phase} />
          <div style={{ height: '1.5rem' }} />

          <div className="info-accordion">
            {showTravel && (
              <AccordionSection
                id="travel"
                title="Dojazd"
                Icon={Navigation}
                isOpen={openSections.includes('travel')}
                onToggle={handleToggle}
              >
                <TravelSection />
              </AccordionSection>
            )}

            <AccordionSection
              id="plan"
              title="Plan dnia"
              Icon={Clock}
              isOpen={openSections.includes('plan')}
              onToggle={handleToggle}
            >
              <DayPlanSection />
            </AccordionSection>

            <AccordionSection
              id="attractions"
              title="Atrakcje"
              Icon={Star}
              isOpen={openSections.includes('attractions')}
              onToggle={handleToggle}
            >
              <AttractionsSection phase={phase} />
            </AccordionSection>

            <AccordionSection
              id="quiz"
              title="Quiz"
              Icon={HelpCircle}
              isOpen={openSections.includes('quiz')}
              onToggle={handleToggle}
            >
              <QuizSection />
            </AccordionSection>

            <AccordionSection
              id="contact"
              title="Kontakt"
              Icon={Phone}
              isOpen={openSections.includes('contact')}
              onToggle={handleToggle}
            >
              <ContactSection phase={phase} />
            </AccordionSection>
          </div>

          <div style={{ height: '0.5rem' }} />
          <FooterGallerySection />
        </>
      )}

      {/* ===== FAZA: PO WESELU ===== */}
      {phase === 'after' && (
        <>
          <div style={{ height: '1.5rem' }} />
          <GallerySection phase={phase} />

          <div className="info-accordion">
            <section className="info-thankyou">
              <p className="info-thankyou__text info-thankyou__text--secondary">
                Zdjęcia będą dostępne do oglądania<br />
                już w tym tygodniu.
              </p>
            </section>

            <AccordionSection
              id="contact"
              title="Kontakt"
              Icon={Phone}
              isOpen={openSections.includes('contact')}
              onToggle={handleToggle}
            >
              <ContactSection phase={phase} />
            </AccordionSection>
          </div>
        </>
      )}

      <footer
        style={{
          textAlign: 'center',
          padding: '1rem 1.5rem 2rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-light)',
        }}
      >
        &copy; {new Date().getFullYear()} Ania &amp; Paweł
      </footer>
    </div>
  );
};

export default InfoPage;
