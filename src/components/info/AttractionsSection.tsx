import type { WeddingPhase } from './weddingPhase';

const ATTRACTIONS_BEFORE = [
  'Piaszczysta plaża i kąpielisko',
  'Dmuchany park wodny',
  'Wypożyczalnia sprzętu wodnego (kajaki, rowery)',
  'Boiska do siatkówki i koszykówki',
  'Korty tenisowe',
  'Plac zabaw dla dzieci',
  'Sauna i jacuzzi na jeziorze'
];

const ATTRACTIONS_DURING = [
  'Fotokącik',
  'Księga gości',
  'Self Drink Bar',
  'Wiejski stół z dziczyzną',
  'Gry XXL',
  'Sala zabaw Fikoland (17-20)',
  'Plac zabaw'
];

interface AttractionsSectionProps {
  phase: WeddingPhase;
}

const AttractionsSection = ({ phase }: AttractionsSectionProps) => {
  const list = phase === 'before' ? ATTRACTIONS_BEFORE : ATTRACTIONS_DURING;

  return (
    <ul className="info-attractions">
      {list.map((item, index) => (
        <li className="info-attractions__item" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AttractionsSection;
