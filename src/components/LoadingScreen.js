import React from 'react';
import {StyleSheet, ActivityIndicator, View, Modal} from 'react-native';
import {WARNA_UTAMA} from '../utils/Warna';

const LoadingScreen = navigation => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.centeredcontainer}>
          <ActivityIndicator size="large" color={WARNA_UTAMA} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  // Modal View style
  centeredcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
  },
});
