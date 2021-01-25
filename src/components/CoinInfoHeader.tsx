import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Assets from '../assets';

type PropsType = {
  onCoinHeaderCb?: (asc: boolean) => void;
};

/**
 * CoinInfoHeader component at the top of list cryptocurrency price.
 * Users can press the coin subheading to sort by name (asc, desc)
 * in a callback passed into onCoinHeaderCb.
 */
export default function CoinInfoHeader({ onCoinHeaderCb }: PropsType) {
  const [coinOrderAsc, setCoinOrderAsc] = useState(true);
  const onPressCoin = () => {
    onCoinHeaderCb && onCoinHeaderCb(!coinOrderAsc);
    setCoinOrderAsc((prev) => !prev);
  };
  return (
    <View style={[styles.container, styles.padding]}>
      <Pressable
        testID="testID_sort_by_name"
        style={styles.coinNameContainer}
        onPress={onPressCoin}>
        <Text style={styles.text}>Coin</Text>
        <Image
          style={[styles.arrow, coinOrderAsc && styles.inverted]}
          source={Assets.dropdown}
        />
      </Pressable>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>Price</Text>
      </View>
      <Pressable style={styles.valueContainer}>
        <Text style={styles.text}>Value</Text>
        <Image style={styles.icon} source={Assets.info} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingVertical: 8,
  },
  inverted: {
    transform: [{ scaleY: -1 }],
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#5C5C5C',
    marginLeft: 8,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  coinNameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#212121',
  },
  text: {
    color: '#808080',
    fontSize: 16,
  },
  arrow: {
    tintColor: 'grey',
    width: 24,
    height: 24,
  },
});
