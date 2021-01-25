import { portfolioReducer } from '../index';
import {
  GET_LATEST_COIN_DATA_SUCCESS,
  SORT_BY_NAME,
  SELECT_COIN_GRAPH,
} from '../../constants';
import * as API from '../../service/API';
import { sortObjectArrayByField } from '../../util';

const initialState = {
  coinList: [],
  selectedCoinGraph: undefined,
};

describe('authenticate reducer', () => {
  it('returns the initial state', () => {
    // @ts-expect-error: ignore this case to test initial state
    expect(portfolioReducer(undefined, {})).toEqual(initialState);
  });

  it('returns sorted coin list after successful fetch coin data action', () => {
    const sampleData = API.example_portfolio;
    expect(
      portfolioReducer(initialState, {
        type: GET_LATEST_COIN_DATA_SUCCESS,
        newCoinList: sampleData,
      }),
    ).toEqual({
      coinList: sortObjectArrayByField(sampleData, 'name', 'asc'),
      selectedCoinGraph: undefined,
    });
  });

  it('returns sorted coin list by name in descending order', () => {
    const sampleData = API.example_portfolio;
    expect(
      portfolioReducer(
        {
          ...initialState,
          coinList: sampleData,
        },
        {
          type: SORT_BY_NAME,
          ascending: false,
        },
      ),
    ).toEqual({
      coinList: sortObjectArrayByField(sampleData, 'name', 'desc'),
      selectedCoinGraph: undefined,
    });
  });

  it('returns sorted coin list by name in ascending order', () => {
    const sampleData = API.example_portfolio;
    expect(
      portfolioReducer(
        {
          ...initialState,
          coinList: sampleData,
        },
        {
          type: SORT_BY_NAME,
          ascending: true,
        },
      ),
    ).toEqual({
      coinList: sortObjectArrayByField(sampleData, 'name', 'asc'),
      selectedCoinGraph: undefined,
    });
  });

  it('returns prevState on select coin graph action is history is undefined', () => {
    expect(
      portfolioReducer(initialState, {
        type: SELECT_COIN_GRAPH,
        selectedCoin: {
          name: 'XRP',
          price: '1.60',
          quantity: '123.01',
          change24hour: 4.92,
          history: undefined,
        },
      }),
    ).toEqual(initialState);
  });

  it('updates selectedCoinGraph on select coin graph action is history is defined', () => {
    const inputHistory = {
      labels: ['1', '2', '3'],
      datasets: [{ data: [4, 5, 6] }],
    };
    expect(
      portfolioReducer(initialState, {
        type: SELECT_COIN_GRAPH,
        selectedCoin: {
          name: 'XRP',
          price: '1.60',
          quantity: '123.01',
          change24hour: 4.92,
          history: inputHistory,
        },
      }),
    ).toEqual({
      ...initialState,
      selectedCoinGraph: {
        name: 'XRP',
        data: inputHistory,
      },
    });
  });
});
