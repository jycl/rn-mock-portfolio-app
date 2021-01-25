import React from 'react';
import {
  Dimensions,
  View,
  Button,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

type PropsType = {
  onDismiss?: () => void;
};

/**
 * Modal to show users a list of cryptocurrencies to search through
 * and add to existing list
 */

export default function AddCoinModal({ onDismiss }: PropsType) {
  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      onDismiss={onDismiss}
      transparent={false}
      onRequestClose={onDismiss}>
      <View style={styles.container}>
        <Button title="Back" onPress={() => onDismiss && onDismiss()} />
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Please select a coin to add to list:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter cryptocurrency name..."
            placeholderTextColor="#808080"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 12,
    alignItems: 'flex-start',
  },
  innerContainer: {
    margin: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    color: '#000',
    borderRadius: 8,
    padding: 4,
    height: 40,
    width: screenWidth * 0.9,
    backgroundColor: '#FFF',
    marginTop: 12,
    fontSize: 18,
  },
});
