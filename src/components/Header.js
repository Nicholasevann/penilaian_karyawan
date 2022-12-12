import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {WARNA_UTAMA, WARNA_BACKGROUND} from '../utils/Warna';
import style from '../config/style/style';
import moment from 'moment';

const Header = props => {
  return (
    <View
      style={{
        padding: 15,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/image/man.png')}
            style={{width: 80, height: 80, borderRadius: 100}}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={style.h4}>Welcome, {props.name}</Text>
          <Text style={[style.h5, {fontStyle: 'italic'}]}>
            {props.role} at PT Telkom Program Digital Amoeba
          </Text>
          <Text style={[style.h5, {color: 'grey'}]}>Have a good day!</Text>
          <Text style={[style.h5, {color: 'grey'}]}>
            {moment().format('dddd MMMM Do YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
