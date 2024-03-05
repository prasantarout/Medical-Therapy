import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import TitleTxt from '../../../components/common/TitleTxt';
import SearchInput from '../../../components/inputs/SearchInput';
import SmallBtn from '../../../components/buttons/SmallBtn';
import { images } from '../../../themes/images';
import PatientCard from '../../../components/common/PatientCard';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import useScreenDimension from '../../../utils/useScreenDimension';
import useOrientation from '../../../utils/useOrientation';

const EnrolmentQueue = () => {
  const { width, screenHeight } = useScreenDimension();
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

  const PatientsRenderItem = ({ item, index }) => {
    return (
      <PatientCard
        name={item.name}
        location={item.location}
        date={item.date}
        time={item.time}
        image={item.profile}
        Button={false}
        style={{
          width: orientation == 'LANDSCAPE' ? width / 4 - 38 : width / 3 - 30,
        }}
      />
    );
  };

  const numColumns = orientation == 'PORTRAIT' ? 3 : 4;

  return (
    <SafeView {...props}>

      <View style={[css.px5, css.f1, css.py4]}>
        <TitleTxt title={'Enrollment Queue'} />
        <View style={[css.row, css.aic, css.mt4]}>
          <SearchInput
            style={{ width: normalize(268) }}
            placeholder={'Search here...'}
          />
        </View>
        <FlatList
          numColumns={numColumns}
          key={numColumns}
          showsVerticalScrollIndicator={false}
          data={patientData}
          renderItem={PatientsRenderItem}
          style={{ flex: 1, marginTop: normalize(10) }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </SafeView>
  );
};

export default EnrolmentQueue;

const styles = StyleSheet.create({});
