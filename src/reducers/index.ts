import {
  GET_LATEST_COIN_DATA_SUCCESS,
  SORT_BY_NAME,
  SELECT_COIN_GRAPH,
} from '../constants';
import { CoinListing, PortfolioActionType, PortfoloState } from '../types';
import { sortObjectArrayByField } from '../util';

const INITIAL_STATE = {
  coinList: [],
  selectedCoinGraph: undefined,
};

/**
 * Portfolio Reducer which contains reducer logic for actions related to the
 * loading and ordering cryptocurrency list on portfolio screen.
 */
export const portfolioReducer = (
  prevState: PortfoloState = INITIAL_STATE,
  action: PortfolioActionType,
): PortfoloState => {
  switch (action.type) {
    case GET_LATEST_COIN_DATA_SUCCESS:
      return {
        ...prevState,
        coinList: sortObjectArrayByField<CoinListing>(
          action.newCoinList,
          'name',
          'asc',
        ),
      };
    case SORT_BY_NAME:
      const order = action.ascending ? 'asc' : 'desc';
      return {
        ...prevState,
        coinList: sortObjectArrayByField<CoinListing>(
          prevState.coinList,
          'name',
          order,
        ),
      };
    case SELECT_COIN_GRAPH:
      if (action.selectedCoin.history) {
        return {
          ...prevState,
          selectedCoinGraph: {
            name: action.selectedCoin.name,
            data: action.selectedCoin.history,
          },
        };
      } else {
        return prevState;
      }
    default:
      return prevState;
  }
};
