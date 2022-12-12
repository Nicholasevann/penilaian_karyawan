import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style/Home.style';
import getData from '../../../config/asyncStorage/getData';
import style from '../../../config/style/style';
import LoadingScreen from '../../../components/LoadingScreen';
import {WARNA_UTAMA, WARNA_BACKGROUND, TEXT_SECOND} from '../../../utils/Warna';
import Header from '../../../components/Header';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ProgressHome from '../../../components/ProgressHome';
import LinearGradient from 'react-native-linear-gradient';
import {database, firebase} from '@react-native-firebase/database';
import {
  referenceKaryawan,
  referenceTask,
  referenceTim,
} from '../../../config/asyncStorage/getFirebase';
import {color} from 'react-native-reanimated';
import Hyperlink from 'react-native-hyperlink';
import {referenceUpdate} from '../../../config/asyncStorage/updateFirebase';

const Home = ({navigation}) => {
  const [data, setData] = useState(null);
  const [dataFirebase, setDataFirebase] = useState(null);
  const [dataFirebaseTask, setDataFirebaseTask] = useState(null);
  const [dataFirebaseTim, setDataFirebaseTim] = useState(null);
  const [done, setDone] = useState(false);
  const [onProgress, setOnProgress] = useState(false);
  const [pending, setPending] = useState(true);
  const [ganti, setGanti] = useState(false);
  const Card = props => {
    return (
      <View style={styles.card}>
        <View style={{flex: 4, paddingRight: 5}}>
          <Text style={style.h4}>{props.desc}</Text>
          <Hyperlink onPress={Linking.openURL} linkDefault={true}>
            {done === true ? (
              <>
                <Text style={{fontSize: 10}}>{props.link}</Text>
                <Text style={{fontSize: 10, color: 'black'}}>
                  Achievement : {props.achieve}
                </Text>
              </>
            ) : null}
          </Hyperlink>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 10, fontStyle: 'italic'}}>
            {props.status}
          </Text>
          {done === true ? (
            <Text style={{fontSize: 10, fontStyle: 'italic'}}>
              {props.donedate}
            </Text>
          ) : null}
          <Text style={{fontSize: 10, fontStyle: 'italic'}}>Deadline :</Text>
          <Text style={{fontSize: 10, fontStyle: 'italic'}}>{props.date}</Text>
          {done === true ? <Text style={[style.h3]}>{props.score}</Text> : null}
        </View>
      </View>
    );
  };
  const Pending = () => {
    return (
      <View>
        <FlatList
          data={dataFirebaseTask}
          renderItem={val => {
            return (
              <>
                {data.team_name === val.item.team_name &&
                val.item.status === 'Pending' &&
                val.item.on !== false ? (
                  <Card
                    desc={val.item.name}
                    status={val.item.status}
                    date={val.item.date}
                  />
                ) : null}
              </>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  const OnProgress = () => {
    return (
      <View>
        <FlatList
          data={dataFirebaseTask}
          renderItem={val => {
            return (
              <>
                {data.name === val.item.member &&
                val.item.status === 'On Progress' &&
                val.item.on !== false ? (
                  <Card
                    desc={val.item.name}
                    status={val.item.status}
                    date={val.item.date}
                  />
                ) : null}
              </>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  console.log(dataFirebaseTask);
  const Done = () => {
    return (
      <View>
        <FlatList
          data={dataFirebaseTask}
          renderItem={val => {
            return (
              <>
                {data.name === val.item.member &&
                val.item.status === 'Done' &&
                val.item.on !== false ? (
                  <Card
                    desc={val.item.name}
                    status={val.item.status}
                    date={val.item.date}
                    link={val.item.link}
                    score={val.item.nilai}
                    donedate={val.item.donedate}
                    achieve={val.item.keterangan}
                  />
                ) : null}
              </>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  useEffect(() => {
    if (data === null || dataFirebase === null) {
      getData().then(res => setData(res));
      referenceKaryawan.on('value', snapshot => {
        setDataFirebase(snapshot.val());
      });
      referenceTask.on('value', snapshot => {
        setDataFirebaseTask(snapshot.val());
      });
      referenceTim.on('value', snapshot => {
        setDataFirebaseTim(snapshot.val());
      });
    }
    // referenceRemove.remove();
  });
  useEffect(() => {
    if (data !== null) {
      referenceUpdate(data.id)
        .update({
          totalnilai: parseInt(totalnilai),
        })
        .then(console.log('masuk total nilai'));
    }
  }, [ganti]);

  if (
    data === null ||
    dataFirebase === null ||
    dataFirebaseTask === null ||
    dataFirebaseTim === null
  ) {
    return <LoadingScreen />;
  }
  const nilai = [];
  var totalnilai = 0;
  dataFirebaseTask.map(val => {
    if (val.status === 'Done' && val.member === data.name && val.on !== false) {
      nilai.push(parseInt(val.nilai));
    }
  });
  if (nilai !== []) {
    for (let index = 0; index <= nilai.length - 1; index++) {
      totalnilai += nilai[index] / nilai.length;
    }
  }
  if (totalnilai !== 0 && ganti === false) {
    setGanti(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[{backgroundColor: WARNA_BACKGROUND, marginBottom: 90}]}>
          <Header
            name={data.name}
            role={data.role === undefined ? 'Staff' : data.role}
          />
          <View style={styles.contentContainer}>
            {dataFirebaseTim.map(val => {
              if (val.name === data.team_name) {
                return (
                  <ProgressHome
                    background={WARNA_UTAMA}
                    percentindividu={parseInt(totalnilai)}
                    percenttim={parseInt(val.nilai)}
                  />
                );
              }
            })}
          </View>
          <View style={{padding: 15}}>
            <ScrollView
              horizontal={true}
              style={{flexDirection: 'row', marginBottom: 15}}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  backgroundColor: pending ? WARNA_UTAMA : 'white',
                  borderColor: pending ? WARNA_UTAMA : 'grey',
                }}
                onPress={() => {
                  setDone(false);
                  setPending(true);
                  setOnProgress(false);
                }}>
                <Text
                  style={[style.h4medium, {color: pending ? 'white' : 'grey'}]}>
                  Pending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  backgroundColor: onProgress ? WARNA_UTAMA : 'white',
                  borderColor: onProgress ? WARNA_UTAMA : 'grey',
                }}
                onPress={() => {
                  setDone(false);
                  setOnProgress(true), setPending(false);
                }}>
                <Text
                  style={[
                    style.h4medium,
                    {color: onProgress ? 'white' : 'grey'},
                  ]}>
                  On Progress
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: done ? WARNA_UTAMA : 'grey',
                  backgroundColor: done ? WARNA_UTAMA : 'white',
                }}
                onPress={() => {
                  setDone(true);
                  setOnProgress(false);
                  setPending(false);
                }}>
                <Text
                  style={[style.h4medium, {color: done ? 'white' : 'grey'}]}>
                  Done
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {done ? (
              <Done />
            ) : onProgress ? (
              <OnProgress />
            ) : pending ? (
              <Pending />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
