import React from 'react';
import { create } from 'react-test-renderer';
import RowPair from '../RowPair';

describe('RowPair component', () => {
  it('should match snapshot given defined props', () => {
    const renderItem = create(<RowPair upper="Boss" lower="Underling" />);
    expect(renderItem.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot given defined style props', () => {
    const renderItem = create(
      <RowPair
        upper="Rainbow"
        lower="Pot of gold"
        containerStyle={{ borderRadius: 12, padding: 16 }}
        lowerColor="#FFFFFF"
      />,
    );
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
});
