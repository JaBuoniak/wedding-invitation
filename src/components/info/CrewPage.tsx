import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Navigation, Phone, Clock, Star } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import TravelSection from './TravelSection';
import AttractionsSection from './AttractionsSection';
import AccordionSection from './AccordionSection';
import imageHeader from '../../assets/photo/header/sn42.jpg';
import './info.css';

type ScheduleItem = {
  id: number;
  day: number;
  hour: number;
  minute: number;
  duration: number | null;
  title: string;
  description: string | null;
  is_visible: boolean;
};

const PROVIDER_NAMES: Record<string, string> = {
  novussteam: 'Novuss Team',
  lipnestudio: 'Lipne Studio',
  pawlik: 'Piotr',
  tawerna: 'Tawerna Piękny Brzeg',
  swiadek: 'Świadek',
};

const FULL_CONTACTS = [
  { name: 'Ania', role: 'Panna Młoda', phone: '+48504094280', display: '504 094 280' },
  { name: 'Paweł', role: 'Pan Młody', phone: '+48600228402', display: '600 228 402' },
  { name: 'Krzysiek', role: 'Świadek', phone: '+48737458879', display: '737 458 879' },
  { name: 'Renia', role: 'Świadkowa', phone: '+48880422968', display: '880 422 968' },
  { name: 'Piękny Brzeg', role: 'Recepcja', phone: '+48570955544', display: '570 955 544' },
];

const CrewPage = () => {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<string[]>(['plan', 'contacts']);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const providerKey = provider?.toLowerCase() || '';
  const providerName = PROVIDER_NAMES[providerKey] || 'Obsługa';

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from('schedule')
        .select('*')
        .order('day', { ascending: true })
        .order('hour', { ascending: true })
        .order('minute', { ascending: true });

      if (!error && data) {
        setSchedule(data);
      }
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  // Logika podświetlania aktywnego punktu planu
  useEffect(() => {
    if (schedule.length === 0) return;

    const updateActiveItem = () => {
      // Obsługa symulacji czasu przez URL np. ?day=0&time=15:30 (ułatwia testowanie)
      let now = new Date();
      const simDay = searchParams.get('day');
      const simTime = searchParams.get('time');
      
      if (simDay !== null && simTime !== null) {
        const [hours, minutes] = simTime.split(':').map(Number);
        const dayOffset = Number(simDay);
        // Dzień 0 to 13 Czerwca 2026
        now = new Date(2026, 5, 13 + dayOffset, hours, minutes);
      }

      let activeId: number | null = null;
      for (let i = 0; i < schedule.length; i++) {
        const item = schedule[i];
        // Dzień 0 -> 13 czerwca, dzień 1 -> 14 czerwca
        const itemStart = new Date(2026, 5, 13 + item.day, item.hour, item.minute);
        
        if (now >= itemStart) {
          if (i < schedule.length - 1) {
            const nextItem = schedule[i + 1];
            const nextItemStart = new Date(2026, 5, 13 + nextItem.day, nextItem.hour, nextItem.minute);
            if (now < nextItemStart) {
              activeId = item.id;
              break;
            }
          } else {
            // Ostatnie zdarzenie w harmonogramie
            activeId = item.id;
            break;
          }
        }
      }
      setActiveItemId(activeId);
    };

    updateActiveItem();
    const interval = setInterval(updateActiveItem, 30000); // aktualizacja co 30 sekund
    return () => clearInterval(interval);
  }, [schedule, searchParams]);

  const handleToggle = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Sprawdzenie czy dany punkt jest w przeszłości
  const activeIndex = schedule.findIndex((item) => item.id === activeItemId);
  const isItemPast = (index: number) => {
    if (activeIndex === -1) {
      let now = new Date();
      const simDay = searchParams.get('day');
      const simTime = searchParams.get('time');
      if (simDay !== null && simTime !== null) {
        const [hours, minutes] = simTime.split(':').map(Number);
        const dayOffset = Number(simDay);
        now = new Date(2026, 5, 13 + dayOffset, hours, minutes);
      }
      const lastItem = schedule[schedule.length - 1];
      if (lastItem) {
        const lastItemStart = new Date(2026, 5, 13 + lastItem.day, lastItem.hour, lastItem.minute);
        if (now > lastItemStart) {
          return true;
        }
      }
      return false;
    }
    return index < activeIndex;
  };

  // Sprawdzenie czy pokazujemy wskazówki dojazdu (znika po 17:00 dnia ślubu)
  const showTravel = (() => {
    let now = new Date();
    const simDay = searchParams.get('day');
    const simTime = searchParams.get('time');
    if (simDay !== null && simTime !== null) {
      const [hours, minutes] = simTime.split(':').map(Number);
      const dayOffset = Number(simDay);
      now = new Date(2026, 5, 13 + dayOffset, hours, minutes);
    }
    const travelCutoff = new Date(2026, 5, 13, 17, 0);
    return now < travelCutoff;
  })();

  if (loading) {
    return (
      <div className="info-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-light)' }}>Wczytywanie strefy obsługi...</p>
      </div>
    );
  }

  return (
    <div className="info-page crew-page">
      {/* NAGŁÓWEK Z PERSONALIZOWANYM POWITANIEM */}
      <section className="info-welcome crew-welcome">
        <img
          src={imageHeader}
          alt="Ania i Paweł"
          className="info-welcome__photo"
        />
        <div className="crew-welcome__badge">STREFA OBSŁUGI</div>
        <h2 className="crew-welcome__provider-title">Cześć, {providerName}!</h2>
        <p className="info-welcome__message" style={{ fontSize: '0.9rem', maxWidth: '340px' }}>
          Przygotowaliśmy dla Ciebie zestaw niezbędnych informacji. Znajdziesz tu pełny plan (w tym kwestie techniczne), dojazdy, kontakty i atrakcje.
        </p>
      </section>

      {/* AKORDEONY Z ZAWARTOŚCIĄ */}
      <div className="info-accordion" style={{ marginTop: '1rem' }}>
        
        {/* AKORDEON: DOJAZD (Tylko do godziny 17:00 pierwszego dnia) */}
        {showTravel && (
          <AccordionSection
            id="travel"
            title="Wskazówki Dojazdu"
            Icon={Navigation}
            isOpen={openSections.includes('travel')}
            onToggle={handleToggle}
          >
            <TravelSection />
          </AccordionSection>
        )}

        {/* AKORDEON: PLAN DNIA */}
        <AccordionSection
          id="plan"
          title="Szczegółowy Harmonogram"
          Icon={Clock}
          isOpen={openSections.includes('plan')}
          onToggle={handleToggle}
        >
          <div className="crew-schedule-legend">
            <span className="crew-legend-item"><span className="crew-dot crew-dot--guest" /> Dla gości</span>
            <span className="crew-legend-item"><span className="crew-dot crew-dot--tech" /> Organizacyjne</span>
          </div>

          <div className="info-dayplan crew-dayplan">
            {schedule.map((item, index) => {
              const isActive = item.id === activeItemId;
              const isTech = !item.is_visible;
              const isPast = isItemPast(index);
              const isTight = !item.description && !item.duration;

              return (
                <div 
                  className={`info-dayplan__item crew-dayplan__item ${isActive ? 'crew-dayplan__item--active' : ''} ${isTech ? 'crew-dayplan__item--tech' : 'crew-dayplan__item--guest'} ${isPast ? 'crew-dayplan__item--past' : ''} ${isTight ? 'crew-dayplan__item--tight' : ''}`}
                  key={item.id}
                >
                  <div className={`info-dayplan__dot crew-dayplan__dot ${isActive ? 'crew-dayplan__dot--active' : ''} ${isTech ? 'crew-dayplan__dot--tech' : 'crew-dayplan__dot--guest'} ${isPast ? 'crew-dayplan__dot--past' : ''}`} />
                  
                  <div className="crew-dayplan__time-container">
                    <span className="info-dayplan__time">
                      {String(item.hour).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="info-dayplan__content" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="info-dayplan__title" style={{ fontWeight: isActive ? '600' : '500' }}>
                        {item.title}
                      </span>
                      {isActive && <span className="crew-active-badge">Teraz</span>}
                    </div>
                    {item.description && (
                      <span className="info-dayplan__description">{item.description}</span>
                    )}
                    {item.duration && (
                      <span className="crew-duration-tag">Czas trwania: {item.duration} min</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* AKORDEON: ATRAKCJE */}
        <AccordionSection
          id="attractions"
          title="Atrakcje Weselne"
          Icon={Star}
          isOpen={openSections.includes('attractions')}
          onToggle={handleToggle}
        >
          <AttractionsSection phase="during" />
        </AccordionSection>

        {/* AKORDEON: KONTAKT */}
        <AccordionSection
          id="contacts"
          title="Spis Kontaktów"
          Icon={Phone}
          isOpen={openSections.includes('contacts')}
          onToggle={handleToggle}
        >
          <div className="info-contact__items">
            {FULL_CONTACTS.map((contact) => (
              <div className="info-contact__item" key={contact.phone}>
                <div>
                  <p className="info-contact__person">{contact.name}</p>
                  <p className="info-contact__role">{contact.role}</p>
                </div>
                <a
                  id={`btn-call-${contact.name.toLowerCase().replace(/\s/g, '-')}`}
                  href={`tel:${contact.phone}`}
                  className="info-contact__phone-btn"
                >
                  {contact.display}
                </a>
              </div>
            ))}
          </div>
        </AccordionSection>

      </div>

      <footer
        style={{
          textAlign: 'center',
          padding: '2rem 1.5rem 2rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-light)',
        }}
      >
        &copy; {new Date().getFullYear()} Ania &amp; Paweł · Strefa Obsługi
      </footer>
    </div>
  );
};

export default CrewPage;
