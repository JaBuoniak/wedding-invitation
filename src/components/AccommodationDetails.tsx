
import SeagullDecoration from './decorations/SeagullDecoration';

const AccommodationDetails = () => {
    return (
        <section className="section">
            <div className="d-flex items-center justify-center gap-2" style={{ position: 'relative' }}>
                <h2>Noclegi</h2>
                <SeagullDecoration variant="sitting2" width="20%" style={{ position: 'absolute', right: '5%', top: '-10px' }} />
            </div>
            <p className="mb-1">
                Po weselu <u>zapewniamy nocleg</u> w <a href='https://pieknybrzeg.pl/domki-letniskowe-2/' target="_blank" rel="noopener noreferrer">przytulnych domkach</a> na terenie ośrodka.
            </p>
            <p className="mb-1">
                Jesteśmy przekonani, że nad urokliwym Jeziorem Święcajty zapragniecie spędzić cały weekend. Ośrodek posiada <a href='https://pieknybrzeg.pl/atrakcje/' target="_blank" rel="noopener noreferrer">wiele atrakcji</a> <strong>nie tylko dla dzieci</strong>.
            </p>
            <p>
                Jeśli się zdecydujecie, zaznaczcie to w formularzu poniżej, a my <u>zarezerwujemy domki</u>.
            </p>
        </section>
    );
};

export default AccommodationDetails;
