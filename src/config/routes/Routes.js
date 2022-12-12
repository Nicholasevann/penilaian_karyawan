import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Splashscreen from '../../modules/splashscreen/screen/Splashscreen.screen';
import Main from '../../modules/main/screen/Main.screen';
import Main2 from '../../modules/main/screen/Main2.screen';
import Login from '../../modules/login/screen/Login.screen';
import Main3 from '../../modules/main/screen/Main3.screen';
import Main4 from '../../modules/main/screen/Main4.screen';
import Home from '../../modules/home/screen/Home.screen';
import SignUp from '../../modules/signup/screen/SignUp.screen';
import TabNavigation from '../../components/TabNavigation';
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={Splashscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main2"
        component={Main2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main3"
        component={Main3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main4"
        component={Main4}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
