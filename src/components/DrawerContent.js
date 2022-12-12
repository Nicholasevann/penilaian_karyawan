import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from '../config/asyncStorage/getData';
import LoadingScreen from './LoadingScreen';
import {WARNA_UTAMA} from '../utils/Warna';
const DrawerContent = props => {
  const [data, setData] = useState(null);
  const removeData = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const LogoutHandle = () => {
    removeData('authState');
    props.navigation.replace('Login', {checked: false});
  };
  return (
    <View style={{flex: 1}}>
      {/* User info */}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/image/profilepicture.jpeg')}
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          <View
            style={{
              marginLeft: 15,
              flexDirection: 'column',
              flex: 1,
              marginRight: 10,
            }}>
            <Text style={styles.title} numberOfLines={2}>
              Nicholas Lindartono
            </Text>
            <Text style={styles.caption}>nnicholasevan@gmail.com</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('RouteProfile')}>
                <Text style={styles.caption2}>Edit Profile </Text>
              </TouchableOpacity>
              {/* <Caption style={styles.caption3}>Setting</Caption> */}
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: 'black',
            marginHorizontal: 15,
          }}
        />
        <DrawerItem
          label="Sign out"
          labelStyle={styles.itemDrawer}
          onPress={() => LogoutHandle()}
        />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: 'white',
  },
  caption: {
    color: 'white',
    fontSize: 12,
  },
  caption2: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
  },
  userInfoSection: {
    paddingLeft: 15,
    paddingVertical: 30,
    backgroundColor: WARNA_UTAMA,
  },
});
