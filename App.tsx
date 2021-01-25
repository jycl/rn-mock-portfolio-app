/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler'; // react-navigation setup
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PortfolioScreen from './src/screens/PortfolioScreen';
import Icon from './src/components/Icon';
import configureStore from './src/store';

const store = configureStore();

export type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const Tab = createBottomTabNavigator();
export const GenericScreen = (props: any) => {
  const screen = props?.route?.name || 'Generic';
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{screen}</Text>
    </View>
  );
};

const App = (): ReactNode => {
  return (
    // outer SafeAreaView needed for bottom for notch iOS devices
    <Provider store={store}>
      <SafeAreaView style={styles.appContainer}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <Tab.Navigator
              sceneContainerStyle={styles.scene}
              tabBarOptions={{
                tabStyle: { backgroundColor: 'black' },
                activeTintColor: 'white',
              }}>
              <Tab.Screen
                name="Porfolio"
                component={PortfolioScreen}
                options={{
                  tabBarIcon: ({ color }: TabBarIconProps) => (
                    <Icon name="portfolio" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Wallets"
                component={GenericScreen}
                options={{
                  tabBarIcon: ({ color }: TabBarIconProps) => (
                    <Icon name="wallet" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Market"
                component={GenericScreen}
                options={{
                  tabBarIcon: ({ color }: TabBarIconProps) => (
                    <Icon name="graph" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Alerts"
                component={GenericScreen}
                options={{
                  tabBarIcon: ({ color }: TabBarIconProps) => (
                    <Icon name="alert" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="More"
                component={GenericScreen}
                options={{
                  tabBarIcon: ({ color }: TabBarIconProps) => (
                    <Icon name="more" color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: 'black' },
  scene: { backgroundColor: 'black' },
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: 'white', fontSize: 24 },
});

export default App;
