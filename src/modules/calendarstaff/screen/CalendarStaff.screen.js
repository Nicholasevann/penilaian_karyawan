import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import {WARNA_UTAMA} from '../../../utils/Warna';
import RBSheet from 'react-native-raw-bottom-sheet';
import style from '../../../config/style/style';
import DatePicker from 'react-native-date-picker';
import {referenceSetTask} from '../../../config/asyncStorage/setFirebase';
import {
  referenceDetailKaryawan,
  referenceDetailTask,
  referenceTask,
  referenceTim,
} from '../../../config/asyncStorage/getFirebase';
import getData from '../../../config/asyncStorage/getData';
import LoadingScreen from '../../../components/LoadingScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import {referenceUpdateTask} from '../../../config/asyncStorage/updateFirebase';
import ProgressHome from '../../../components/ProgressHome';
const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarStaff = () => {
  const [items, setItems] = useState({});
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [data, setData] = useState(null);
  const [link, setLink] = useState('');
  const [idTask, setIdTask] = useState(0);
  const [idKaryawan, setIdKaryawan] = useState(0);
  const [keterangan, setKeterangan] = useState('');
  const [dataFirebase, setDataFirebase] = useState(null);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [dataFirebaseDetailTask, setDataFirebaseDetailTask] = useState(null);
  const [dataFirebaseDetailKaryawan, setDataFirebaseDetailKaryawan] =
    useState(null);
  useEffect(() => {
    getData().then(res => setData(res));
    referenceTask.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
    referenceTim.on('value', snapshot => {
      setDataFirebaseTim(snapshot.val());
    });
    referenceDetailTask(idTask).on('value', snapshot => {
      setDataFirebaseDetailTask(snapshot.val());
    });
    referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
      setDataFirebaseDetailKaryawan(snapshot.val());
    });
  }, []);
  useEffect(() => {
    referenceDetailTask(idTask).on('value', snapshot => {
      setDataFirebaseDetailTask(snapshot.val());
    });
  }, [idTask]);
  useEffect(() => {
    referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
      setDataFirebaseDetailKaryawan(snapshot.val());
    });
  }, [idKaryawan]);
  const handleEdit = (id, name, team_name, date) => {
    referenceUpdateTask(id)
      .update({
        dataAgenda: {
          [date]: [
            {
              id: id,
              name: name,
              team_name: team_name,
              status: 'On Progress',
              date: moment(date).format('YYYY-MM-DD'),
              member: data.name,
              id_karyawan: data.id,
            },
          ],
        },
        member: data.name,
        id_karyawan: data.id,
        status: 'On Progress',
      })
      .then(Alert.alert('Berhasil update data', 'Silahkan refresh page!'));
  };
  const handleDone = (id, name, team_name, date2) => {
    referenceUpdateTask(id)
      .update({
        dataAgenda: {
          [date2]: [
            {
              id: id,
              name: name,
              team_name: team_name,
              status: 'Done',
              date: moment(date2).format('YYYY-MM-DD'),
              member: data.name,
              donedate: moment().format('YYYY-MM-DD'),
              id_karyawan: data.id,
            },
          ],
        },
        member: data.name,
        id_karyawan: data.id,
        status: 'Done',
        donedate: moment().format('YYYY-MM-DD'),
        link: link,
        keterangan: keterangan,
      })
      .then(Alert.alert('Berhasil done data', 'Silahkan refresh page!'));
  };
  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        dataFirebase.map(val => {
          if (!items[strTime]) {
            if (data.team_name === val.team_name) {
              if (val.dataAgenda[strTime] !== undefined) {
                items[strTime] = [];
                val.dataAgenda[strTime].map(value => {
                  items[strTime].push({
                    id: value.id,
                    name: value.name,
                    team_name: value.team_name,
                    status: value.status,
                    date: value.date,
                    member: value.member,
                    donedate: value.donedate,
                    on: value.on,
                    id_karyawan: value.id_karyawan,
                  });
                });
              } else {
                val.dataAgenda[strTime] = [];
              }
            }
          }
        });
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 2000);
  };
  const renderItem = item => {
    if (item.on === false) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          marginRight: 15,
          marginTop: 15,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            padding: 15,
          }}>
          <Text style={[style.h4normal, {flex: 1}]}>{item.name}</Text>
          <Text style={[style.h5, {flex: 1, color: 'grey'}]}>
            {item.team_name}
          </Text>
          <Text style={[style.h5, {flex: 1, color: 'grey'}]}>
            {item.status}
          </Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet2.current.open();
              setIdKaryawan(item.id_karyawan);
            }}>
            <Text
              style={[style.h5, {flex: 1, color: 'black', fontWeight: 'bold'}]}>
              {item.member}
            </Text>
          </TouchableOpacity>
          {item.status === 'Done' ? (
            <Text
              style={[
                style.h5,
                {flex: 1, color: 'black', fontStyle: 'italic'},
              ]}>
              Done date : {item.donedate}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor:
              item.status === 'On Progress' && item.member === data.name
                ? '#6FCA7B'
                : item.status === 'Pending'
                ? '#FED84E'
                : null,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
          onPress={
            item.status === 'Pending'
              ? () => {
                  handleEdit(item.id, item.name, item.team_name, item.date);
                }
              : item.status === 'On Progress' && item.member === data.name
              ? () => {
                  refRBSheet.current.open();
                  setIdTask(item.id);
                }
              : null
          }>
          {item.status === 'On Progress' && item.member === data.name ? (
            <Image
              source={require('../../../assets/icon/done.png')}
              style={{width: 25, height: 25}}
            />
          ) : item.status === 'Pending' ? (
            <Image
              source={require('../../../assets/icon/pending.png')}
              style={{width: 25, height: 25}}
            />
          ) : null}
        </TouchableOpacity>
        {/* Bottom sheet */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={400}
          customStyles={{
            container: {
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            draggableIcon: {
              backgroundColor: '#9CA3AF',
            },
          }}>
          <Text style={[style.h3, {textAlign: 'center', color: WARNA_UTAMA}]}>
            Finishing Task
          </Text>
          <Text style={[style.h4normal, {marginVertical: 10}]}>
            {dataFirebaseDetailTask.name}
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={style.h4medium}>Link Task</Text>
            <TextInput
              style={styles.input}
              onChangeText={val => setLink(val)}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={style.h4medium}>Keterangan Task (Pencapaian)</Text>
            <TextInput
              style={styles.input}
              onChangeText={val => setKeterangan(val)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: WARNA_UTAMA,
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => refRBSheet.current.close()}>
              <Text style={[style.h4medium, {color: WARNA_UTAMA}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: WARNA_UTAMA,
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: WARNA_UTAMA,
              }}
              onPress={() => {
                if (link !== '' && keterangan !== '') {
                  handleDone(
                    idTask,
                    dataFirebaseDetailTask.name,
                    dataFirebaseDetailTask.team_name,
                    dataFirebaseDetailTask.date,
                  );
                  refRBSheet.current.close();
                } else {
                  Alert.alert('Warning', 'Masukkan data link dan keterangan!');
                }
              }}>
              <Text style={[style.h4medium, {color: 'white'}]}>Add</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        {/* Bottom sheet profile user*/}
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={580}
          customStyles={{
            container: {
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            draggableIcon: {
              backgroundColor: '#9CA3AF',
            },
          }}>
          <Text style={[style.h3, {textAlign: 'center', color: WARNA_UTAMA}]}>
            Profile User
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/image/man.png')}
              style={{
                width: 90,
                height: 90,
                marginTop: 20,
              }}
            />
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text style={[style.h3, {color: WARNA_UTAMA}]}>
                {dataFirebaseDetailKaryawan.name}
              </Text>
              <Text style={[style.h4normal, {color: WARNA_UTAMA}]}>
                {dataFirebaseDetailKaryawan.email}
              </Text>
              <Text
                style={[style.h5, {color: WARNA_UTAMA, fontStyle: 'italic'}]}>
                {dataFirebaseDetailKaryawan.notelp}
              </Text>
              <Text
                style={[style.h5, {color: WARNA_UTAMA, fontStyle: 'italic'}]}>
                {dataFirebaseDetailKaryawan.address}
              </Text>
              <Text style={[style.h4, {color: WARNA_UTAMA}]}>{data.bio}</Text>
            </View>
            {dataFirebaseDetailKaryawan.role !== 'Manager'
              ? dataFirebaseTim.map(val => {
                  if (val.name === dataFirebaseDetailKaryawan.team_name) {
                    return (
                      <ProgressHome
                        background={WARNA_UTAMA}
                        percentindividu={dataFirebaseDetailKaryawan.totalnilai}
                        percenttim={parseInt(val.nilai)}
                      />
                    );
                  }
                })
              : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: WARNA_UTAMA,
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => refRBSheet2.current.close()}>
              <Text style={[style.h4medium, {color: WARNA_UTAMA}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  };

  if (data === null || dataFirebase === null || dataFirebaseTim === null) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default CalendarStaff;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: 14,
    color: 'black',
    borderBottomColor: 'grey',
    padding: 5,
    borderWidth: 0,
  },
});
