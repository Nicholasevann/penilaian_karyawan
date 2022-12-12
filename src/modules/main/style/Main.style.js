import {StyleSheet} from 'react-native';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_BACKGROUND,
  },
  button: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WARNA_UTAMA,
    borderColor: WARNA_UTAMA,
  },
});

export default styles;
