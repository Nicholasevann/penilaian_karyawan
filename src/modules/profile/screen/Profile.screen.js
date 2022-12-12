import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';
import style from '../../../config/style/style';
import {RadioButton} from 'react-native-paper';
import {
  referenceKaryawan,
  referenceTim,
} from '../../../config/asyncStorage/getFirebase';
import {referenceSet} from '../../../config/asyncStorage/setFirebase';
import Header from '../../../components/Header';
import getData from '../../../config/asyncStorage/getData';
import LoadingScreen from '../../../components/LoadingScreen';
import CardTrackRecord from '../../../components/CardTrackRecord';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {referenceUpdate} from '../../../config/asyncStorage/updateFirebase';
import ProgressHome from '../../../components/ProgressHome';
const Profile = props => {
  const [data, setData] = useState(null);
  const [dataFirebase, setDataFirebase] = useState(null);
  const [koreksi, setKoreksi] = useState(false);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [totalnilai, setTotalnilai] = useState('');
  useEffect(() => {
    getData().then(res => setData(res));
    referenceKaryawan.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
    referenceTim.on('value', snapshot => {
      setDataFirebaseTim(snapshot.val());
    });
  }, []);

  const handleUpdate = () => {
    if (data.name !== '' && data.address !== '' && data.notelp !== '') {
      referenceUpdate(data.id)
        .update({
          name: data.name,
          notelp: data.notelp,
          address: data.address,
          bio: data.bio,
        })
        .then(Alert.alert('Berhasil', 'Data profile berhasil diupdate!'));
    } else {
      setKoreksi(true);
    }
  };
  const removeData = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const LogoutHandle = () => {
    removeData('authState');
    props.navigation.replace('Login', {checked: false});
  };
  if (data === null || dataFirebase === null || dataFirebaseTim === null) {
    return <LoadingScreen />;
  }
  if (totalnilai === '') {
    dataFirebase.map(val => {
      if (val.name === data.name) {
        setTotalnilai(val.totalnilai);
      }
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: WARNA_UTAMA,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Image
            source={require('../../../assets/image/man.png')}
            style={{
              width: 90,
              height: 90,
            }}
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={[style.h3, {color: 'white'}]}>{data.name}</Text>
            <Text style={[style.h4normal, {color: 'white'}]}>{data.email}</Text>
            <Text style={[style.h5, {color: 'white', fontStyle: 'italic'}]}>
              {data.notelp}
            </Text>
            <Text style={[style.h5, {color: 'white', fontStyle: 'italic'}]}>
              {data.address}
            </Text>
            <Text style={[style.h4, {color: 'white'}]}>{data.bio}</Text>
            {data.role !== 'Manager'
              ? dataFirebaseTim.map(val => {
                  if (val.name === data.team_name) {
                    return (
                      <ProgressHome
                        background={WARNA_UTAMA}
                        percentindividu={totalnilai}
                        percenttim={parseInt(val.nilai)}
                      />
                    );
                  }
                })
              : null}
            <TouchableOpacity style={styles.button2} onPress={LogoutHandle}>
              <Text style={[style.h4medium, {color: WARNA_UTAMA}]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 15}}>
          <Text style={[style.h3, {color: WARNA_UTAMA}]}>Update Profile</Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={style.h4medium}>No Telepon</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontSize: 14,
                color: 'black',
                borderBottomColor: 'grey',
                padding: 5,
              }}
              onChangeText={val => setData({...data, notelp: val})}
              value={data.notelp}
              keyboardType={'number-pad'}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={style.h4medium}>Address</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontSize: 14,
                color: 'black',
                borderBottomColor: 'grey',
                padding: 5,
              }}
              onChangeText={val => setData({...data, address: val})}
              value={data.address}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={style.h4medium}>Bio</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontSize: 14,
                color: 'black',
                borderBottomColor: 'grey',
                padding: 5,
              }}
              onChangeText={val => setData({...data, bio: val})}
              value={data.bio}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={[style.h4medium, {color: 'white'}]}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_BACKGROUND,
    marginBottom: 80,
  },
  button: {
    width: 100,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: WARNA_UTAMA,
    backgroundColor: WARNA_UTAMA,
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  button2: {
    width: 100,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  CardTrackRecord: {
    marginTop: 30,
    marginHorizontal: 15,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
