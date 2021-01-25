import {
  GET_LATEST_COIN_DATA_START,
  GET_LATEST_COIN_DATA_SUCCESS,
  GET_LATEST_COIN_DATA_FAILURE,
  SORT_BY_NAME,
  SELECT_COIN_GRAPH,
} from './constants';

type DataSet = {
  data: number[];
  color?: () => string;
};

export type GraphData = {
  labels: string[];
  datasets: DataSet[];
};

export interface CoinListing {
  name: string;
  price: string;
  quantity: string;
  change24hour: number;
  history?: GraphData;
}

export interface PortfoloState {
  coinList: CoinListing[];
  selectedCoinGraph?: {
    name: string;
    data: GraphData;
  };
}

export type PortfolioActionType =
  | GetCoinListStartActionType
  | GetCoinListSuccessActionType
  | GetCoinListFailureActionType
  | SortCoinListActionType
  | SelectCoinForGraphActionType;

export type GetCoinListStartActionType = {
  type: typeof GET_LATEST_COIN_DATA_START;
};

export type GetCoinListSuccessActionType = {
  type: typeof GET_LATEST_COIN_DATA_SUCCESS;
  newCoinList: CoinListing[];
};

export type GetCoinListFailureActionType = {
  type: typeof GET_LATEST_COIN_DATA_FAILURE;
};

export type SortCoinListActionType = {
  type: typeof SORT_BY_NAME;
  ascending: boolean;
};

export type SelectCoinForGraphActionType = {
  type: typeof SELECT_COIN_GRAPH;
  selectedCoin: CoinListing;
};
