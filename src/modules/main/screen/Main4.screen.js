import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
// import style from '../../../config/style/Style';
import {WARNA_UTAMA} from '../../../utils/Warna';
import MainComponent from '../../../components/MainComponent';
import styles from '../style/Main.style';
import style from '../../../config/style/style';

const Main4 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MainComponent
        image={require('../../../assets/image/completemain.png')}
        title={'Congrats! your journey is complete'}
        desc={'Lets explore more with login and access the app'}
        textBack={'Back'}
        back={() => navigation.goBack()}
        login={() => navigation.navigate('Login')}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[style.h4, {color: 'white'}]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main4;
