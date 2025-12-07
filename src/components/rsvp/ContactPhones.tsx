
const ContactPhones = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
        <div>
            <a href="tel:+48504094280" className="text-muted text-sm">
            <strong>Ania</strong><br />
            +48 504 094 280</a>
        </div>
        <div>
            <a href="tel:+48600228402" className="text-muted text-sm">
            <strong>Paweł</strong><br />
            +48 600 228 402</a>
        </div> 
    </div>
);

export default ContactPhones;
