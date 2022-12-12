import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import ProgressHome from '../../../components/ProgressHome';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';
import getData from '../../../config/asyncStorage/getData';
import LoadingScreen from '../../../components/LoadingScreen';
import style from '../../../config/style/style';
import RBSheet from 'react-native-raw-bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  referenceDetailKaryawan,
  referenceKaryawan,
  referenceTim,
  referenceDetailTim,
  referenceTask,
} from '../../../config/asyncStorage/getFirebase';
import {referenceSetTim} from '../../../config/asyncStorage/setFirebase';
import {referenceUpdate} from '../../../config/asyncStorage/updateFirebase';

const HomeManager = () => {
  const [data, setData] = useState(null);
  const [dataGanti, setDataGanti] = useState('');
  const [dataFirebase, setDataFirebase] = useState(null);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [dataFirebaseTask, setDataFirebaseTask] = useState(null);
  const [dataFirebaseDetailKaryawan, setDataFirebaseDetailKaryawan] =
    useState(null);
  const [dataFirebaseDetailTim, setDataFirebaseDetailTim] = useState(null);
  const [team, setTeam] = useState(true);
  const [nilaiTeam, setNilaiTeam] = useState(0);
  const [staff, setStaff] = useState(false);
  const [nama, setNama] = useState('');
  const [idKaryawan, setIdKaryawan] = useState(0);
  const [idTeam, setIdTeam] = useState(0);
  const [koreksi, setKoreksi] = useState(false);
  const [post, setPost] = useState(false);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  // dropdown 1
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [items4, setItems4] = useState([]);
  const [array4, setArray4] = useState(false);
  useEffect(() => {
    if (data === null) {
      getData().then(res => setData(res));
      referenceKaryawan.on('value', snapshot => {
        setDataFirebase(snapshot.val());
      });
      referenceTim.on('value', snapshot => {
        setDataFirebaseTim(snapshot.val());
      });
      referenceTask.on('value', snapshot => {
        setDataFirebaseTask(snapshot.val());
      });
      referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
        setDataFirebaseDetailKaryawan(snapshot.val());
      });
      referenceDetailTim(idTeam).on('value', snapshot => {
        setDataFirebaseDetailTim(snapshot.val());
      });
    }
  }, []);
  useEffect(() => {
    referenceTim.on('value', snapshot => {
      setDataFirebaseTim(snapshot.val());
    });
  }, [post]);
  useEffect(() => {
    referenceDetailKaryawan(idKaryawan).on('value', snapshot => {
      setDataFirebaseDetailKaryawan(snapshot.val());
    });
  }, [idKaryawan]);
  useEffect(() => {
    referenceDetailTim(idTeam).on('value', snapshot => {
      setDataFirebaseDetailTim(snapshot.val());
    });
  }, [idTeam]);
  const handlePost = () => {
    if (nama !== '' && value4 !== []) {
      referenceSetTim(dataFirebaseTim.length)
        .set({
          id: dataFirebaseTim.length,
          name: nama,
          anggota: value4,
          nilai: 0,
          task: [],
        })
        .then(
          refRBSheet2.current.close(),
          Alert.alert('Confirm', 'Berhasil menambahkan tim'),
        );
      dataFirebase.map(value => {
        value4.map(val => {
          if (val === value.name) {
            referenceUpdate(value.id).update({
              team_name: nama,
            });
          }
        });
      });
      setPost(!post);
    } else {
      setKoreksi(true);
    }
  };
  if (
    data === null ||
    dataFirebase === null ||
    dataFirebaseTim === null ||
    dataFirebaseDetailTim === null ||
    dataFirebaseDetailKaryawan === null ||
    dataFirebaseTask === null
  ) {
    return <LoadingScreen />;
  }
  const CardTeam = props => {
    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
          <View style={{flex: 1}}>
            <Text style={style.h5}>{props.number}</Text>
          </View>
          <View style={{flex: 4}}>
            <Text style={style.h5}>{props.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={style.h5}>{props.score}</Text>
          </View>
        </TouchableOpacity>
        {/* Bottom sheet */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={550}
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
            Detail Teams
          </Text>
          <View
            style={{
              height: 1,
              marginVertical: 10,
              backgroundColor: '#D4DAE2',
            }}
          />
          <Text style={[style.h4, {marginVertical: 10}]}>
            Team {dataFirebaseDetailTim.name}
          </Text>
          {dataFirebaseDetailTim.anggota.map((val, index) => {
            var id = index + 1;
            return (
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={style.h5}>{id}. </Text>
                <Text style={style.h5}> {val}</Text>
              </View>
            );
          })}
          <Text style={[style.h4, {marginVertical: 10}]}>Target</Text>
          {dataFirebaseTask.map((val, index) => {
            if (val.team_name === dataFirebaseDetailTim.name) {
              return (
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={style.h5}>{index}</Text>
                  <Text style={style.h5}> {val.name}</Text>
                </View>
              );
            }
          })}
          <Text style={[style.h4, {marginVertical: 10}]}>Achievement</Text>
          {dataFirebaseTask.map((val, index) => {
            if (
              val.team_name === dataFirebaseDetailTim.name &&
              val.status === 'Done'
            ) {
              return (
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={style.h5}>{'\u2B24'}</Text>
                  <Text style={style.h5}> {val.keterangan}</Text>
                </View>
              );
            }
          })}
          <Text style={[style.h2, {marginVertical: 10, alignSelf: 'center'}]}>
            Score
          </Text>
          <Text style={[style.h2, {alignSelf: 'center', color: WARNA_UTAMA}]}>
            {dataFirebaseDetailTim.nilai}
          </Text>
        </RBSheet>
      </View>
    );
  };
  const CardStaff = props => {
    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
          <View style={{flex: 1}}>
            <Text style={style.h5}>{props.number}</Text>
          </View>
          <View style={{flex: 4}}>
            <Text style={style.h5}>{props.name}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={style.h5}>{props.score}</Text>
          </View>
        </TouchableOpacity>
        {/* Bottom sheet */}
        <RBSheet
          ref={refRBSheet3}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={600}
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
            Detail Staff
          </Text>
          <View
            style={{
              height: 1,
              marginVertical: 10,
              backgroundColor: '#D4DAE2',
            }}
          />
          <Text style={[style.h4, {marginVertical: 10}]}>Name</Text>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={style.h5}> {dataFirebaseDetailKaryawan.name}</Text>
          </View>
          <Text style={[style.h4, {marginVertical: 10}]}>Email</Text>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={style.h5}>{dataFirebaseDetailKaryawan.email}</Text>
          </View>
          <Text style={[style.h4, {marginVertical: 10}]}>Task</Text>
          {dataFirebaseTask.map((val, index) => {
            if (val.member === dataFirebaseDetailKaryawan.name) {
              return (
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={style.h5}>{index}</Text>
                  <Text style={style.h5}> {val.name}</Text>
                </View>
              );
            }
          })}
          <Text style={[style.h4, {marginVertical: 10}]}>Team</Text>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={style.h5}>{dataFirebaseDetailKaryawan.team_name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 5,
            }}>
            <View>
              <Text style={[style.h4]}>Score</Text>
              <Text
                style={[style.h4, {alignSelf: 'center', color: WARNA_UTAMA}]}>
                {dataFirebaseDetailKaryawan.totalnilai}
              </Text>
            </View>
            <View>
              <Text style={[style.h4]}>Team Score</Text>
              {dataFirebaseTim.map(val => {
                if (val.name === dataFirebaseDetailKaryawan.team_name) {
                  setNilaiTeam(val.nilai);
                  return (
                    <Text
                      style={[
                        style.h4,
                        {alignSelf: 'center', color: WARNA_UTAMA},
                      ]}>
                      {val.nilai}
                    </Text>
                  );
                }
              })}
            </View>
          </View>
          <Text style={[style.h2, {marginVertical: 5, alignSelf: 'center'}]}>
            Total Score
          </Text>
          <Text style={[style.h2, {alignSelf: 'center', color: WARNA_UTAMA}]}>
            {parseInt(totalNilai)}
          </Text>
        </RBSheet>
      </View>
    );
  };
  if (array4 === false) {
    dataFirebase.map(val => {
      if (val.role !== 'Manager') {
        setItems4(res => [...res, {label: val.name, value: val.name}]);
      }
    });
    setArray4(true);
  }
  DropDownPicker.setMode('BADGE');
  var totalNilai = (dataFirebaseDetailKaryawan.totalnilai + nilaiTeam) / 2;
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{backgroundColor: WARNA_BACKGROUND, marginBottom: 90}]}>
        <ScrollView>
          <Header
            name={data.name}
            role={data.role === undefined ? 'Staff' : data.role}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[
                styles.menu,
                {borderBottomColor: team ? WARNA_UTAMA : 'grey'},
              ]}
              onPress={() => {
                setTeam(true);
                setStaff(false);
              }}>
              <Text style={[style.h4, {color: team ? WARNA_UTAMA : 'grey'}]}>
                Team
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.menu,
                {borderBottomColor: staff ? WARNA_UTAMA : 'grey'},
              ]}
              onPress={() => {
                setTeam(false);
                setStaff(true);
              }}>
              <Text style={[style.h4, {color: staff ? WARNA_UTAMA : 'grey'}]}>
                Staff
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 15}}>
            <TouchableOpacity onPress={() => refRBSheet2.current.open()}>
              {team ? (
                <Image
                  source={require('../../../assets/icon/plus.png')}
                  style={{width: 30, height: 30, alignSelf: 'flex-end'}}
                />
              ) : null}
            </TouchableOpacity>
            {/* Bottom sheet */}
            <RBSheet
              ref={refRBSheet2}
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
              <Text
                style={[style.h3, {textAlign: 'center', color: WARNA_UTAMA}]}>
                Add Teams
              </Text>
              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  backgroundColor: '#D4DAE2',
                }}
              />
              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text style={style.h4medium}>Team Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={val => setNama(val)}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text style={style.h4medium}>Team Member</Text>
                <View>
                  <DropDownPicker
                    multiple={true}
                    multipleText={'Staff have been selected'}
                    min={1}
                    max={6}
                    listMode="SCROLLVIEW"
                    dropDownDirection="BOTTOM"
                    open={open4}
                    value={value4}
                    items={items4}
                    setOpen={setOpen4}
                    setValue={setValue4}
                    setItems={setItems4}
                    style={styles.input}
                    placeholder="Choose Your Staff !"
                    zIndex={7000}
                    maxHeight={120}
                  />
                </View>
              </View>
              {koreksi ? (
                <Text style={[style.h5, {color: 'red'}]}>
                  *) Masukkan Semua Data !!
                </Text>
              ) : null}

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
                  onPress={() => refRBSheet2.current.close()}>
                  <Text style={[style.h4medium, {color: WARNA_UTAMA}]}>
                    Cancel
                  </Text>
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
            {team
              ? dataFirebaseTim.map(val => {
                  const id = val.id + 1;
                  return (
                    <CardTeam
                      number={id}
                      name={val.name}
                      score={val.nilai}
                      onPress={() => {
                        refRBSheet.current.open();
                        setIdTeam(val.id);
                      }}
                    />
                  );
                })
              : dataFirebase.map(val => {
                  const id = val.id;
                  if (val.role !== 'Manager') {
                    return (
                      <CardStaff
                        number={id}
                        name={val.name}
                        score={val.totalnilai}
                        onPress={() => {
                          refRBSheet3.current.open();
                          setIdKaryawan(val.id);
                        }}
                      />
                    );
                  }
                })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 14,
    color: 'black',
    borderBottomColor: 'grey',
    padding: 5,
    borderWidth: 0,
  },
});
