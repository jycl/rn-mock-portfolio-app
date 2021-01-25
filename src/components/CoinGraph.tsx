import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GraphData } from '../types';

const { width, height } = Dimensions.get('window');

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

type PropsType = {
  data: GraphData;
  name: string;
};

/**
 * CoinGraph component to display historical data of selected
 * cryptocurrency prices.
 */
export default function CoinGraph({ data, name }: PropsType) {
  if (!data) {
    return null;
  }
  return (
    <>
      <Text style={styles.graphHeader}>{name}</Text>
      <LineChart
        data={data}
        width={width}
        height={height * 0.25}
        chartConfig={chartConfig}
      />
    </>
  );
}

const styles = StyleSheet.create({
  graphHeader: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 16,
  },
});
