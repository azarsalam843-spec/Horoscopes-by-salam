import { ZodiacSign } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: 'Ram', element: 'Fire', dateRange: 'Mar 21 - Apr 19', emoji: '♈' },
  { id: 'taurus', name: 'Taurus', symbol: 'Bull', element: 'Earth', dateRange: 'Apr 20 - May 20', emoji: '♉' },
  { id: 'gemini', name: 'Gemini', symbol: 'Twins', element: 'Air', dateRange: 'May 21 - Jun 20', emoji: '♊' },
  { id: 'cancer', name: 'Cancer', symbol: 'Crab', element: 'Water', dateRange: 'Jun 21 - Jul 22', emoji: '♋' },
  { id: 'leo', name: 'Leo', symbol: 'Lion', element: 'Fire', dateRange: 'Jul 23 - Aug 22', emoji: '♌' },
  { id: 'virgo', name: 'Virgo', symbol: 'Virgin', element: 'Earth', dateRange: 'Aug 23 - Sep 22', emoji: '♍' },
  { id: 'libra', name: 'Libra', symbol: 'Balance', element: 'Air', dateRange: 'Sep 23 - Oct 22', emoji: '♎' },
  { id: 'scorpio', name: 'Scorpio', symbol: 'Scorpion', element: 'Water', dateRange: 'Oct 23 - Nov 21', emoji: '♏' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: 'Archer', element: 'Fire', dateRange: 'Nov 22 - Dec 21', emoji: '♐' },
  { id: 'capricorn', name: 'Capricorn', symbol: 'Goat', element: 'Earth', dateRange: 'Dec 22 - Jan 19', emoji: '♑' },
  { id: 'aquarius', name: 'Aquarius', symbol: 'Water Bearer', element: 'Air', dateRange: 'Jan 20 - Feb 18', emoji: '♒' },
  { id: 'pisces', name: 'Pisces', symbol: 'Fish', element: 'Water', dateRange: 'Feb 19 - Mar 20', emoji: '♓' },
];
