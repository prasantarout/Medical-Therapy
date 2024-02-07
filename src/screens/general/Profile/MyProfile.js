import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import { Switch } from 'react-native-switch';
import { colors } from '../../../themes/colors';
import { images } from '../../../themes/images';
import { icons } from '../../../themes/icons';
import Button from '../../../components/buttons/Button';

const MyProfile = (props) => {

  const [notification, setNotification] = useState(false)

  const handleNotificationSwitch = () => {
    setNotification(!notification)
  }

  return (
    <SafeView>
      <NavBar />
      <View style={[css.px4]}>
        <View style={[css.rowBetween]}>
          <TitleTxt title="My Profile" />
          <View style={[css.row, css.aic]}>
            <Txt style={[css.bold, css.cPrimary, css.mr1, css.fs19]}>Notification</Txt>
            <Switch
              value={notification}
              onValueChange={(val) => setNotification(!notification)}
              circleSize={25}
              barHeight={35}
              backgroundActive={colors.primary}
              backgroundInactive="#e2e5ff"
              circleActiveColor={'#fff'}
              circleInActiveColor={colors.primary}
              changeValueImmediately={true}
              innerCircleStyle={styles.innerCircleStyle}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2.4}
              switchBorderRadius={30}
            />
          </View>
        </View>
        <View style={[css.card, css.mt3, css.row]}>
          <View style={[styles.imageArea]}>
            <Image style={[styles.profileImage]} source={{ uri: images.sampleUser }} />
          </View>
          <View style={[css.center, css.px7]}>
            <View style={[]}>
              <Txt style={[css.fs25, css.bold, css.cPrimary]} >Loise Lane</Txt>
              <View style={[css.row, css.aic]} >
                <Image source={icons.cardMail} style={[styles.iconStyle]} />
                <Txt style={[styles.textLighte, css.ml1, css.medium]} >loiselane@gmail.com</Txt>
              </View>
              <Button
                title="Change Password"
                style={[css.mt2]}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  innerCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0
  },
  imageArea: {
    borderWidth: 5,
    borderColor: "#dfe0ee",
    alignSelf: 'flex-start',
    borderRadius: 100,
    width: 200,
    height: 200,
    overflow: 'hidden',
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  textLighte: {
    color: "#8a8a8a",
  }
});
