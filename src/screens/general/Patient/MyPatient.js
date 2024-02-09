import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import css, { height } from '../../../themes/space';
import SearchInput from '../../../components/inputs/SearchInput';
import SmallBtn from '../../../components/buttons/SmallBtn';
import normalize from '../../../utils/normalize';
import { colors } from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import { images } from '../../../themes/images';
import PatientCard from '../../../components/common/PatientCard';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { icons } from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import { fonts } from '../../../themes/fonts';
import useScreenDimension from '../../../utils/useScreenDimension';
import useOrientation from '../../../utils/useOrientation';
import { widthToDp as wp } from '../../../utils/responsive';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';

const MyPatient = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const width = useScreenDimension()
  const orientation = useOrientation()



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

  const numColumns = orientation == 'PORTRAIT' ? 3 : 4

  const PatientsRenderItem = ({ item, index }) => {
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
          width: orientation == 'LANDSCAPE' ? width / 4 - 30 : width / 3 - 30
        }}
      />
    );
  };

  const Modalinfo = ({ title, value }) => {
    return (
      <View style={[css.row, css.aic]}>
        <Txt style={styles.title}>{title}</Txt>
        <Txt style={[styles.value]}>
          {value}
        </Txt>
      </View>
    )
  }

  return (
    <>
      <SafeView>

        <View style={[css.px5, css.f1, css.py4]}>
          <TitleTxt title={'My Patients'} />
          <View style={[css.rowBetween, css.aic, css.mt4]}>
            <View style={[css.f1]}>
              <SearchInput
                style={[]}
                placeholder={'Search here...'}
              />
            </View>
            <View style={[css.row, css.aic,]} >
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
            style={{ flex: 1, marginTop: normalize(10) }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
          <Modal
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={0}
            isVisible={modalVisible}
            deviceHeight={height}
            deviceWidth={width}
            style={[css.m0, css.p0]}
            statusBarTranslucent={true}
          >
            <View style={[css.f1, css.center, styles.backdrop]} >

              <View style={[styles.modalStyle,{maxWidth: width - normalize(50)}]}>
                <TouchableOpacity
                  style={[styles.closeBtnCtnr]}
                  activeOpacity={0.9}
                  onPress={() => setModalVisible(false)}>
                  <Image source={icons.closeIcon} style={[styles.closeBtn]} />
                </TouchableOpacity>
                <Txt style={[styles.modalTitle, { fontSize: wp(2.6, width) }]}>Patient Details</Txt>
                <View style={[css.row, css.mt4]}>
                  <View style={[css.jcc, css.aic]}>
                    <ImageBackground
                      source={images.patientZoomPic}
                      style={[styles.profileImage,{
                        width: width/4,
                        height: width/4
                      }]}
                    >
                      <View style={styles.newCtn}>
                        <Txt style={[css.fs14, css.medium, css.textWhite]}>
                          New
                        </Txt>
                      </View>
                    </ImageBackground>

                    <Button
                      title="All Assignments"
                      style={[css.mt2, css.w100]}
                      onPress={() => {
                        setModalVisible(false), navigation.navigate('Assignment');
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false),
                          navigation.navigate('ServiceEnrollment');
                      }}
                      activeOpacity={0.8}
                      style={[styles.btn2]}>
                      <Text style={[styles.modalbtnTxt, { color: colors.primary }]}>
                        Service Enroll now
                      </Text>
                    </TouchableOpacity>

                  </View>

                  <View style={[css.ml5, css.jcc]}>
                    <Modalinfo
                      title="Name:"
                      value="Jennifer Morrison"
                    />
                    <Divider style={[css.my3]} />
                    <Modalinfo
                      title="Phone No.:"
                      value="(041) 12345 14578"
                    />
                    <Divider style={[css.my3]} />
                    <Modalinfo
                      title="Email Address:"
                      value="morrijennifer@gmail.com"
                    />
                    <Divider style={[css.my3]} />
                    <Modalinfo
                      title="Location:"
                      value="32A, Lorem Ipsum, Lorem"
                    />
                    <Divider style={[css.my3]} />
                    <Modalinfo
                      title="Date:"
                      value="12 March 2023"
                    />
                    <Divider style={[css.my3]} />
                    <Modalinfo
                      title="Time:"
                      value="04:00 P.M"
                    />
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
    marginLeft: 16
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
  modalStyle: {
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    padding:30
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -30,
    right: -30,
  },
  closeBtn: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  modalTitle: {
    color: colors.primaryTextColor,
    fontFamily: fonts.SemiBold
  },
  profileImage: {
    // maxWidth: 200,
    resizeMode: 'cover',
  },
  btn2: {
    height: 55,
    width: "100%",
    backgroundColor: colors.white,
    marginTop: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(2),
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  modalbtnTxt: {
    fontFamily: fonts.Medium,
    fontSize: 16,
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
    color: '#444444',
    fontSize: 18,
    width: 160,
  },
  value: {
    fontFamily: fonts.Regular,
    fontWeight: '400',
    color: colors.primary,
    fontSize: 18,
    // width: normalize(93),
  },
  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
});
