import type { WeddingPhase } from './weddingPhase';

interface Contact {
  name: string;
  role: string;
  phone: string;
  display: string;
}

const CONTACTS_BEFORE: Contact[] = [
  { name: 'Ania', role: 'Panna Młoda', phone: '+48504094280', display: '504 094 280' },
  { name: 'Paweł', role: 'Pan Młody', phone: '+48600228402', display: '600 228 402' },
  // TODO: Dodaj numer recepcji ośrodka Piękny Brzeg
  // { name: 'Recepcja', role: 'Piękny Brzeg', phone: '+48XXXXXXXXX', display: 'XXX XXX XXX' },
];

const CONTACTS_DURING: Contact[] = [
  // TODO: Uzupełnij numery świadków i organizatora
  // { name: 'Świadek Panny Młodej', role: 'Świadek', phone: '+48XXXXXXXXX', display: 'XXX XXX XXX' },
  // { name: 'Świadek Pana Młodego', role: 'Świadek', phone: '+48XXXXXXXXX', display: 'XXX XXX XXX' },
  { name: 'Ania', role: 'Panna Młoda', phone: '+48504094280', display: '504 094 280' },
  { name: 'Paweł', role: 'Pan Młody', phone: '+48600228402', display: '600 228 402' },
];

interface ContactSectionProps {
  phase: WeddingPhase;
}

const ContactSection = ({ phase }: ContactSectionProps) => {
  const contacts = phase === 'during' ? CONTACTS_DURING : CONTACTS_BEFORE;

  return (
    <div className="info-contact__items">
      {contacts.map((contact) => (
        <div className="info-contact__item" key={contact.phone}>
          <div>
            <p className="info-contact__person">{contact.name}</p>
            <p className="info-contact__role">{contact.role}</p>
          </div>
          <a
            id={`btn-call-${contact.name.toLowerCase().replace(/\s/g, '-')}`}
            href={`tel:${contact.phone}`}
            className="info-contact__phone-btn"
          >
            {contact.display}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactSection;
