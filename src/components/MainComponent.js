import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from '../config/style/style';
import {WARNA_UTAMA} from '../utils/Warna';

const MainComponent = props => {
  return (
    <View>
      <View style={{width: '100%', padding: 20}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={props.back}>
            <Text style={[style.h4medium, {color: 'grey'}]}>
              {props.textBack}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.login}>
            <Text style={[style.h4medium, {color: WARNA_UTAMA}]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 40,
          width: '100%',
          paddingHorizontal: 15,
        }}>
        <Image
          source={props.image}
          style={{width: 400, height: 300, marginBottom: 30}}
        />
        <Text style={[style.h2, {color: WARNA_UTAMA, textAlign: 'center'}]}>
          {props.title}
        </Text>
        <Text style={[style.h4medium]}>{props.desc}</Text>
      </View>
    </View>
  );
};

export default MainComponent;

const styles = StyleSheet.create({});
