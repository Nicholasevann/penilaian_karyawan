import {firebase} from '@react-native-firebase/database';
const referenceSet = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/karyawan/' + id);
const referenceSetManager = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/manager/' + id);
const referenceSetTask = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/task/' + id);
const referenceSetTaskTim = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/taskTim/' + id);
const referenceSetTim = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/tim/' + id);

export {
  referenceSet,
  referenceSetTask,
  referenceSetTaskTim,
  referenceSetTim,
  referenceSetManager,
};
