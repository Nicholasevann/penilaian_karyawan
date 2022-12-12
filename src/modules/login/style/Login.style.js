import {StyleSheet} from 'react-native';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_BACKGROUND,
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
  },
  buttonGit: {
    width: 300,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FC6D26',
    backgroundColor: '#FC6D26',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 25,
  },
});

export default styles;
