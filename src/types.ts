export type ZodiacSign = {
  id: string;
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
  emoji: string;
};

export type HoroscopeData = {
  sign: string;
  date: string;
  overview: string;
  love: string;
  career: string;
  luckyNumbers: number[];
  luckyColor: string;
  mood: string;
};
