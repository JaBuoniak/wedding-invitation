export type WeddingPhase = 'before' | 'during' | 'after';

// Dzień ślubu: 13 czerwca 2026
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 5; // 0-indexed
const WEDDING_DAY = 13;
const WEDDING_HOUR = 15;
const SEAT_SEARCH_END_HOUR = 18;
const TRAVEL_END_HOUR = 17;

export const getSimulatedNow = (): Date => {
  const params = new URLSearchParams(window.location.search);
  const simDay = params.get('day');
  const simTime = params.get('time');
  
  if (simDay !== null || simTime !== null) {
    const now = new Date();
    const day = simDay !== null ? Number(simDay) : now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (simTime !== null) {
      const parts = simTime.split(':');
      hours = Number(parts[0]);
      minutes = parts[1] ? Number(parts[1]) : 0;
    }
    // Używamy roku i miesiąca wesela, żeby symulować poprawny kontekst
    return new Date(WEDDING_YEAR, WEDDING_MONTH, day, hours, minutes);
  }
  return new Date();
};

export const isTravelVisible = (): boolean => {
  const phase = getWeddingPhase();
  if (phase === 'before') return true;
  if (phase === 'after') return false;

  // W fazie 'during' pokazujemy dojazd tylko do 17:00
  const now = getSimulatedNow();
  return now < new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY, TRAVEL_END_HOUR);
};

export const isSeatSearchActive = (): boolean => {
  const phase = getWeddingPhase();
  if (phase !== 'during') return false;

  // Wyszukiwarka dostępna tylko do 18:00 dnia ślubu
  const now = new Date(); // Zostawmy lub zmieńmy na getSimulatedNow()
  const simulatedNow = getSimulatedNow();
  return simulatedNow < new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY, SEAT_SEARCH_END_HOUR);
};

export const getWeddingPhase = (): WeddingPhase => {
  // Nadpisanie przez URL: ?phase=before | during | after (tylko dev/podgląd)
  const param = new URLSearchParams(window.location.search).get('phase');
  if (param === 'before' || param === 'during' || param === 'after') {
    return param;
  }

  const now = getSimulatedNow();
  const weddingDay = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY, weddingHourOverride() || WEDDING_HOUR);
  const dayAfter = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY + 2);

  if (now < weddingDay) return 'before';
  if (now < dayAfter) return 'during';
  return 'after';
};

// Pomocnicza funkcja do ewentualnego nadpisania godziny ślubu jeśli potrzebne
const weddingHourOverride = () => null;
