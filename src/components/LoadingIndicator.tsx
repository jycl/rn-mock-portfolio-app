import React, { useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Assets from '../assets';

/**
 * BitCoin logo loading indicator displayed when screen is loading.
 */
export default function LoadingIndicator() {
  const rotationDeg = useRef(new Animated.Value(0)).current;
  Animated.loop(
    Animated.timing(rotationDeg, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotationDeg.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Animated.Image
      style={[styles.image, { transform: [{ rotate: spin }] }]}
      source={Assets.btc}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
});
