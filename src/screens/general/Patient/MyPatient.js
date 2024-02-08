import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import css, {height} from '../../../themes/space';
import SearchInput from '../../../components/inputs/SearchInput';
import SmallBtn from '../../../components/buttons/SmallBtn';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import {images} from '../../../themes/images';
import PatientCard from '../../../components/common/PatientCard';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {icons} from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import {fonts} from '../../../themes/fonts';
import useScreenDimension from '../../../utils/useScreenDimension';
import useOrientation from '../../../utils/useOrientation';

const MyPatient = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const width = useScreenDimension();
  const orientation = useOrientation();

  const patientData = [
    {
      id: 1,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient1,
    },
    {
      id: 2,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient2,
    },
    {
      id: 3,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient3,
    },
    {
      id: 4,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient1,
    },
    {
      id: 5,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient2,
    },
    {
      id: 6,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient3,
    },
    {
      id: 7,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient1,
    },
    {
      id: 8,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient2,
    },
    {
      id: 9,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient3,
    },
    {
      id: 10,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient1,
    },
    {
      id: 11,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient2,
    },
    {
      id: 12,
      name: 'John Doe',
      location: 'Lorem ipsum sit amet',
      date: '01 Sep 2023',
      time: '10:00 am',
      profile: images.patient3,
    },
  ];

  const numColumns = orientation == 'PORTRAIT' ? 3 : 4;

  const PatientsRenderItem = ({item, index}) => {
    return (
      <PatientCard
        onPress={() => setModalVisible(true)}
        name={item.name}
        location={item.location}
        date={item.date}
        time={item.time}
        image={item.profile}
        Button={true}
        navigateTo={() => navigation.navigate('ServiceEnrollment')}
        style={{
          width: orientation == 'LANDSCAPE' ? width / 4 - 30 : width / 3 - 30,
        }}
      />
    );
  };

  return (
    <>
      <SafeView>
        <NavBar />
        <View style={[css.px5, css.f1, css.py4]}>
          <TitleTxt title={'My Patients'} />
          <View style={[css.rowBetween, css.aic, css.mt4]}>
            <View style={[css.f1]}>
              <SearchInput style={[]} placeholder={'Search here...'} />
            </View>
            <View style={[css.row, css.aic]}>
              <SmallBtn
                onPress={'EnrolmentQueue'}
                title={'Enrollment queue'}
                style={[styles.Button, styles.btn]}
                btnStyle={styles.btnTxt}
              />
              <SmallBtn
                onPress={'AddPatient'}
                title={'Add new patient'}
                style={[styles.Button2, styles.btn]}
                btnStyle={styles.btnTxt2}
              />
            </View>
          </View>
          <FlatList
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false}
            data={patientData}
            keyExtractor={item => item.id}
            renderItem={PatientsRenderItem}
            style={{flex: 1, marginTop: normalize(10)}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
          <Modal
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={0.6}
            isVisible={modalVisible}
            deviceHeight={height}
            style={[css.m0, css.center]}
            statusBarTranslucent={true}>
            <View style={[styles.modal]}>
              <TouchableOpacity
                style={[styles.closeBtnCtnr]}
                activeOpacity={0.9}
                onPress={() => setModalVisible(false)}>
                <Image source={icons.closeBtn} style={[styles.closeBtn]} />
              </TouchableOpacity>
              <Txt style={[styles.modalTitle]}>Patient Details</Txt>
              <View style={[css.row, css.mt4]}>
                <View style={[css.jcc, css.aic]}>
                  <Image
                    source={images.patientZoomPic}
                    style={styles.profileImage}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false), navigation.navigate('Assignment');
                    }}
                    activeOpacity={0.7}
                    style={[styles.btn1]}>
                    <Text style={[styles.modalbtnTxt, {color: colors.white}]}>
                      All Assignments
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false),
                        navigation.navigate('ServiceEnrollment');
                    }}
                    activeOpacity={0.8}
                    style={[styles.btn2]}>
                    <Text style={[styles.modalbtnTxt, {color: colors.primary}]}>
                      Service Enroll now
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.newCtn}>
                    <Txt
                      style={{
                        fontSize: normalize(6),
                        color: colors.white,
                        fontWeight: '500',
                      }}>
                      New
                    </Txt>
                  </View>
                </View>
                <View style={[css.f1, css.ml5, css.jcc]}>
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Name:</Txt>
                    <Txt style={[styles.value, css.ml19]}>
                      Jennifer Morrison
                    </Txt>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#E9EBE3',
                      marginVertical: normalize(8),
                    }}
                  />
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Phone No.:</Txt>
                    <Txt style={[styles.value, css.ml12]}>
                      (041) 12345 14578
                    </Txt>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#E9EBE3',
                      marginVertical: normalize(8),
                    }}
                  />
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Email Address:</Txt>
                    <Txt style={[styles.value, css.ml4]}>
                      morrijennifer@gmail.com
                    </Txt>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#E9EBE3',
                      marginVertical: normalize(8),
                    }}
                  />
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Location:</Txt>
                    <Txt style={[styles.value, css.ml14]}>
                      32A, Lorem Ipsum, Lorem
                    </Txt>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#E9EBE3',
                      marginVertical: normalize(8),
                    }}
                  />
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Date:</Txt>
                    <Txt style={[styles.value, css.ml21]}>12 March 2023</Txt>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#E9EBE3',
                      marginVertical: normalize(8),
                    }}
                  />
                  <View style={[css.row, css.aic]}>
                    <Txt style={styles.title}>Time:</Txt>
                    <Txt style={[styles.value, css.ml20]}>04:00 P.M.</Txt>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeView>
    </>
  );
};

export default MyPatient;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    marginLeft: 16,
  },

  Button2: {
    backgroundColor: colors.primary,
    marginLeft: normalize(4),
  },
  btn: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 16,
    // width: 240
  },
  btnTxt: {
    fontSize: 17,
    color: colors.primary,
  },
  btnTxt2: {
    fontSize: 19,
    color: '#fff',
  },
  modal: {
    backgroundColor: colors.bgColor,
    borderRadius: normalize(5),
    // width: '87%',
    // paddingVertical: normalize(14),
    paddingHorizontal: normalize(12),
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -38,
    right: -78,
  },
  closeBtn: {
    height: normalize(55),
    width: normalize(55),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: normalize(12),
    color: colors.primaryTextColor,
    fontWeight: '600',
  },
  profileImage: {
    height: normalize(100),
    width: normalize(89),
    resizeMode: 'cover',
  },
  btn1: {
    height: normalize(22),
    width: normalize(89),
    backgroundColor: colors.primary,
    marginTop: normalize(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(2),
  },
  btn2: {
    height: normalize(22),
    width: normalize(89),
    backgroundColor: colors.white,
    marginTop: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(2),
    borderWidth: normalize(1),
    borderColor: '#E0E0E0',
  },
  modalbtnTxt: {
    fontFamily: fonts.Regular,
    fontSize: normalize(7),
    fontWeight: '500',
  },
  newCtn: {
    paddingHorizontal: normalize(3),
    paddingVertical: normalize(1),
    backgroundColor: colors.primary,
    borderRadius: normalize(3),
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(23),
    position: 'absolute',
    top: normalize(7),
    left: normalize(6),
  },
  title: {
    fontFamily: fonts.Regular,
    fontWeight: '400',
    color: '#444444',
    fontSize: normalize(7),
  },
  value: {
    fontFamily: fonts.Regular,
    fontWeight: '400',
    color: colors.primary,
    fontSize: normalize(7),
    width: normalize(93),
  },
});
