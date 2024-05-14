import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import {icons} from '../../../themes/icons';
import {colors} from '../../../themes/colors';
import Divider from '../../../components/micro/Divider';
import Button from '../../../components/buttons/Button';

const PatientSessionDetails = props => {
  const [item, setItem] = useState(props?.route?.params?.item);

  const IconTextBlock = ({icon, title, value, valueStyle}) => {
    return (
      <View style={[css.mt1]}>
        <View style={[css.row, css.aic]}>
          <Image source={icon} style={[styles.tagIconStyle]} />
          <Txt style={[css.fs17, css.ml1, css.textPrimary, css.medium]}>
            {title}
          </Txt>
          <Txt style={[css.fs15, css.ml1, css.textLighte, valueStyle]}>
            {value}
          </Txt>
        </View>
      </View>
    );
  };

  const InternalListBlock = ({title, value}) => {
    return (
      <View style={[css.w33, css.mb1]}>
        <Txt style={[css.fs16, css.medium]}>{title}</Txt>
        <Txt style={[css.fs15, css.regular, styles.detailsStyle]}>{value}</Txt>
      </View>
    );
  };

  return (
    <SafeView {...props}>
      <View style={[css.f1, css.px4]}>
        <TitleTxt title="Session Details" />
        <View style={[css.mt3, css.card]}>
          <View style={[css.rowBetween]}>
            <View style={[css.w60]}>
              <Txt style={[css.fs18, css.semiBold]}>{item?.discription}</Txt>
            </View>
            <Image
              style={[styles.cardRightIcon]}
              source={
                props.route.params?.type == 0
                  ? icons.inProcess
                  : icons.cardCompleted
              }
            />
          </View>

          <View style={[css.mt2, css.w60, css.fw]}>
            <View style={[css.row, css.aic, styles.iconTextContainer]}>
              <Image
                source={{uri: item?.profile_photo_url}}
                style={[styles.userIconStyle]}
              />
              <View>
                <Txt style={[css.fs18, css.semiBold, css.ml1]}>
                  {item?.patient_name}
                </Txt>
                <View
                  style={[css.row, css.aic, styles.iconTextContainer, css.ml1]}>
                  <Image
                    source={icons.location2}
                    style={[styles.cardIconStyle]}
                  />
                  <Txt style={[css.fs18, css.ml1]}>{item?.location}</Txt>
                </View>
              </View>
            </View>
          </View>

          <View style={[css.mb5, css.mt2]}>
            <IconTextBlock
              icon={icons.device}
              title="Device :"
              value={`${item?.sessionData[0]?.device?.device?.deviceTypeDesc} (${item?.sessionData[0]?.device?.mode})-${item?.sessionData[0]?.device?.device?.serialNo}`}
            />
            <IconTextBlock
              icon={icons.mask}
              title="Therapist :"
              value={`${item?.therapist?.name}`}
              valueStyle={[css.capitalization]}
            />
            <IconTextBlock
              icon={icons.office}
              title="Organisation :"
              value={`${item?.orgs?.org_name}`}
              valueStyle={[css.capitalization]}
            />
          </View>
          <Divider />
          <View style={[css.mt5]}>
            <Txt style={[css.fs25, css.semiBold]}>Setting</Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="Pressure(in cmH2O)"
                value={item?.sessionData[0]?.set?.press}
              />
              <InternalListBlock
                title="EPR Type"
                value={item?.sessionData[0]?.set?.EPRType}
              />
              <InternalListBlock
                title="Min. EPAP"
                value={item?.sessionData[0]?.set?.minEPAP}
              />
              <InternalListBlock
                title="Max. Pressure"
                value={item?.sessionData[0]?.set?.maxPress}
              />
              <InternalListBlock
                title="EPR Level"
                value={item?.sessionData[0]?.set?.EPRLevel}
              />
              <InternalListBlock
                title="Max. EPAP"
                value={item?.sessionData[0]?.set?.maxEPAP}
              />
              <InternalListBlock
                title="Min. Pressure"
                value={item?.sessionData[0]?.set?.minPress}
              />
              <InternalListBlock
                title="IPAP"
                value={item?.sessionData[0]?.set?.IPAP}
              />
              <InternalListBlock
                title="Min. Pressure Support"
                value={item?.sessionData[0]?.set?.minPS}
              />
              <InternalListBlock
                title="Autoset Response"
                value={item?.sessionData[0]?.set?.autosetResponse}
              />
              <InternalListBlock
                title="EPAP"
                value={item?.sessionData[0]?.set?.EPAP}
              />
              <InternalListBlock
                title="Max. Pressure Support"
                value={item?.sessionData[0]?.set?.maxPS}
              />
            </View>
          </View>
          <View style={[css.mt5]}>
            <Txt style={[css.fs25, css.semiBold]}>Usage</Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="Duration"
                value={item?.sessionData[0]?.usage?.duration}
              />
              <InternalListBlock
                title="Mask On"
                value={item?.sessionData[0]?.usage?.maskOn}
              />
              <InternalListBlock
                title="Mask Off"
                value={item?.sessionData[0]?.usage?.maskOff}
              />
            </View>
          </View>
          <View style={[css.mt5]}>
            <Txt style={[css.fs25, css.semiBold]}>Clinical Metrics</Txt>
            <Txt style={[css.fs18, css.semiBold]}>
              Target inhalation positive airway pressure(in cmH2O)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtIPAP['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtIPAP['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtIPAP?.max}
              />
            </View>
            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              Target exhalation positive airway pressure(in cmH2O)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtEPAP['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtEPAP['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tgtEPAP?.max}
              />
            </View>
            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              Leak metrics(in liters per second)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.leak['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.leak['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.leak?.max}
              />
            </View>
            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              Respiratory rate metrics(in cmH2O)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.respRate['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.respRate['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.respRate?.max}
              />
            </View>

            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              ieRatio metrics (inhalation:exhalation ratio)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.ieRatio['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.ieRatio['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.ieRatio?.max}
              />
            </View>
            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              Minute ventilation metrics(in liters per minute)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.minuteVent['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.minuteVent['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.minuteVent?.max}
              />
            </View>
            <Txt style={[css.fs18, css.semiBold, css.mt2]}>
              Tidal volume metrics(in liters)
            </Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="95% of target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tidalVol['95']}
              />
              <InternalListBlock
                title="Median target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tidalVol['50']}
              />
              <InternalListBlock
                title="Maximum target IPAP"
                value={item?.sessionData[0]?.clinical_metrics?.tidalVol?.max}
              />
            </View>
          </View>
          <View style={[css.mt5]}>
            <Txt style={[css.fs25, css.semiBold]}>Climate control items</Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="Type of humidifier used"
                value={item?.sessionData[0]?.patientInterface?.humidifier}
              />
              <InternalListBlock
                title="Type of heated tube used"
                value={item?.sessionData[0]?.patientInterface?.heatedTube}
              />
              <InternalListBlock
                title="Absolute ambient humidity"
                value={item?.sessionData[0]?.patientInterface?.ambHumidity}
              />
            </View>
          </View>
          <View style={[css.row]}>
            {/* <Button
                            title={props.route.params?.type == 0 ? "Mark As Complete" : "View Evaluation Review"}
                            style={[css.mt3]}
                            onPress={() => props.navigation?.navigate(props.route.params?.type == 0 ? 'EvaluationForm' : 'EvaluationResult')}
                        /> */}
          </View>
        </View>
      </View>
    </SafeView>
  );
};

export default PatientSessionDetails;

const styles = StyleSheet.create({
  cardRightIcon: {
    resizeMode: 'contain',
    height: 25,
    width: 100,
  },
  tagStyle: {
    backgroundColor: '#e5f8fd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tagTextStyle: {
    color: colors.secondary,
  },
  iconTextContainer: {
    paddingRight: 10,
    minWidth: 150,
    marginRight: 16,
    marginBottom: 5,
  },
  cardIconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  userIconStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  subHeading: {
    paddingLeft: 80,
  },
  tagIconStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  blueTagStyle: {
    backgroundColor: '#f2f3f8',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsStyle: {
    lineHeight: 30,
    color: colors.ternaryTextColor,
  },
});
