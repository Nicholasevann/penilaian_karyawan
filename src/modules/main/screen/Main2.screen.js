import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import style from '../../../config/style/Style';
import {WARNA_UTAMA} from '../../../utils/Warna';
import MainComponent from '../../../components/MainComponent';
import styles from '../style/Main.style';

const Main2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MainComponent
        image={require('../../../assets/image/analyticmain.png')}
        title={'Realtime Analytic Your Work!'}
        desc={'You can analysis your work from this app'}
        textBack={'Back'}
        back={() => navigation.goBack()}
        login={() => navigation.navigate('Login')}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Main3')}
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

export default Main2;
