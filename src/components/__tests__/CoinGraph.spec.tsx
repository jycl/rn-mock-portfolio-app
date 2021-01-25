import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import CoinGraph from '../CoinGraph';

describe('CoinGraph component', () => {
  let componentRoot: ReactTestRenderer;
  it('should match snapshot render with defined props', () => {
    const data = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{ data: [1.2, 13.2, 54, 2, 6.3] }],
    };
    act(() => {
      componentRoot = create(<CoinGraph data={data} name="BTC" />);
    });
    expect(componentRoot.toJSON()).toMatchSnapshot();
  });

  it('should not render component if data is not defined', () => {
    act(() => {
      // @ts-expect-error: handling if data is not defined
      componentRoot = create(<CoinGraph name="BTC" />);
    });
    expect(componentRoot.toJSON()).toStrictEqual(null);
  });
});
