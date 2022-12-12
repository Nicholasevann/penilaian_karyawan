import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import styles from '../style/Splashscreen.style';
import {WARNA_UTAMA} from '../../../utils/Warna';

const Splashscreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../../assets/icon/logoamoeba.png')}
          style={styles.image}
        />
        <ActivityIndicator
          size="large"
          color={WARNA_UTAMA}
          style={{margin: 25}}
        />
      </View>
    </View>
  );
};

export default Splashscreen;
