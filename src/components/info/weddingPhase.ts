export type WeddingPhase = 'before' | 'during' | 'after';

// Dzień ślubu: 13 czerwca 2026
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 5; // 0-indexed
const WEDDING_DAY = 13;
const WEDDING_HOUR = 15;

export const getWeddingPhase = (): WeddingPhase => {
  // Nadpisanie przez URL: ?phase=before | during | after (tylko dev/podgląd)
  const param = new URLSearchParams(window.location.search).get('phase');
  if (param === 'before' || param === 'during' || param === 'after') {
    return param;
  }

  const now = new Date();
  const weddingDay = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY, WEDDING_HOUR);
  const dayAfter = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY + 2);

  if (now < weddingDay) return 'before';
  if (now < dayAfter) return 'during';
  return 'after';
};
