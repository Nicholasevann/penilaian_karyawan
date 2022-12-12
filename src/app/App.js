import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from '../config/routes/Routes';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
