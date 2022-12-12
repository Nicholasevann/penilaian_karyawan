import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import style from '../../../config/style/Style';
import {WARNA_UTAMA} from '../../../utils/Warna';
import MainComponent from '../../../components/MainComponent';
import styles from '../style/Main.style';

const Main3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MainComponent
        image={require('../../../assets/image/taskmain.png')}
        title={'Manage your task!'}
        desc={'You can accept your list work'}
        textBack={'Back'}
        back={() => navigation.goBack()}
        login={() => navigation.navigate('Login')}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Main4')}
          style={styles.button}>
          <Image
            source={require('../../../assets/icon/next.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main3;
