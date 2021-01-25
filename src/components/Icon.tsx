import React, { ReactElement } from 'react';
import { Image, StyleSheet } from 'react-native';
import Assets from '../assets';

type PropsType = {
  name: string;
  color: string;
};

/**
 * Icon displayed in bottom tab bar.
 * @param name key used to map to image
 * @param color tint color of image (changes when tab is focused/selected)
 */
const Icon = ({ name, color }: PropsType): ReactElement => {
  return (
    <Image style={[styles.icon, { tintColor: color }]} source={Assets[name]} />
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
});
