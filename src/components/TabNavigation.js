import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../modules/home/screen/Home.screen';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../utils/Warna';
import Calendar from '../modules/calendar/screen/Calendar.screen';
import Profile from '../modules/profile/screen/Profile.screen';
import Penilaian from '../modules/penilaian/screen/Penilaian.screen';
import getData from '../config/asyncStorage/getData';
import LoadingScreen from './LoadingScreen';
import HomeManager from '../modules/homamanager/screen/HomeManager.screen';
import CalendarStaff from '../modules/calendarstaff/screen/CalendarStaff.screen';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData().then(res => setData(res));
  }, []);
  if (data === null) {
    return <LoadingScreen />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 10,
          backgroundColor: WARNA_UTAMA,
        },
      }}>
      {data.job_title === 'Manager' ? (
        <Tab.Screen
          name="HomeManager"
          component={HomeManager}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : null,
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Image
                  source={
                    focused
                      ? require('../assets/icon/iconhome.png')
                      : require('../assets/icon/iconhomenonactive.png')
                  }
                  style={{width: 30, height: 30}}
                />
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : null,
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Image
                  source={
                    focused
                      ? require('../assets/icon/iconhome.png')
                      : require('../assets/icon/iconhomenonactive.png')
                  }
                  style={{width: 30, height: 30}}
                />
              </View>
            ),
          }}
        />
      )}
      {data.job_title === 'Manager' ? (
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
          options={{
            unmountOnBlur: true,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : null,
                  borderRadius: 50,
                  padding: 8,
                }}>
                <Image
                  source={
                    focused
                      ? require('../assets/icon/iconcalendar.png')
                      : require('../assets/icon/iconcalendarnonactive.png')
                  }
                  style={{width: 25, height: 25}}
                />
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Calendar"
          component={CalendarStaff}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
          options={{
            unmountOnBlur: true,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : null,
                  borderRadius: 50,
                  padding: 8,
                }}>
                <Image
                  source={
                    focused
                      ? require('../assets/icon/iconcalendar.png')
                      : require('../assets/icon/iconcalendarnonactive.png')
                  }
                  style={{width: 25, height: 25}}
                />
              </View>
            ),
          }}
        />
      )}

      {data.job_title === 'Manager' ? (
        <Tab.Screen
          name="Penilaian"
          component={Penilaian}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : null,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    focused
                      ? require('../assets/icon/iconpenilaian.png')
                      : require('../assets/icon/iconpenilaiannonactive.png')
                  }
                  style={{width: 25, height: 25}}
                />
              </View>
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? 'white' : null,
                borderRadius: 50,
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  focused
                    ? require('../assets/icon/iconprofile.png')
                    : require('../assets/icon/iconprofilenonactive.png')
                }
                style={{width: 25, height: 25}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
