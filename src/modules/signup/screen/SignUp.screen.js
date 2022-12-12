import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';
import style from '../../../config/style/style';
import {RadioButton} from 'react-native-paper';
import {referenceKaryawan} from '../../../config/asyncStorage/getFirebase';
import {referenceSet} from '../../../config/asyncStorage/setFirebase';

const SignUp = ({navigation}) => {
  const [checked, setChecked] = useState('Staff');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notelp, setNotelp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [dataFirebase, setDataFirebase] = useState(null);
  const [koreksi, setKoreksi] = useState(false);
  useEffect(() => {
    referenceKaryawan.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
  }, []);
  const handleRegister = () => {
    if (
      (nama !== '' && email !== '' && password !== '',
      notelp !== '',
      alamat !== '')
    ) {
      referenceSet(dataFirebase.length)
        .set({
          id: dataFirebase.length,
          name: nama,
          email: email,
          password: password,
          notelp: notelp,
          address: alamat,
          role: checked,
          job_title: checked,
        })
        .then(navigation.navigate('Login'));
    } else {
      setKoreksi(true);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{width: '100%'}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[style.h4medium, {color: 'grey'}]}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 30}}>
        <Text style={[style.h2, {color: WARNA_UTAMA}]}>Register</Text>
        <Text style={[style.h4medium, {marginTop: 5}]}>
          Hello, Please fill the form
        </Text>
        {koreksi ? (
          <Text style={[style.h4normal, {fontStyle: 'italic', color: 'red'}]}>
            Please fill all data!
          </Text>
        ) : null}
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text style={style.h4medium}>Name</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 14,
            color: 'black',
            borderBottomColor: 'grey',
            padding: 5,
          }}
          onChangeText={val => setNama(val)}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text style={style.h4medium}>Email</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 14,
            color: 'black',
            borderBottomColor: 'grey',
            padding: 5,
          }}
          onChangeText={val => setEmail(val)}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text style={style.h4medium}>Password</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 14,
            color: 'black',
            borderBottomColor: 'grey',
            padding: 5,
          }}
          onChangeText={val => setPassword(val)}
          secureTextEntry={true}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text style={style.h4medium}>No. Telpon</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            fontSize: 14,
            color: 'black',
            borderBottomColor: 'grey',
            padding: 5,
          }}
          keyboardType={'number-pad'}
          onChangeText={val => setNotelp(val)}
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
          onChangeText={val => setAlamat(val)}
        />
      </View>
      <View
        style={{
          marginTop: 10,
        }}>
        <Text style={style.h4medium}>Role</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <RadioButton
          value="first"
          status={checked === 'Staff' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Staff')}
        />
        <Text style={style.h4normal}>Karyawan</Text>
        <RadioButton
          value="second"
          status={checked === 'Manager' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Manager')}
        />
        <Text style={style.h4normal}>Manager</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={[style.h4medium, {color: 'white'}]}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_BACKGROUND,
    padding: 20,
  },
  button: {
    width: 200,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: WARNA_UTAMA,
    backgroundColor: WARNA_UTAMA,
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 50,
  },
});
