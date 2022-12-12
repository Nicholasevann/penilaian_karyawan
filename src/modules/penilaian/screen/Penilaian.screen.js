import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import style from '../../../config/style/style';
import Hyperlink from 'react-native-hyperlink';
import {WARNA_BACKGROUND, WARNA_UTAMA} from '../../../utils/Warna';
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider';
import {
  referenceDetailTask,
  referenceDetailTim,
  referenceTask,
  referenceTim,
} from '../../../config/asyncStorage/getFirebase';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  referenceUpdate,
  referenceUpdateTask,
  referenceUpdateTeam,
} from '../../../config/asyncStorage/updateFirebase';
const Penilaian = () => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [idTask, setIdTask] = useState(0);
  const [idTeam, setIdTeam] = useState(0);
  const [team, setTeam] = useState(true);
  const [task, setTask] = useState(false);
  const [dataFirebase, setDataFirebase] = useState(null);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [dataFirebaseDetailTask, setDataFirebaseDetailTask] = useState(null);
  const [dataFirebaseDetailTeam, setDataFirebaseDetailTeam] = useState(null);
  useEffect(() => {
    referenceTask.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
    referenceTim.on('value', snapshot => {
      setDataFirebaseTim(snapshot.val());
    });
    referenceDetailTask(idTask).on('value', snapshot => {
      setDataFirebaseDetailTask(snapshot.val());
    });
    referenceDetailTim(idTeam).on('value', snapshot => {
      setDataFirebaseDetailTeam(snapshot.val());
    });
  }, []);
  useEffect(() => {
    referenceDetailTask(idTask).on('value', snapshot => {
      setDataFirebaseDetailTask(snapshot.val());
    });
  }, [idTask]);
  useEffect(() => {
    referenceDetailTim(idTeam).on('value', snapshot => {
      setDataFirebaseDetailTeam(snapshot.val());
    });
  }, [idTeam]);
  useEffect(() => {
    referenceTask.on('value', snapshot => {
      setDataFirebase(snapshot.val());
    });
  }, [score]);
  const Card = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 4, paddingRight: 5}}>
          <Text>Team : {props.name}</Text>
          <Text style={style.h4} numberOfLines={2}>
            {props.desc}
          </Text>
          <Text>{props.link}</Text>
        </View>
        <View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12}}>{props.status} at</Text>
            <Text style={{fontSize: 12}}>{props.donedate}</Text>
            <Text style={{fontSize: 12}}>Deadline :</Text>
            <Text style={{fontSize: 12}}>{props.date}</Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={style.h3}>{props.nilai}</Text>
          </View>
        </View>
      </View>
    );
  };
  if (
    dataFirebase === null ||
    dataFirebaseDetailTask === null ||
    dataFirebaseTim === null ||
    dataFirebaseDetailTeam === null
  ) {
    return <LoadingScreen />;
  }
  // if (score === '') {
  //   setScore(0);
  // } else if (score > 100) {
  //   setScore(100);
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{backgroundColor: WARNA_BACKGROUND, marginBottom: 90}]}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={[style.h2, {color: WARNA_UTAMA}]}>Penilaian</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[
                styles.menu,
                {borderBottomColor: team ? WARNA_UTAMA : 'grey'},
              ]}
              onPress={() => {
                setTeam(true);
                setTask(false);
              }}>
              <Text style={[style.h4, {color: team ? WARNA_UTAMA : 'grey'}]}>
                Team
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.menu,
                {borderBottomColor: task ? WARNA_UTAMA : 'grey'},
              ]}
              onPress={() => {
                setTeam(false);
                setTask(true);
              }}>
              <Text style={[style.h4, {color: task ? WARNA_UTAMA : 'grey'}]}>
                Task
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 15}}>
            {task === true
              ? dataFirebase.map(val => {
                  if (val.status === 'Done') {
                    return (
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                          refRBSheet.current.open();
                          setIdTask(val.id);
                        }}>
                        <Card
                          name={val.team_name}
                          desc={val.name}
                          status={val.status}
                          date={val.date}
                          link={val.link}
                          nilai={val.nilai}
                          donedate={val.donedate}
                        />
                      </TouchableOpacity>
                    );
                  }
                })
              : dataFirebaseTim.map((val, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.cardTim}
                      onPress={() => {
                        refRBSheet2.current.open();
                        setIdTeam(val.id);
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={style.h5}>{index + 1}</Text>
                      </View>
                      <View style={{flex: 4}}>
                        <Text style={style.h5}>{val.name}</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={style.h5}>{val.nilai}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </View>
          {/* Bottom sheet task*/}
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={650}
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
              Scoring Task
            </Text>
            <View
              style={{
                height: 1,
                marginVertical: 10,
                backgroundColor: '#D4DAE2',
              }}
            />
            <Text style={style.h4}>
              Team : {dataFirebaseDetailTask.team_name}
            </Text>
            <Text style={[style.h4normal, {marginVertical: 10}]}>
              Please add the score for the task!
            </Text>
            <View style={{marginBottom: 10}}>
              <Text style={style.h4medium}>Member :</Text>
              <Text style={style.h5}>{dataFirebaseDetailTask.member}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={style.h4medium}>Target :</Text>
              <Text style={style.h5}>{dataFirebaseDetailTask.name}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={style.h4medium}>Achievement :</Text>
              <Text style={style.h5}>{dataFirebaseDetailTask.keterangan}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={style.h4medium}>Deadline :</Text>
              <Text style={style.h5}>{dataFirebaseDetailTask.date}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={style.h4medium}>Donedate :</Text>
              <Text style={style.h5}>{dataFirebaseDetailTask.donedate}</Text>
            </View>
            <Text style={style.h4medium}>Link :</Text>
            <Hyperlink onPress={Linking.openURL} linkDefault={true}>
              <Text style={{textDecorationLine: 'underline', color: '#2D31FA'}}>
                {dataFirebaseDetailTask.link}
              </Text>
            </Hyperlink>
            <View>
              <Text
                style={[style.h4medium, {color: WARNA_UTAMA, marginTop: 10}]}>
                Scoring
              </Text>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={WARNA_UTAMA}
                maximumTrackTintColor="#000000"
                thumbTintColor={WARNA_UTAMA}
                onSlidingComplete={val => setScore(parseInt(val))}
                value={score !== '' && score < 101 ? parseFloat(score) : null}
              />
              <TextInput
                style={[
                  style.h4medium,
                  {
                    alignSelf: 'center',
                    borderWidth: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                keyboardType={'number-pad'}
                onChangeText={val => setScore(val)}
                value={score.toString()}
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
                onPress={() => {
                  refRBSheet.current.close();
                  referenceUpdateTask(idTask)
                    .update({
                      nilai: score,
                    })
                    .then(
                      Alert.alert(
                        'Success',
                        'Data penilaian berhasil disimpan',
                      ),
                    );
                }}>
                <Text style={[style.h4medium, {color: 'white'}]}>Score</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
          {/* end bottom sheet task */}
          {/* Bottom sheet tim*/}
          <RBSheet
            ref={refRBSheet2}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={650}
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
            <ScrollView>
              <Text
                style={[style.h3, {textAlign: 'center', color: WARNA_UTAMA}]}>
                Scoring Team
              </Text>
              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  backgroundColor: '#D4DAE2',
                }}
              />
              <Text style={style.h4}>Team : {dataFirebaseDetailTeam.name}</Text>
              <Text style={[style.h4normal, {marginVertical: 10}]}>
                Please add the score for the team!
              </Text>
              <View style={{marginBottom: 10}}>
                <Text style={[style.h4medium, {marginBottom: 10}]}>
                  Member :
                </Text>
                <View>
                  {dataFirebaseDetailTeam.anggota.map((val, index) => {
                    return (
                      <View style={{flexDirection: 'row', marginBottom: 5}}>
                        <Text style={style.h5}>{index + 1}</Text>
                        <Text style={style.h5}> {val}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={[style.h4medium, {marginBottom: 10}]}>
                  Target :
                </Text>
                <View>
                  {dataFirebase.map((val, index) => {
                    if (dataFirebaseDetailTeam.name === val.team_name) {
                      return (
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                          <Text style={style.h5}>{'\u2B24'}</Text>
                          <Text style={style.h5}> {val.name}</Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={[style.h4medium, {marginBottom: 10}]}>
                  Achievement :
                </Text>
                <View>
                  {dataFirebase.map((val, index) => {
                    if (
                      dataFirebaseDetailTeam.name === val.team_name &&
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
                </View>
              </View>

              <View>
                <Text
                  style={[style.h4medium, {color: WARNA_UTAMA, marginTop: 10}]}>
                  Scoring
                </Text>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={WARNA_UTAMA}
                  maximumTrackTintColor="#000000"
                  thumbTintColor={WARNA_UTAMA}
                  onSlidingComplete={val => setScore2(parseInt(val))}
                  value={
                    score2 !== '' && score2 < 101 ? parseFloat(score2) : null
                  }
                />
                <TextInput
                  style={[
                    style.h4medium,
                    {
                      alignSelf: 'center',
                      borderWidth: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                  keyboardType={'number-pad'}
                  onChangeText={val => setScore2(val)}
                  value={score2.toString()}
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
                  onPress={() => {
                    refRBSheet2.current.close();
                    referenceUpdateTeam(idTeam)
                      .update({
                        nilai: score2,
                      })
                      .then(
                        Alert.alert(
                          'Success',
                          'Data penilaian tim berhasil disimpan',
                        ),
                      );
                  }}>
                  <Text style={[style.h4medium, {color: 'white'}]}>Score</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
          {/* end bottom sheet task */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Penilaian;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  card: {
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
    marginBottom: 10,
    marginHorizontal: 5,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  cardTim: {
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
});
