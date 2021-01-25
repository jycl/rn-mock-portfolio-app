import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import CoinInfoItem from '../CoinInfoItem';

describe('CoinInfoItem component', () => {
  const mock = {
    name: 'BTC',
    price: '12.1201',
    quantity: '201',
    change24hour: 4.99,
    onPress: jest.fn(),
  };
  it('should match snapshot render with defined props for positive change', () => {
    const coinRender = create(<CoinInfoItem {...mock} />);
    expect(coinRender.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot render with defined props for negative change', () => {
    const localMock = {
      ...mock,
      change24hour: -3.25,
    };
    const coinRender = create(<CoinInfoItem {...localMock} />);
    expect(coinRender.toJSON()).toMatchSnapshot();
  });

  it('should invoke onPress callback on press component', () => {
    const { getByTestId } = render(<CoinInfoItem {...mock} />);
    fireEvent.press(getByTestId('testID_BTC'));
    expect(mock.onPress).toBeCalled();
  });
});
