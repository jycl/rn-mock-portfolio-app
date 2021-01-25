import { CoinListing } from '../types';
import { generateOneWeekDataSet } from '../util';

/**
 * Mock a fetch for data by using setTimeout.
 * Returns the example_portfolio array to display data.
 */
export function getCoinData(): Promise<CoinListing[]> {
  return new Promise((resolve) => {
    const time = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      const updatedData = example_portfolio.map((listing: CoinListing) => {
        return {
          ...listing,
          history: generateOneWeekDataSet(
            Number(listing.price),
            listing.change24hour,
          ),
        };
      });
      resolve(updatedData);
    }, time);
  });
}

export const example_portfolio: CoinListing[] = [
  {
    name: 'BTC',
    change24hour: 3.96,
    price: '7980.68431312',
    quantity: '123.10',
  },
  {
    name: 'ETH',
    change24hour: 4.78,
    price: '245.97123121',
    quantity: '123.10',
  },
  {
    name: 'LTC',
    change24hour: 4.28,
    price: '1.57213123',
    quantity: '123.10',
  },
  {
    name: 'XRP',
    change24hour: 2.67,
    price: '0.39845321',
    quantity: '123.10',
  },
  {
    name: 'BCH',
    change24hour: 4.26,
    price: '1.59845321',
    quantity: '123.10',
  },
  {
    name: 'USDT',
    change24hour: 2.67,
    price: '1.00000010',
    quantity: '123.10',
  },
];
