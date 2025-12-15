import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from './Header';
import InvitationContent from './InvitationContent';
import LocationMap from './LocationMap';
import RsvpForm from './RsvpForm';
import AccommodationDetails from './AccommodationDetails';
import WaveDecoration from './decorations/WaveDecoration';
import YachtDecoration from './decorations/YachtDecoration';
import SeagullDecoration from './decorations/SeagullDecoration';

import HomePage from './HomePage';

// Typy zgodne z bazą danych
type Invitation = {
    slug: string;
    guest_who: string;
    guest_and: string | null;
    guest_with: string | null;
    max_adults: number;
    max_children: number;
    max_under10: number;
    max_under2: number;
};

const InvitationPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [invitation, setInvitation] = useState<Invitation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInvitation = async () => {
            if (!slug) {
                setError('Brak kodu zaproszenia w adresie strony.');
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('invitations')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching invitation:', error);
                setError('Nie znaleziono zaproszenia o podanym kodzie.');
            } else {
                setInvitation(data);
            }
            setLoading(false);
        };

        fetchInvitation();
    }, [slug]);

    if (loading) {
        return (
            <div className="d-flex flex-col items-center justify-center" style={{ minHeight: '100vh', opacity: 0.8 }}>
                <div className="d-flex justify-center" style={{ animation: 'pulse 2s infinite ease-in-out', width: '100%' }}>
                    <SeagullDecoration variant='buoy1' width='150px' />
                </div>
                <p className="text-muted mt-1 text-sm">Wczytywanie...</p>
            </div>
        );
    }

    if (error || !invitation) {
        return <HomePage />;
    }

    return (
        <div className="container">
            <Header />

            <main>
                <InvitationContent
                    who={invitation.guest_who}
                    and={invitation.guest_and}
                    with={invitation.guest_with}
                />

                <WaveDecoration />

                <LocationMap />

                <WaveDecoration />

                <AccommodationDetails />

                <WaveDecoration />

                <RsvpForm
                    slug={invitation.slug}
                    maxAdults={invitation.max_adults}
                    maxChildren={invitation.max_children}
                    maxUnder10={invitation.max_under10}
                    maxUnder2={invitation.max_under2}
                />
            </main>

            <footer className="text-center text-sm text-muted">
                <div className="mb-3">
                    <YachtDecoration />
                    <p>&copy; {new Date().getFullYear()} Ania & Paweł</p>
                </div>
            </footer>
        </div>
    );
};

export default InvitationPage;
