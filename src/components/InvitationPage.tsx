import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { trackVisit } from '../utils/visitTracker';
import SeagullDecoration from './decorations/SeagullDecoration';
import HomePage from './HomePage';
import InfoPage from './info/InfoPage';

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
                // Track unknown visit
                trackVisit(slug, false);
            } else {
                setInvitation(data);
                // Track valid visit
                trackVisit(slug, true);
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

    return <InfoPage slug={invitation.slug} />;
};

export default InvitationPage;
