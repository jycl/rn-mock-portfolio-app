import moment from 'moment';
import { GraphData } from '../types';

type KeyValueType = { [key: string]: any };

// option to use react-intl or Intl libraries if additional currencies need to be handled
export function convertToCurrency(num: number | string): string {
  const trueNumber = Number(num);
  if (isNaN(trueNumber)) {
    return String(num);
  }
  const negative = trueNumber < 0 ? '-' : '';
  const isUnderDollar = trueNumber > 0 && trueNumber < 1;
  return `${negative}$${Math.abs(trueNumber).toFixed(isUnderDollar ? 6 : 2)}`;
}

/**
 * Return new sorted Object array by the field (key) value in each object.
 * Can be ascending or descending order:
 * asc = (a,b) => smaller moves to front, larger to back
 */
export function sortObjectArrayByField<T>(
  array: { [key: string]: any } | T[],
  field: string,
  order: 'asc' | 'desc',
): T[] {
  const sortedList = array
    .slice(0)
    .sort((lhs: KeyValueType, rhs: KeyValueType) => {
      const whenLarger = order === 'asc' ? 1 : -1; // -1 moves to lower
      return lhs[field] > rhs[field] ? whenLarger : -whenLarger;
    });
  return sortedList;
}

const DAYS_IN_WEEK = 7;

/**
 * Generate random data entries for each cryptocurrency data
 * to display on LineChart (CoinGraph component).
 */
export function generateOneWeekDataSet(
  price: number,
  change24hour: number,
): GraphData {
  // generate labels for past week
  const labels = [...Array(DAYS_IN_WEEK).keys()].map((val) => {
    return moment()
      .subtract(DAYS_IN_WEEK - 1 - val, 'days')
      .format('DD/MM');
  });
  const randomPercentChange = change24hour / 100;
  const genRandomPricePoint = () => {
    return price * (1 - randomPercentChange * Math.random()); // generate random below price
  };
  const data = [...Array(7).keys()].map((val) => {
    if (val === 7 - 1) return price;
    return genRandomPricePoint();
  });
  return {
    labels,
    datasets: [
      {
        data,
      },
    ],
  };
}
