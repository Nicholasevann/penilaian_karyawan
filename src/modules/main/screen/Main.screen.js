import {View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import style from '../../../config/style/Style';
import {WARNA_UTAMA} from '../../../utils/Warna';
import MainComponent from '../../../components/MainComponent';
import styles from '../style/Main.style';
import getData from '../../../config/asyncStorage/getData';
import {defaultAuthState} from '../../../config/config/Auth.cfg';

const Main = ({navigation}) => {
  const [data, setData] = useState(defaultAuthState);
  useEffect(() => {
    getData().then(res => setData(res));
  }, []);
  if (data.name !== '') {
    navigation.navigate('TabNavigation');
  }
  return (
    <View style={styles.container}>
      <MainComponent
        image={require('../../../assets/image/welcome.png')}
        title={'Welcome to our App!'}
        desc={'Enjoy this journey'}
        login={() => navigation.navigate('Login')}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main2')}>
          <Image
            source={require('../../../assets/icon/next.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
