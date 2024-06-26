/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import {icons} from '../../../themes/icons';
import {colors} from '../../../themes/colors';
import Divider from '../../../components/micro/Divider';
// import Button from '../../../components/buttons/Button';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import normalize from '../../../utils/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getPatientSessionDetailsReq} from '../../../redux/reducer/PatientReducer';
import {getFormattedDate} from '../../../utils/DateConverter';
import moment from 'moment';

let dashboardStatus = '';

const PatientSessionDetails = props => {
  // console.log('props?.route?.params', props?.route?.params);
  const [item, setItem] = useState(props?.route?.params?.item);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const PatientReducer = useSelector(state => state.PatientReducer);

  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {
      dispatch(
        getPatientSessionDetailsReq({
          ecn: props?.route?.params?.ecn,
          session_date: getFormattedDate(
            props?.route?.params?.date,
            'YYYY-MM-DD',
          ),
        }),
      );
    }
  }, []);

  if (dashboardStatus === '' || PatientReducer.status !== dashboardStatus) {
    switch (PatientReducer.status) {
      case 'PATIENT/getPatientSessionDetailsReq':
        dashboardStatus = PatientReducer.status;
        break;
      case 'PATIENT/getPatientSessionDetailsSuccess':
        // console.log('came to here');
        dashboardStatus = PatientReducer.status;
        // console.log(
        //   'PatientReducer?.getPatientSessionDetailsResponse',
        //   PatientReducer?.getPatientSessionDetailsResponse,
        // );
        setItem(PatientReducer?.getPatientSessionDetailsResponse);
        break;
      case 'PATIENT/getPatientSessionDetailsFailure':
        dashboardStatus = PatientReducer.status;
        break;
    }
  }

  // console.log('item', item);

  return (
    <SafeView {...props}>
      <View style={styles.headerContainer}>
        <TitleTxt title={'Session Details'} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.px4]}>
        <View style={[css.card]}>
          <View style={[css.rowBetween]}>
            <View style={[css.w60]}>
              <Txt style={[css.fs18, css.semiBold]}>
                {item?.sessions?.discription}
              </Txt>
            </View>
            <Image
              style={[styles.cardRightIcon]}
              source={
                props.route.params?.type === 0
                  ? icons.inProcess
                  : icons.cardCompleted
              }
            />
          </View>

          <View style={[css.mt2, css.w60, css.fw]}>
            <View style={[css.row, css.aic, styles.iconTextContainer]}>
              <Image
                source={{uri: item?.patient?.profile_photo_url}}
                style={[styles.userIconStyle]}
              />
              <View>
                <Txt style={[css.fs18, css.semiBold, css.ml1]}>
                  {item?.patient?.full_name}
                </Txt>
                <View
                  style={[css.row, css.aic, styles.iconTextContainer, css.ml1]}>
                  <Image
                    source={icons.location2}
                    style={[styles.cardIconStyle]}
                  />
                  <Txt style={[css.fs18, css.ml1]}>
                    {item?.patient?.location}
                  </Txt>
                </View>
              </View>
            </View>
          </View>

          <View style={[css.mb5, css.mt2]}>
            <IconTextBlock
              icon={icons.device}
              title="Device :"
              value={`${item?.sessions?.device?.deviceTypeDesc || ''} ${
                item?.sessions?.device?.deviceType || ''
              } - ${item?.sessions?.device?.serialNo || ''}`}
            />
            <IconTextBlock
              icon={icons.mask}
              title="Therapist :"
              value={`${item?.sessions?.therapist_name}`}
              valueStyle={[css.capitalization]}
            />
            <IconTextBlock
              icon={icons.office}
              title="Organisation :"
              value={`${item?.patient?.org_name}`}
              valueStyle={[css.capitalization]}
            />
          </View>
          <Divider />
          <View style={[css.mt5]}>
            <Txt style={[css.fs25, css.semiBold]}>Setting</Txt>
            <View style={[css.row, css.aic, css.fw]}>
              <InternalListBlock
                title="Pressure(in cmH2O)"
                value={item?.sessions?.set?.press}
              />
              <InternalListBlock
                title="EPR Type"
                value={item?.sessions?.set?.EPRType}
              />
              <InternalListBlock
                title="Min. EPAP"
                value={item?.sessions?.set?.minEPAP}
              />
              <InternalListBlock
                title="Max. Pressure"
                value={item?.sessions?.set?.maxPress}
              />
              <InternalListBlock
                title="EPR Level"
                value={item?.sessions?.set?.EPRLevel}
              />
              <InternalListBlock
                title="Max. EPAP"
                value={item?.sessions?.set?.maxEPAP}
              />
              <InternalListBlock
                title="Min. Pressure"
                value={item?.sessions?.set?.minPress}
              />
              <InternalListBlock
                title="IPAP"
                value={item?.sessions?.set?.IPAP}
              />
              <InternalListBlock
                title="Min. Pressure Support"
                value={item?.sessions?.set?.minPS}
              />
              <InternalListBlock
                title="Autoset Response"
                value={item?.sessions?.set?.autosetResponse}
              />
              <InternalListBlock
                title="EPAP"
                value={item?.sessions?.set?.EPAP}
              />
              <InternalListBlock
                title="Max. Pressure Support"
                value={item?.sessions?.set?.maxPS}
              />
            </View>
            <View style={[css.mt5]}>
              <Txt style={[css.fs25, css.semiBold]}>Usage</Txt>
              <View style={[css.row, css.aifs, css.fw]}>
                <InternalListBlock
                  title="Duration"
                  value={item?.sessions?.usage?.duration}
                />
                <InternalListBlockDateArr
                  title="Mask On"
                  value={item?.sessions?.usage?.maskOn}
                />
                <InternalListBlockDateArr
                  title="Mask Off"
                  value={item?.sessions?.usage?.maskOff}
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
                  value={
                    item?.sessions?.clinical_metrics?.tgtIPAP?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tgtIPAP?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tgtIPAP?.max || 'N/A'
                  }
                />
              </View>
              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                Target exhalation positive airway pressure(in cmH2O)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tgtEPAP?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tgtEPAP?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tgtEPAP?.max || 'N/A'
                  }
                />
              </View>
              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                Leak metrics(in liters per second)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.leak?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.leak?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={item?.sessions?.clinical_metrics?.leak?.max || 'N/A'}
                />
              </View>
              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                Respiratory rate metrics(in cmH2O)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.respRate?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.respRate?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.respRate?.max || 'N/A'
                  }
                />
              </View>

              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                ieRatio metrics (inhalation:exhalation ratio)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.ieRatio?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.ieRatio?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.ieRatio?.max || 'N/A'
                  }
                />
              </View>
              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                Minute ventilation metrics(in liters per minute)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.minuteVent?.['95'] ||
                    'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.minuteVent?.['50'] ||
                    'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.minuteVent?.max || 'N/A'
                  }
                />
              </View>
              <Txt style={[css.fs18, css.semiBold, css.mt2]}>
                Tidal volume metrics(in liters)
              </Txt>
              <View style={[css.row, css.aic, css.fw]}>
                <InternalListBlock
                  title="95% of target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tidalVol?.['95'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Median target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tidalVol?.['50'] || 'N/A'
                  }
                />
                <InternalListBlock
                  title="Maximum target IPAP"
                  value={
                    item?.sessions?.clinical_metrics?.tidalVol?.max || 'N/A'
                  }
                />
              </View>

              <View style={[css.mt5]}>
                <Txt style={[css.fs25, css.semiBold]}>
                  Climate control items
                </Txt>
                <View style={[css.row, css.aic, css.fw]}>
                  <InternalListBlock
                    title="Type of humidifier used"
                    value={
                      item?.sessions?.patientInterface?.humidifier || 'N/A'
                    }
                  />
                  <InternalListBlock
                    title="Type of heated tube used"
                    value={
                      item?.sessions?.patientInterface?.heatedTube || 'N/A'
                    }
                  />
                  <InternalListBlock
                    title="Absolute ambient humidity"
                    value={
                      item?.sessions?.patientInterface?.ambHumidity || 'N/A'
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          {/* <View style={[css.row]}>
            <Button
              title={
                props.route.params?.type === 0
                  ? 'Mark As Complete'
                  : 'View Evaluation Review'
              }
              style={[css.mt3]}
              onPress={() =>
                // props.navigation?.navigate(
                //   props.route.params?.type == 0
                //     ? 'EvaluationForm'
                //     : 'EvaluationResult',
                // )
                props.navigation?.navigate('EvaluationForm')
              }
            />
          </View> */}
        </View>
      </View>
    </SafeView>
  );
};

const InternalListBlock = ({title, value}) => {
  return (
    <View style={[css.w33, css.mb1]}>
      <Txt style={[css.fs16, css.medium]}>{title}</Txt>
      <Txt style={[css.fs15, css.regular, styles.detailsStyle]}>
        {value || 'N/A'}
      </Txt>
    </View>
  );
};

const InternalListBlockDateArr = ({title, value = []}) => {
  return (
    <View style={[css.w33, css.mb1]}>
      <Txt style={[css.fs16, css.medium]}>{title}</Txt>
      {value.map((val, index) => {
        return (
          <Txt style={[css.fs15, css.regular, styles.detailsStyle]} key={index}>
            {moment(val, 'YYYY-MM-DD_HH-mm-ss').format(
              'YYYY-MMM-DD hh:mm:ss A',
            )}
          </Txt>
        );
      })}
    </View>
  );
};

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

export default PatientSessionDetails;

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
