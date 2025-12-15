
import SeagullDecoration from '../decorations/SeagullDecoration';

const ContactPhones = () => (
    <div className="d-flex items-center justify-center gap-2 text-center">
        <div>
            <a href="tel:+48504094280" className="text-muted text-sm">
                <strong>Ania</strong><br />
                +48 504 094 280</a>
        </div>

        <SeagullDecoration variant="buoy2" width="60px" />

        <div>
            <a href="tel:+48600228402" className="text-muted text-sm">
                <strong>Paweł</strong><br />
                +48 600 228 402</a>
        </div>
    </div>
);

export default ContactPhones;
