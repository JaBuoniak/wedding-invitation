import { supabase } from '../supabaseClient';

/**
 * Tracks a visit for a given slug.
 * Records every visit as a separate log entry with metadata.
 * 
 * @param slug The guest identifier or entered code
 * @param isValid Whether the slug was found in the invitations table
 */
export const trackVisit = async (slug: string, isValid: boolean) => {
    try {
        const metadata = {
            slug,
            user_agent: navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`
        };

        const table = isValid ? 'visits' : 'unknown_visits';

        const { error } = await supabase
            .from(table)
            .insert(metadata);

        if (error) {
            console.error(`Error tracking ${isValid ? 'valid' : 'unknown'} visit:`, error);
        }
    } catch (e) {
        console.error('Unexpected error tracking visit:', e);
    }
};
