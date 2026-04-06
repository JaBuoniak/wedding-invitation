import { useRef, useState } from 'react';
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
import ThankYouSection from './ThankYouSection';

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
  const accordionRef = useRef<HTMLDivElement>(null);

  // After wedding — show thank you page
  if (phase === 'after') {
    return <ThankYouSection />;
  }

  const handleToggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : (id as SectionId)));
  };

  const handleScrollToPlan = () => {
    setOpenSection('plan');
    setTimeout(() => {
      accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="info-page">
      <WelcomeSection onScrollToPlan={handleScrollToPlan} />

      <div style={{ height: '1.5rem' }} />

      <GallerySection />

      <div style={{ height: '1.5rem' }} />

      <div className="info-accordion" ref={accordionRef}>

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

      {/* Gallery repeat — always show during phase, show only first item before */}
      {phase === 'during' && (
        <>
          <div style={{ height: '0.5rem' }} />
          <FooterGallerySection />
        </>
      )}

      {phase === 'before' && (
        <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            Galeria zdjęć i filmów z wesela będzie dostępna 13 czerwca.
          </p>
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
