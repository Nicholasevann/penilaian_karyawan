import {firebase} from '@react-native-firebase/database';

const referenceRemoveTask = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/task/' + id);

export {referenceRemoveTask};
