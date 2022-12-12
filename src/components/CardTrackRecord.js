import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {windowHeight, windowWidth} from '../components/WindowDimensions';

const CardTrackRecord = props => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={{height: 160}} />
      <Text style={{...styles.number, color: props.color}}>
        {props.number}
        {'\n'}
        <Text style={styles.text}>{props.text}</Text>
      </Text>

      {/* <Text style={{position: 'absolute',}}>122</Text> */}
    </View>
  );
};

export default CardTrackRecord;

const styles = StyleSheet.create({
  container: {
    width: (60 / 350) * windowWidth,
    height: (105 / 500) * windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
  },
  pictureContainer: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: '700',
    position: 'absolute',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
