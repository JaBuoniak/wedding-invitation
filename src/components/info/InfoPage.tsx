import { useState } from 'react';
import { Clock, Navigation, Home, HelpCircle, Phone, Star } from 'lucide-react';
import './info.css';

import { getWeddingPhase } from './weddingPhase';
import WelcomeSection from './WelcomeSection';
import GallerySection from './GallerySection';
import AccordionSection from './AccordionSection';
import DayPlanSection from './DayPlanSection';
import AttractionsSection from './AttractionsSection';
import TravelSection from './TravelSection';
import StaySection from './StaySection';
import QuizSection from './QuizSection';
import ContactSection from './ContactSection';
import FooterGallerySection from './FooterGallerySection';

type SectionId =
  | 'plan'
  | 'attractions'
  | 'travel'
  | 'stay'
  | 'quiz'
  | 'contact';

const InfoPage = () => {
  const phase = getWeddingPhase();
  const [openSection, setOpenSection] = useState<SectionId | null>(null);

  const handleToggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : (id as SectionId)));
  };

  return (
    <div className="info-page">
      <WelcomeSection phase={phase} />

      <div style={{ height: '1.5rem' }} />

      <GallerySection phase={phase} />

      <div style={{ height: '1.5rem' }} />

      {/* ===== BEFORE & DURING — accordion ===== */}
      {phase !== 'after' && (
        <div className="info-accordion">

          {/* ===== BEFORE WEDDING ===== */}
          {phase === 'before' && (
            <>
              <AccordionSection
                id="travel"
                title="Dojazd"
                Icon={Navigation}
                isOpen={openSection === 'travel'}
                onToggle={handleToggle}
              >
                <TravelSection />
              </AccordionSection>

              <AccordionSection
                id="stay"
                title="Noclegi"
                Icon={Home}
                isOpen={openSection === 'stay'}
                onToggle={handleToggle}
              >
                <StaySection />
              </AccordionSection>

              <AccordionSection
                id="contact"
                title="Kontakt"
                Icon={Phone}
                isOpen={openSection === 'contact'}
                onToggle={handleToggle}
              >
                <ContactSection phase={phase} />
              </AccordionSection>
            </>
          )}

          {/* ===== DURING WEDDING ===== */}
          {phase === 'during' && (
            <>
              <AccordionSection
                id="plan"
                title="Plan dnia"
                Icon={Clock}
                isOpen={openSection === 'plan'}
                onToggle={handleToggle}
              >
                <DayPlanSection />
              </AccordionSection>

              <AccordionSection
                id="attractions"
                title="Atrakcje"
                Icon={Star}
                isOpen={openSection === 'attractions'}
                onToggle={handleToggle}
              >
                <AttractionsSection />
              </AccordionSection>

              <AccordionSection
                id="quiz"
                title="Quiz"
                Icon={HelpCircle}
                isOpen={openSection === 'quiz'}
                onToggle={handleToggle}
              >
                <QuizSection />
              </AccordionSection>

              <AccordionSection
                id="contact"
                title="Kontakt"
                Icon={Phone}
                isOpen={openSection === 'contact'}
                onToggle={handleToggle}
              >
                <ContactSection phase={phase} />
              </AccordionSection>
            </>
          )}

        </div>
      )}

      {/* Footer gallery — only during */}
      {phase === 'during' && (
        <>
          <div style={{ height: '0.5rem' }} />
          <FooterGallerySection />
        </>
      )}

      {/* ===== AFTER WEDDING ===== */}
      {phase === 'after' && (
        <div className="info-accordion">
          <section className="info-thankyou">
            <p className="info-thankyou__text info-thankyou__text--secondary">
              Zdjęcia będą dostępne do oglądania już w tym tygodniu.
            </p>
          </section>

          <AccordionSection
            id="contact"
            title="Kontakt"
            Icon={Phone}
            isOpen={openSection === 'contact'}
            onToggle={handleToggle}
          >
            <ContactSection phase={phase} />
          </AccordionSection>
        </div>
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
