import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
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
  referenceTask,
  referenceTim,
} from '../../../config/asyncStorage/getFirebase';
import getData from '../../../config/asyncStorage/getData';
import LoadingScreen from '../../../components/LoadingScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import {referenceRemoveTask} from '../../../config/asyncStorage/deletefirebase';
import {referenceUpdateTask} from '../../../config/asyncStorage/updateFirebase';
import ProgressHome from '../../../components/ProgressHome';
const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Calendar = () => {
  const [items, setItems] = useState({});
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [idKaryawan, setIdKaryawan] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(0);
  const [data, setData] = useState(null);
  const [dataFirebase, setDataFirebase] = useState(null);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [dataFirebaseDetailKaryawan, setDataFirebaseDetailKaryawan] =
    useState(null);
  // dropdown 1
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [items4, setItems4] = useState([]);
  const [array4, setArray4] = useState(false);

  const handlePost = () => {
    referenceSetTask(dataFirebase.length)
      .set({
        id: dataFirebase.length,
        date: moment(date).format('YYYY-MM-DD'),
        name: name,
        id_karyawan: data.id,
        dataAgenda: {
          [moment(date).format('YYYY-MM-DD')]: [
            {
              id: dataFirebase.length,
              name: name,
              team_name: value4,
              status: 'Pending',
              date: moment(date).format('YYYY-MM-DD'),
              member: '',
              on: true,
            },
          ],
        },
        team_name: value4,
        nilai: 0,
        status: 'Pending',
        link: '',
      })
      .then(() => {
        Alert.alert('Berhasil menambahkan Data', 'Silahkan refresh!');
        refRBSheet.current.close();
      });
  };
  useEffect(() => {
    getData().then(res => setData(res));
    referenceTask.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
    referenceTim.on('value', snapshot => {
      setDataFirebaseTim(snapshot.val());
    });
    referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
      setDataFirebaseDetailKaryawan(snapshot.val());
    });
  }, []);

  useEffect(() => {
    referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
      setDataFirebaseDetailKaryawan(snapshot.val());
    });
  }, [idKaryawan]);
  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        dataFirebase.map(val => {
          if (!items[strTime]) {
            if (val.dataAgenda[strTime] !== undefined) {
              items[strTime] = [];
              val.dataAgenda[strTime].map(value => {
                items[strTime].push({
                  id: value.id,
                  name: value.name,
                  team_name: value.team_name,
                  status: value.status,
                  date: value.date,
                  on: value.on,
                  id_karyawan: value.id_karyawan,
                  member: value.member,
                });
              });
            } else {
              val.dataAgenda[strTime] = [];
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
  const handleDelete = (id, date) => {
    referenceUpdateTask(id)
      .update({
        dataAgenda: {
          [date]: [
            {
              on: false,
            },
          ],
          on: false,
        },
      })
      .then(Alert.alert('Confirm', 'Data Task telah terhapus'));
  };
  const renderItem = item => {
    if (item.on === false) {
      return null;
    }
    return (
      <View style={{flexDirection: 'row', marginRight: 10, marginTop: 17}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            flex: 1,
          }}>
          <Text style={[style.h4normal, {flex: 1}]}>{item.name}</Text>
          <Text style={[style.h5, {flex: 1, color: 'grey'}]}>
            {item.team_name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet2.current.open();
              setIdKaryawan(item.id_karyawan);
            }}>
            <Text style={[style.h5, {flex: 1, color: 'grey'}]}>
              {item.member}
            </Text>
          </TouchableOpacity>
          <Text style={[style.h5, {flex: 1, color: 'grey'}]}>
            {item.status}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FD6C6E',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
          onPress={() => {
            handleDelete(item.id, item.date);
          }}>
          <Image
            source={require('../../../assets/icon/delete.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (
    data === null ||
    dataFirebase === null ||
    dataFirebaseTim === null ||
    dataFirebaseDetailKaryawan === null
  ) {
    return <LoadingScreen />;
  }
  if (array4 === false) {
    dataFirebaseTim.map(val => {
      setItems4(res => [...res, {label: val.name, value: val.name}]);
    });
    setArray4(true);
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        onRefresh={() => console.log('masuk')}
      />
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          borderRadius: 50,
          position: 'absolute',
          backgroundColor: WARNA_UTAMA,
          justifyContent: 'center',
          alignItems: 'center',
          right: 20,
          bottom: 100,
        }}
        onPress={() => refRBSheet.current.open()}>
        <Text style={{color: 'white', fontSize: 40}}>+</Text>
      </TouchableOpacity>
      {/* Bottom sheet */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={500}
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
          Task Management
        </Text>
        <View
          style={{height: 1, marginVertical: 10, backgroundColor: '#D4DAE2'}}
        />
        <Text style={[style.h4normal, {marginBottom: 15}]}>
          Please fill the form to add task!
        </Text>
        <View style={{marginBottom: 15}}>
          <Text style={style.h4medium}>Task Name</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 5,
              borderBottomColor: WARNA_UTAMA,
            }}
            onChangeText={val => setName(val)}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={style.h4medium}>Team</Text>
          <DropDownPicker
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            open={open4}
            value={value4}
            items={items4}
            setOpen={setOpen4}
            setValue={setValue4}
            setItems={setItems4}
            style={{
              borderBottomWidth: 1,
              padding: 5,
              borderBottomColor: WARNA_UTAMA,
              borderWidth: 0,
            }}
            placeholder="Choose Your Team !"
            zIndex={7000}
            maxHeight={120}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={style.h4medium}>Task Deadline</Text>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              padding: 5,
              borderBottomColor: WARNA_UTAMA,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{fontSize: 14, color: 'black'}}>
              {moment(date).format('YYYY-MM-DD')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            date={date}
            open={open}
            onDateChange={setDate}
            mode="date"
            onConfirm={dateNew => {
              setOpen(false);
              setDate(dateNew);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
            onPress={handlePost}>
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
            <Text style={[style.h5, {color: WARNA_UTAMA, fontStyle: 'italic'}]}>
              {dataFirebaseDetailKaryawan.notelp}
            </Text>
            <Text style={[style.h5, {color: WARNA_UTAMA, fontStyle: 'italic'}]}>
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
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
