import { MapPin } from 'lucide-react';

const LocationMap = () => {
    return (
        <section className="section">
            <h2>Lokalizacja</h2>
            
            <div className="mb-3">
                <div className="d-flex items-center justify-center mb-05 text-primary">
                    <MapPin size={24} style={{ marginRight: '0.5rem' }} />
                    <h3>Ślub</h3>
                </div>
                <p>Kościół św. Kazimierza Królewicza</p>
                <p className="text-muted">Tadeusza Kościuszki 12, Giżycko</p>

                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.0585332401037!2d21.773140549274345!3d54.04044553956924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e187dbee67432f%3A0xe079e92d230c68b7!2sParafia%20%C5%9Bw.%20Kazimierza%20Kr%C3%B3lewicza!5e0!3m2!1spl!2spl!4v1765122262785!5m2!1spl!2spl"
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
                <div className="d-flex items-center justify-center mb-05 text-primary">
                    <MapPin size={24} style={{ marginRight: '0.5rem' }} />
                    <h3>Wesele</h3>
                </div>
                <p>Tawerna "Piękny Brzeg"</p>
                <p className="text-muted">Leśna 18, Węgorzewo</p>

                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2334.4850094730355!2d21.7600685!3d54.1891959!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e22b1965ef6ee1%3A0x2def141548fb5476!2sO%C5%9Brodek%20Wypoczynkowy%20Pi%C4%99kny%20Brzeg!5e0!3m2!1spl!2spl!4v1765122862298!5m2!1spl!2spl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        title="Party Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default LocationMap;
