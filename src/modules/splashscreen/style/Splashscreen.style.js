import {StyleSheet} from 'react-native';
import {WARNA_BACKGROUND} from '../../../utils/Warna';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WARNA_BACKGROUND,
  },
  logo: {
    justifyContent: 'center',
    flex: 1,
  },
  image: {width: 80, height: 80, backgroundColor: WARNA_BACKGROUND},
});

export default styles;
