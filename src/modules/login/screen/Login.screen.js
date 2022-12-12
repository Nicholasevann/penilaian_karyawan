import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WARNA_UTAMA} from '../../../utils/Warna';
import style from '../../../config/style/style';
import styles from '../style/Login.style';
import {authorize} from 'react-native-app-auth';
import axios from 'axios';
import {
  AuthConfig,
  defaultAuthState,
  defaultAuthStateLogin,
} from '../../../config/config/Auth.cfg';
import {referenceKaryawan} from '../../../config/asyncStorage/getFirebase';

const Login = ({navigation}) => {
  const [authState, setAuthState] = useState(defaultAuthState);
  const [data, setData] = useState(defaultAuthState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [koreksi, setKoreksi] = useState(false);
  const [dataFirebase, setDataFirebase] = useState(null);
  console.log(data);
  const storeData = async () => {
    try {
      if (authState.name !== '') {
        const jsonValue = JSON.stringify(authState);
        await AsyncStorage.setItem('authState', jsonValue);
      }
    } catch (e) {
      console.log('failed to store data');
    }
  };
  useEffect(() => {
    referenceKaryawan.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
  }, []);
  useEffect(() => {
    storeData();
  }, [authState]);
  const handleAuthorize = useCallback(async () => {
    try {
      const newAuthState = await authorize(AuthConfig);
      axios
        .get('https://git.digitalamoeba.id/api/v4/user', {
          params: {
            access_token: newAuthState.accessToken,
          },
        })
        .then(function (response) {
          setData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleLogin = () => {
    if (dataFirebase !== null) {
      for (let i = 0; i < dataFirebase.length; i++) {
        if (
          email === dataFirebase[i].email &&
          password === dataFirebase[i].password
        ) {
          setAuthState(dataFirebase[i]);
          navigation.navigate('TabNavigation');
        } else {
          setKoreksi(true);
        }
      }
    }
  };
  if (data !== defaultAuthState) {
    dataFirebase.map(val => {
      if (data.email === val.email) {
        if (authState === defaultAuthState) {
          setAuthState(val);
        }
        if (storeData) {
          navigation.navigate('TabNavigation');
        }
      }
    });
  }
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={[style.h2, {color: WARNA_UTAMA}]}>Login</Text>
        <Text style={[style.h4medium, {fontStyle: 'italic', marginTop: 5}]}>
          Welcome, Please enter your name & password
        </Text>
        <Image
          source={require('../../../assets/image/login.png')}
          style={{width: 200, height: 200}}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{width: '100%', paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[style.h4medium, {marginRight: 15}]}>
              Email {'       '}:
            </Text>
            <TextInput
              onChangeText={val => setEmail(val)}
              style={{borderBottomWidth: 1, flex: 1, color: 'black'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={[style.h4medium, {marginRight: 15}]}>Password :</Text>
            <TextInput
              onChangeText={val => setPassword(val)}
              style={{borderBottomWidth: 1, flex: 1, color: 'black'}}
              secureTextEntry={true}
            />
          </View>
          {koreksi === true ? (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FF2E2E',
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                *) Please check your username & password correctly!
              </Text>
            </View>
          ) : (
            <View style={{height: 30}} />
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[style.h4medium, {color: 'white'}]}>Login</Text>
          </TouchableOpacity>
          <Text style={[style.h4medium, {marginVertical: 15}]}>OR</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={[style.h4medium, {color: 'white'}]}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGit}
            onPress={() => handleAuthorize()}>
            <Image
              source={require('../../../assets/icon/git.png')}
              style={{width: 30, height: 30, marginRight: 15}}
            />
            <Text style={[style.h4medium, {color: 'white'}]}>
              Login with Git
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
