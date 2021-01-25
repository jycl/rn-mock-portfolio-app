import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import RowPair from './RowPair';
import { convertToCurrency } from '../util';
import Assets from '../assets';

type PropsType = {
  name: string;
  price: string;
  quantity: string;
  change24hour: number;
  onPress?: () => void;
};

/**
 * renderItem component for FlatList in Portfolio screen for
 * cryptocurrencies.
 */
export default function CoinInfoItem({
  name,
  price,
  quantity,
  change24hour,
  onPress,
}: PropsType) {
  const change = `${Number(change24hour) > 0 ? '+' : '-'}${change24hour}%`;
  const key = name.toLowerCase();
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      testID={`testID_${name}`}>
      <View style={styles.coinContainer}>
        {!!Assets[key] && <Image style={styles.img} source={Assets[key]} />}
        <Text style={styles.text}>{name}</Text>
      </View>
      <RowPair
        containerStyle={styles.priceContainer}
        upper={convertToCurrency(price)}
        lower={change}
        lowerColor="green"
      />
      <RowPair
        containerStyle={styles.valueContainer}
        upper={convertToCurrency(Number(price) * Number(quantity))}
        lower={quantity}
        lowerColor="grey"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 64,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  coinContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingRight: 16,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  img: {
    width: 24,
    height: 24,
    margin: 12,
  },
});
