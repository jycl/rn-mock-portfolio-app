import React from 'react';
import TestRenderer from 'react-test-renderer';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('should match snapshot rendering', () => {
    const renderItem = TestRenderer.create(<LoadingIndicator />);
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
});
