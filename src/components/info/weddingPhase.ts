export type WeddingPhase = 'before' | 'during' | 'after';

// Dzień ślubu: 13 czerwca 2026
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 5; // 0-indexed
const WEDDING_DAY = 13;

export const getWeddingPhase = (): WeddingPhase => {
  // Nadpisanie przez URL: ?phase=before | during | after (tylko dev/podgląd)
  const param = new URLSearchParams(window.location.search).get('phase');
  if (param === 'before' || param === 'during' || param === 'after') {
    return param;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingDay = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY);
  const dayAfter = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY + 2);

  if (today < weddingDay) return 'before';
  if (today < dayAfter) return 'during';
  return 'after';
};
