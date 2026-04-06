// TODO: Uzupełnij listę atrakcji
const ATTRACTIONS = [
  'Kajaki i rowery wodne',
  'Wieczorny rejs po jeziorze',
  'Fotobudka',
  'Strefa dzieci',
  'Ognisko nad jeziorem',
];

const AttractionsSection = () => {
  return (
    <ul className="info-attractions">
      {ATTRACTIONS.map((item, index) => (
        <li className="info-attractions__item" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AttractionsSection;
