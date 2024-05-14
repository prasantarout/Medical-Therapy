import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import Txt from '../micro/Txt';

const NotificationCard = props => {
  const {image, title, info, description, time} = props;

  return (
    <View style={[styles.container, css.p2, css.rowBetween]}>
      <View style={[css.row, css.aic]}>
        <Image source={{uri: image}} style={[styles.profilePicStyle]} />
        <View style={[css.ml3]}>
          <Txt style={[css.semiBold, css.fs18]}>
            <Txt style={[css.cPrimary, css.semiBold]}>{title} </Txt>
            {info}
          </Txt>
          <Txt style={[css.textLighte, css.fs17]}>{description}</Txt>
        </View>
      </View>
      <Txt style={[css.cPrimary, css.semiBold]}>{time}</Txt>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f5ff',
    borderRadius: 10,
  },
  profilePicStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
