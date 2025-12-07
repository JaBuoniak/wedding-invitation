import { MapPin } from 'lucide-react';

const LocationMap = () => {
    return (
        <section className="section">
            <h2>Lokalizacja</h2>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                    <MapPin size={24} style={{ marginRight: '0.5rem' }} />
                    <h3>Kościół</h3>
                </div>
                <p>Kościół św. Anny</p>
                <p style={{ color: 'var(--color-text-light)' }}>Krakowskie Przedmieście 68, Warszawa</p>

                <div style={{ marginTop: '1rem', width: '100%', height: '250px', backgroundColor: '#eee', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.435742469956!2d21.01103231579738!3d52.22917597975993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1625654323456!5m2!1spl!2spl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        title="Church Location"
                    ></iframe>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                    <MapPin size={24} style={{ marginRight: '0.5rem' }} />
                    <h3>Wesele</h3>
                </div>
                <p>Restauracja "Pod Gigantami"</p>
                <p style={{ color: 'var(--color-text-light)' }}>Aleje Ujazdowskie 24, Warszawa</p>
            </div>
        </section>
    );
};

export default LocationMap;
