import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type PropsType = {
  lowerColor?: string;
  upper: string;
  lower: string | number;
  containerStyle?: ViewStyle;
};

/**
 * Common component for row item of larger font sitting on top of
 * smaller font in a column.
 */
export default function RowPair({
  lowerColor,
  upper,
  lower,
  containerStyle,
}: PropsType) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.upper}>{upper}</Text>
      <Text style={[styles.lower, { color: lowerColor }]}>{lower}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  upper: {
    color: 'white',
    fontSize: 18,
  },
  lower: {
    fontSize: 14,
  },
});
