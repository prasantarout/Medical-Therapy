import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import css from '../../themes/space';
import {icons} from '../../themes/icons';
import Txt from '../micro/Txt';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const {width, height} = Dimensions.get('window');

const CustomTable = ({
  tableHeaderDataArr = [],
  tableBodyDataArr = [],
  noDataText = 'No Data Found',
  actionButtonText = '',
  onPressActionButton = () => {},
  tableHeaderContainerStyle = {},
  tableHeaderTextStyle = {},
  tableBodyContainerStyle = {},
  tableBodyTextStyle = {},
  paddingBottom = 0,
  onBottomReach = () => {},
}) => {
  const styles = customStyles({paddingBottom: paddingBottom});
  const [sortLabel, setSortLabel] = useState(tableHeaderDataArr?.[0]?.label);
  const [sortAssending, setSortAssending] = useState(false);

  const sortDataFunction = () => {
    let oldTableBodyDataArr = [...tableBodyDataArr];
    oldTableBodyDataArr.sort((a, b) => {
      return sortAssending
        ? a?.[sortLabel].toLowerCase() > b?.[sortLabel].toLowerCase()
          ? -1
          : 1
        : a?.[sortLabel].toLowerCase() < b?.[sortLabel].toLowerCase()
        ? -1
        : 1;
    });
    return oldTableBodyDataArr;
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <View style={styles.tableContainer}>
          <View
            style={[styles.tableHeaderContainer, tableHeaderContainerStyle]}>
            {tableHeaderDataArr.map((headerData, headerIndex) => {
              return headerData?.enableSort ? (
                <TouchableOpacity
                  style={[
                    styles.tableHeaderTextContainer,
                    {width: Math.round(width / 12) * headerData.width},
                  ]}
                  onPress={() => {
                    setSortLabel(headerData.label);
                    setSortAssending(
                      sortLabel === headerData?.label ? !sortAssending : true,
                    );
                  }}
                  key={headerIndex}>
                  <Text style={[styles.tableHeaderText, tableHeaderTextStyle]}>
                    {headerData.label}
                  </Text>
                  <Image
                    style={[styles.sortByIconStyle, css.ml2]}
                    source={icons.sortIcon}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.tableHeaderTextContainer,
                    {width: Math.round(width / 12) * headerData.width},
                  ]}
                  key={headerIndex}>
                  <Text style={[styles.tableHeaderText, tableHeaderTextStyle]}>
                    {headerData.label}
                  </Text>
                </View>
              );
            })}
            {actionButtonText && (
              <View
                style={[
                  styles.tableHeaderTextContainer,
                  {width: Math.round(width / 12) * 3},
                ]}>
                <Text style={[styles.tableHeaderText, tableHeaderTextStyle]}>
                  Action
                </Text>
              </View>
            )}
          </View>
          <View style={[styles.tableBodyContainer, tableBodyContainerStyle]}>
            {tableBodyDataArr.length > 0 ? (
              <FlatList
                data={sortDataFunction(tableBodyDataArr)}
                renderItem={({item, index}) =>
                  TableRow(
                    item,
                    index,
                    tableHeaderDataArr,
                    actionButtonText,
                    onPressActionButton,
                    tableBodyTextStyle,
                    paddingBottom,
                  )
                }
                onEndReached={onBottomReach}
              />
            ) : (
              <View style={styles.noDataFoundTextContainer}>
                <Text style={styles.noDataFoundText}>{noDataText}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const TableRow = (
  bodyRowData,
  bodyRowIndex,
  tableHeaderDataArr,
  actionButtonText,
  onPressActionButton,
  tableBodyTextStyle,
  paddingBottom,
) => {
  const styles = customStyles({paddingBottom: paddingBottom});
  return (
    <View style={styles.tableBodyRowContainer}>
      {tableHeaderDataArr.map((_, index) => {
        return (
          <View
            style={[
              styles.tableBodyTextContainer,
              {
                width:
                  Math.round(width / 12) * tableHeaderDataArr[index]?.width,
              },
            ]}
            key={index}>
            {tableHeaderDataArr[index]?.rowLeftIcon && (
              <Image
                style={[styles.sortByIconStyle, css.mr2, css.mt1]}
                source={tableHeaderDataArr[index]?.rowLeftIcon}
              />
            )}
            <Text style={[styles.tableBodyText, tableBodyTextStyle]}>
              {bodyRowData[tableHeaderDataArr[index]?.label]}
            </Text>
          </View>
        );
      })}
      {actionButtonText && (
        <View style={[css.aic, css.jcc]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onPressActionButton(bodyRowData, bodyRowIndex)}>
            <Txt style={styles.btnTxt}>{actionButtonText}</Txt>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomTable;

const customStyles = ({paddingBottom}) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: normalize(4),
      padding: normalize(4),
      marginBottom: 20,
    },
    tableContainer: {
      paddingHorizontal: normalize(2),
      flex: 1,
      minWidth: width - normalize(16),
    },
    tableHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: normalize(4),
      borderBottomWidth: 1,
    },
    tableHeaderTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tableHeaderText: {
      textTransform: 'capitalize',
      color: colors.black,
      fontFamily: fonts.SemiBold,
      fontSize: normalize(8),
    },
    sortByIconStyle: {
      height: normalize(8),
      width: normalize(8),
      resizeMode: 'contain',
      tintColor: colors.primaryTextColor,
    },
    tableBodyContainer: {
      height: height - normalize(155) - paddingBottom,
    },
    tableBodyRowContainer: {
      flexDirection: 'row',
      minHeight: normalize(26),
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingVertical: 20,
    },
    tableBodyTextContainer: {
      flexDirection: 'row',
    },
    tableBodyText: {
      color: colors.primaryTextColor,
      fontSize: normalize(8),
      fontFamily: fonts.Medium,
    },
    noDataFoundTextContainer: {
      height: height - normalize(155) - paddingBottom,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataFoundText: {
      textTransform: 'capitalize',
      color: colors.black,
      fontFamily: fonts.SemiBold,
      fontSize: normalize(8),
    },
    btn: {
      height: normalize(16),
      backgroundColor: colors.primary,
      borderRadius: normalize(4),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: normalize(10),
    },
    btnTxt: {
      color: colors.white,
      fontSize: 22,
      fontWeight: '500',
    },
  });
