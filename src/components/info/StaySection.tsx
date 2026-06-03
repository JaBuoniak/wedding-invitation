import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { ExternalLink, MapIcon } from 'lucide-react';

interface StayData {
  slug: string | null;
  houseNumber: string | null;
  guestCount: number;
  before: boolean;
  after: boolean;
}

interface StaySectionProps {
  slug?: string;
  stayData?: StayData | null;
}

const StaySection = ({ slug: propsSlug, stayData: propsStayData }: StaySectionProps) => {
  const [stayData, setStayData] = useState<StayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propsStayData) {
      setStayData(propsStayData);
      setLoading(false);
      return;
    }

    const fetchStayData = async () => {
      const slug = propsSlug || new URLSearchParams(window.location.search).get('slug');
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('guests')
          .select('house_number, before, after')
          .eq('invitation_slug', slug);

        if (error) {
          console.error('Error fetching stay details:', error);
        } else if (data && data.length > 0) {
          // Znajdź przypisany numer domku (jeśli istnieje)
          const firstWithHouse = data.find(g => g.house_number !== null && g.house_number !== undefined);
          const houseNumber = firstWithHouse ? firstWithHouse.house_number : null;
          const before = data[0].before || false;
          const after = data[0].after || false;

          setStayData({
            slug,
            houseNumber,
            guestCount: data.length,
            before,
            after,
          });
        }
      } catch (err) {
        console.error('Unexpected error fetching stay data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStayData();
  }, [propsSlug, propsStayData]);

  const showPersonalized = !loading && stayData && stayData.houseNumber;

  // Ustal godzinę zameldowania (wyjątek dla karas/S12)
  let checkInTime = '';
  if (stayData) {
    if (stayData.slug === 'karas') {
      checkInTime = 'w sobotę od 14';
    } else {
      checkInTime = stayData.before ? 'w piątek od 16' : 'w sobotę od 11';
    }
  }

  return (
    <div>
      <div className="info-logistics__block" style={{ marginBottom: '0.75rem' }}>
        <p className="info-logistics__subtitle">Zakwaterowanie</p>
        
        {showPersonalized ? (
          <>
            <p className="info-logistics__name">
              Domek {stayData.houseNumber} w ośrodku Piękny Brzeg
            </p>
            <p className="info-logistics__address">
              rezerwacja dla {stayData.guestCount} {stayData.guestCount === 1 ? 'osoby' : 'osób'}<br />
              zameldowanie: {checkInTime}<br />
              wymeldowanie: {stayData.after ? 'w poniedziałek do 11' : 'w niedzielę do 11'}
            </p>
          </>
        ) : (
          <>
            <p className="info-logistics__name">Domki w ośrodku Piękny Brzeg</p>
            <p className="info-logistics__address">
              Zameldowanie: od 16 (w dniu ślubu od 11)<br />
              Wymeldowanie: do 11
            </p>
          </>
        )}

        <div style={{
          border: '1.5px dashed var(--color-primary)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '0.75rem',
          backgroundColor: 'rgba(61, 117, 161, 0.05)',
        }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', margin: 0, textAlign: 'center' }}>
            Prosimy o <b>zabranie własnych ręczników</b>.
          </p>
        </div>
        <p className="info-logistics__subtitle">Pierwsze kroki</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
          Po przyjeździe zostawcie auto na parkingu przed główną bramą i bez bagaży udajcie się na recepcję (około 200 m na wprost od bramy i szlabanu).
        </p>
        <a
          id="btn-resort-map"
          href="https://pieknybrzeg.pl/wp-content/uploads/2025/08/mapa-www.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', marginBottom: '0.75rem' }}
        >
          <MapIcon size={16}/> Mapka ośrodka
        </a>
        <a
          id="btn-accommodation-details"
          href="https://pieknybrzeg.pl/domki-letniskowe-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', marginBottom: '0.75rem' }}
        >
          <ExternalLink size={16}/> Informacje o domkach
        </a>
        <a
          id="btn-resort-attractions"
          href="https://pieknybrzeg.pl/atrakcje/"
          target="_blank"
          rel="noopener noreferrer"
          className="info-btn info-btn--ghost"
          style={{ fontSize: '0.9rem', padding: '0.7rem 1rem' }}
        >
          <ExternalLink size={16}/> Atrakcje ośrodka
        </a>
      </div>
    </div>
  );
};

export default StaySection;
