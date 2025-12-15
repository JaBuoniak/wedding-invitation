import SeagullDecoration from './decorations/SeagullDecoration';

const HomePage = () => {
    return (
        <div className="container text-center p-4 d-flex flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="mb-3 d-flex justify-center" style={{ width: '100%' }}>
                <SeagullDecoration variant="buoy1" width="150px" />
            </div>

            <h1 className="mb-2">Ania & Paweł</h1>
            <p className="mb-1 text-lg">Aby zobaczyć zaproszenie</p>
            <p className="text-xl font-semibold text-primary">zeskanuj kod QR</p>
            <p className="text-sm text-muted mt-1">(znajduje się na zaproszeniu papierowym)</p>

            <div className="mt-3 pt-2 border-top" style={{ borderColor: 'var(--color-border)', width: '100%', maxWidth: '300px' }}>
                <p className="text-sm text-muted mb-1">Problem z kodem? Zadzwoń:</p>
                <div className="d-flex justify-center" style={{ gap: '3rem' }}>
                    <a href="tel:+48504094280" className="text-primary text-sm font-semibold">Ania <br /> 504 094 280</a>
                    <a href="tel:+48600228402" className="text-primary text-sm font-semibold">Paweł <br /> 600 228 402</a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
