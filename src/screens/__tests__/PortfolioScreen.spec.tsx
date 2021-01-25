import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { PortfolioScreen } from '../PortfolioScreen';
import { getCoinData } from '../../service/API';
import { CoinListing } from '../../types';

jest.mock('../../util', () => ({
  generateOneWeekDataSet: jest.fn().mockImplementation(() => 'mock'),
  convertToCurrency: (input: any) => input,
  sortObjectArrayByField: (array: any[]) => array,
}));

describe('PortfolioScreen', () => {
  let sampleCoinData = [] as CoinListing[];
  beforeEach(async () => {
    jest.useFakeTimers();
    // workaround for timers inside promises here: https://stackoverflow.com/questions/62993577
    const promise = getCoinData();
    jest.advanceTimersByTime(3000);
    sampleCoinData = await promise;
  });

  it('should match snapshot with coin list data while isLoading is true', () => {
    const mockData = { coinList: sampleCoinData };
    const portfolioAction = {
      sortByCoinName: jest.fn(),
      selectCoinGraph: jest.fn(),
      fetchCoinList: jest.fn(),
    };
    const renderItem = TestRenderer.create(
      <PortfolioScreen
        portfolioAction={portfolioAction}
        portfolio={mockData}
      />,
    );
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
  it('should match snapshot with coin list data while isLoading is false', () => {
    const mockData = { coinList: sampleCoinData };
    const portfolioAction = {
      sortByCoinName: jest.fn(),
      selectCoinGraph: jest.fn(),
      fetchCoinList: jest.fn(),
    };
    let renderItem;
    act(() => {
      renderItem = TestRenderer.create(
        <PortfolioScreen
          portfolioAction={portfolioAction}
          portfolio={mockData}
        />,
      );
    });
    expect(portfolioAction.fetchCoinList).toBeCalledTimes(1);
    const callback = portfolioAction.fetchCoinList.mock.calls[0][0];
    callback(); // trigger callback to set isLoading to false
    expect(renderItem.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot with coin graph and isLoading is false', async () => {
    const mockData = {
      coinList: sampleCoinData,
      selectedCoinGraph: {
        name: 'XRP',
        data: {
          labels: ['1', '2', '3'],
          datasets: [{ data: [4, 5, 6] }],
        },
      },
    };
    const portfolioAction = {
      sortByCoinName: jest.fn(),
      selectCoinGraph: jest.fn(),
      fetchCoinList: jest.fn(),
    };
    let renderItem;
    act(() => {
      renderItem = TestRenderer.create(
        <PortfolioScreen
          portfolioAction={portfolioAction}
          portfolio={mockData}
        />,
      );
    });
    expect(portfolioAction.fetchCoinList).toBeCalledTimes(1);
    const callback = portfolioAction.fetchCoinList.mock.calls[0][0];
    callback(); // trigger callback to set isLoading to false
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
});
