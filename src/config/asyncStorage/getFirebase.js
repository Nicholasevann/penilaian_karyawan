import {firebase} from '@react-native-firebase/database';

const referenceKaryawan = firebase
  .app()
  .database(
    'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('/karyawan');
const referenceDetailKaryawan = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/karyawan/' + id);
const referenceTask = firebase
  .app()
  .database(
    'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('/task');

const referenceTim = firebase
  .app()
  .database(
    'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('/tim');
const referenceDetailTim = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/tim/' + id);

const referenceDetailTask = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/task/' + id);
export {
  referenceKaryawan,
  referenceTask,
  referenceTim,
  referenceDetailKaryawan,
  referenceDetailTim,
  referenceDetailTask,
};
