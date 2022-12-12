import AsyncStorage from '@react-native-async-storage/async-storage';
import {defaultAuthState} from '../config/Auth.cfg';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('authState');
    return jsonValue != null ? JSON.parse(jsonValue) : defaultAuthState;
  } catch (e) {
    console.log('gagal ambil data');
  }
};

export default getData;
