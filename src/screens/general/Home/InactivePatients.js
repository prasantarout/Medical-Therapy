import React from 'react';
import DashboardCradDetails from './DashboardCradDetails';
import {View} from 'react-native';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';

const InactivePatients = () => {
  return (
    <SafeView sticky={[1]}>
      <View style={[css.f1, css.p4]}>
        <DashboardCradDetails title={'InactivePatients'} />
      </View>
    </SafeView>
  );
};

export default InactivePatients;
