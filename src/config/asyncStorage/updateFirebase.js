import {firebase} from '@react-native-firebase/database';
const referenceUpdate = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/karyawan/' + id);
const referenceUpdateTask = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/task/' + id);
const referenceUpdateTeam = id =>
  firebase
    .app()
    .database(
      'https://skripsi-5503f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/tim/' + id);
export {referenceUpdate, referenceUpdateTask, referenceUpdateTeam};
