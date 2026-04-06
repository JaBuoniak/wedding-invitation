// TODO: Uzupełnij plan dnia właściwymi godzinami i wydarzeniami
const DAY_PLAN = [
  { time: '15:00', event: 'Ceremonia ślubna — Kościół św. Kazimierza Królewicza, Giżycko' },
  { time: '17:00', event: 'Wyjazd na miejsce wesela' },
  { time: '18:00', event: 'Powitanie gości w Tawernie Piękny Brzeg' },
  { time: '18:30', event: 'Czas na taniec i zabawę' },
  { time: '21:00', event: 'Tort weselny' },
  { time: '02:00', event: 'Poprawiny — śniadanie następnego dnia' },
];

const DayPlanSection = () => {
  return (
    <div className="info-dayplan">
      {DAY_PLAN.map((item, index) => (
        <div className="info-dayplan__item" key={index}>
          <div className="info-dayplan__dot" />
          <span className="info-dayplan__time">{item.time}</span>
          <span className="info-dayplan__event">{item.event}</span>
        </div>
      ))}
    </div>
  );
};

export default DayPlanSection;
