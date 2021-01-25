import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import CoinInfoHeader from '../CoinInfoHeader';

describe('CoinInfoHeader component', () => {
  it('should match snapshot render with defined props', () => {
    const headerRender = create(<CoinInfoHeader />);
    expect(headerRender.toJSON()).toMatchSnapshot();
  });

  it('should invoke callback on press coin sort button', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<CoinInfoHeader onCoinHeaderCb={spy} />);
    fireEvent.press(getByTestId('testID_sort_by_name'));
    expect(spy).toBeCalledTimes(1);
  });
});
