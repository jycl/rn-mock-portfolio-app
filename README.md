# Coin Portfolio Demo App

## Description
Mock mobile application to display cryptocurrency daily changes in a list.  User can also select a cryptocurrency and graph will be displayed showing it's changes over the past seven days (not real data) and can sort the list by cryptocurrency name.

## Dependencies
Mobile app was written in TypeScript with Prettier (print width of 80 chars).

This app uses the following libraries:
- React Navigation: App navigation (also has dependencies to react-native-reanimated, react-native-screens, react-native-gesture-handler, react-native-safe-area-context)
- Redux: State management (also has related libraries in react-redux, redux-thunk)
- React Native Chart Kit: Render graph for price changes (also has depedencies to react-native-svg)

## Application Setup
This mobile app was developed and tested mainly on iOS (but should run on Android too).  In order to install the required dependencies and start the app, please following the follow steps:
1. Clone project into local folder and navigate to it on CLI.
2. Run `npm install` (assuming you have node installed)
3. Run `npx pod-install ios` (or change directory to `/ios` and run `pod install`).
4. Return to the root directory and run `npm run ios`.
5. The app should build and automatically open your iOS simulator.

## Test Coverage
Jest has been configured to report coverage and generate a coverage report html in the /coverage folder after running tests (e.g. `npm run test`).

## Other Notes
There seems to be a bug with @react-navigation/bottom-tabs (see [here](https://github.com/react-navigation/react-navigation/issues/9242) and [here](https://github.com/react-navigation/react-navigation/issues/9242)) where navigating to another screen and back will cause an invisible view to appear on the first screen.  This 'seems' to be fixed by downgrading to 5.11.3 or upgrading to 5.11.6, but it seems to appear sometimes even after doing so.  Please test out the first screen before navigating to other screens.
