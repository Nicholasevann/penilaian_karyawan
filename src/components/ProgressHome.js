import {View, Text} from 'react-native';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import style from '../config/style/style';

const ProgressHome = props => {
  return (
    <View
      style={[
        {
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 15,
        },
        {backgroundColor: props.background},
      ]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedCircularProgress
          size={80}
          width={8}
          fill={props.percentindividu}
          tintColor="white"
          backgroundColor="grey">
          {res => {
            const text =
              res >= 80
                ? 'Excelent'
                : res >= 40
                ? 'Good'
                : res >= 1
                ? 'Bad'
                : 'Nothing';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[style.h4, {color: 'white'}]}>{res}%</Text>
                <Text style={[style.h5, {color: 'white'}]}>{text}</Text>
              </View>
            );
          }}
        </AnimatedCircularProgress>
        <Text style={[style.h4medium, {color: 'white', marginTop: 10}]}>
          Individu Score
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedCircularProgress
          size={80}
          width={8}
          fill={props.percenttim}
          tintColor="white"
          backgroundColor="grey">
          {res => {
            const text =
              res >= 80
                ? 'Excelent'
                : res >= 40
                ? 'Good'
                : res >= 1
                ? 'Bad'
                : 'Nothing';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[style.h4, {color: 'white'}]}>{res}%</Text>
                <Text style={[style.h5, {color: 'white'}]}>{text}</Text>
              </View>
            );
          }}
        </AnimatedCircularProgress>
        <Text style={[style.h4medium, {color: 'white', marginTop: 10}]}>
          Team Score
        </Text>
      </View>
    </View>
  );
};

export default ProgressHome;
