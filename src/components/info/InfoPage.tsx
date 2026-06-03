import { useState, useEffect } from 'react';
import { Navigation, Home, Phone, Clock, Star, HelpCircle, Utensils } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import WelcomeSection from './WelcomeSection';
import GallerySection from './GallerySection';
import AccordionSection from './AccordionSection';
import TravelSection from './TravelSection';
import StaySection from './StaySection';
import FoodSection from './FoodSection';
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
  slug?: string;
}

const InfoPage = ({ phase: propsPhase, slug }: InfoPageProps) => {
  const phase = propsPhase || getWeddingPhase();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [hasHouse, setHasHouse] = useState<boolean | null>(null);
  const [stayData, setStayData] = useState<{
    slug: string | null;
    houseNumber: string | null;
    guestCount: number;
    before: boolean;
    after: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchGuestStay = async () => {
      const activeSlug = slug || new URLSearchParams(window.location.search).get('slug');
      if (!activeSlug) {
        // Wersja uniwersalna: pokazuj sekcje
        setHasHouse(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('guests')
          .select('house_number, before, after')
          .eq('invitation_slug', activeSlug);

        if (error) {
          console.error('Error fetching guest stay:', error);
          setHasHouse(false);
        } else if (data && data.length > 0) {
          const firstWithHouse = data.find(g => g.house_number !== null && g.house_number !== undefined);
          const houseNumber = firstWithHouse ? firstWithHouse.house_number : null;
          
          if (houseNumber) {
            setHasHouse(true);
            setStayData({
              slug: activeSlug,
              houseNumber,
              guestCount: data.length,
              before: data[0].before || false,
              after: data[0].after || false,
            });
          } else {
            setHasHouse(false);
          }
        } else {
          setHasHouse(false);
        }
      } catch (err) {
        console.error('Unexpected error fetching stay check:', err);
        setHasHouse(false);
      }
    };

    fetchGuestStay();
  }, [slug]);

  // Wyszukiwarka miejsc dostępna tylko w dniu wesela (do 18:00)
  const showSeatSearch = isSeatSearchActive();
  const showTravel = isTravelVisible();

  const handleToggle = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const activeSlug = slug || new URLSearchParams(window.location.search).get('slug');
  if (hasHouse === null && activeSlug) {
    return null; // Oczekiwanie na weryfikację bazy danych
  }

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

            {hasHouse && (
              <AccordionSection
                id="stay"
                title="Noclegi"
                Icon={Home}
                isOpen={openSections.includes('stay')}
                onToggle={handleToggle}
              >
                <StaySection slug={slug} stayData={stayData} />
              </AccordionSection>
            )}

            {hasHouse && (
              <AccordionSection
                id="food"
                title="Jedzenie"
                Icon={Utensils}
                isOpen={openSections.includes('food')}
                onToggle={handleToggle}
              >
                <FoodSection />
              </AccordionSection>
            )}

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
            
            {hasHouse && showTravel && (
              <AccordionSection
                id="stay"
                title="Noclegi"
                Icon={Home}
                isOpen={openSections.includes('stay')}
                onToggle={handleToggle}
              >
                <StaySection slug={slug} stayData={stayData} />
              </AccordionSection>
            )}

            {hasHouse && showTravel && (
              <AccordionSection
                id="food"
                title="Jedzenie"
                Icon={Utensils}
                isOpen={openSections.includes('food')}
                onToggle={handleToggle}
              >
                <FoodSection />
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
