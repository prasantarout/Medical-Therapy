import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SafeView from '../../../components/common/SafeView';
import Loader from '../../../utils/Loader';
import TitleTxt from '../../../components/common/TitleTxt';
import {useNavigation} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';

const EvaluationReview = () => {
  const navigation = useNavigation();

  return (
    <SafeView sticky={[1]}>
      <Loader visible={false} />
      <View style={styles.headerContainer}>
        <TitleTxt title="Evaluation Review" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.p4, css.pt0]}>
        <Text>here</Text>
      </View>
    </SafeView>
  );
};

export default EvaluationReview;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(8),
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(16),
    paddingHorizontal: normalize(10),
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
});
