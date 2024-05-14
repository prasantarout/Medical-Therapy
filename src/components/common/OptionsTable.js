import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../themes/colors';
import Txt from '../micro/Txt';
import {feedBackData} from '../../utils/LocalData';
import css from '../../themes/space';
import Checkbox from '../micro/Checkbox';

const OptionsTable = props => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedArray, setIsCheckedArray] = useState(
    feedBackData.map(() => false),
  );

  const updateData = (data, index, selection) => {
    const newArray = [...isCheckedArray];
    newArray[index] = {};

    if (selection == 'notsatisfied') {
      const new_obj = {...data, notsatisfied: true};
      newArray[index] = {...newArray[index], notsatisfied: true};
    } else if (selection == 'needimprovement') {
      const new_obj = {...data, needimprovement: true};
      newArray[index] = {...newArray[index], notsatisfied: true};
    } else if (selection == 'satisfied') {
      const new_obj = {...data, satisfied: true};
      newArray[index] = {...newArray[index], satisfied: true};
    } else {
      const new_obj = {...data, great: true};
      newArray[index] = {...newArray[index], great: true};
    }
    // Update the state with the new array
    setIsCheckedArray(newArray);
  };

  const renderfeedbackItem = ({item, index}) => {
    const bgRow = index % 2 === 0 ? '#f5f9ff' : 'transparent';

    return (
      <View
        style={[styles.tableRow, css.row, css.w100, {backgroundColor: bgRow}]}>
        <View
          style={[css.f1, css.px3, styles.titleWrap, styles.tableCellInner]}>
          <Txt style={[css.fs18, css.semiBold]}>{item.title}</Txt>
        </View>
        <View
          style={[
            styles.tableCell,
            styles.tableCellInner,
            styles.notSatisfied,
          ]}>
          <Checkbox
            onPress={() => updateData(item, index, 'notsatisfied')}
            isChecked={isCheckedArray[index]?.notsatisfied}
          />
        </View>
        <View
          style={[
            styles.tableCell,
            styles.tableCellInner,
            styles.needImprovement,
          ]}>
          <Checkbox
            onPress={() => updateData(item, index, 'needimprovement')}
            isChecked={isCheckedArray[index]?.needimprovement}
          />
        </View>
        <View
          style={[styles.tableCell, styles.tableCellInner, styles.satisfied]}>
          <Checkbox
            onPress={() => updateData(item, index, 'satisfied')}
            isChecked={isCheckedArray[index]?.satisfied}
          />
        </View>
        <View style={[styles.tableCell, styles.tableCellInner, styles.great]}>
          <Checkbox
            onPress={() => updateData(item, index, 'great')}
            isChecked={isCheckedArray[index]?.great}
          />
        </View>
      </View>
    );
  };

  const renderfeedbackHeader = () => {
    return (
      <View style={[styles.tableRow, css.row, css.mb3, css.w100]}>
        <View style={[css.f1, css.px3, styles.titleWrap]}>
          <Txt style={[css.fs18, css.semiBold]}></Txt>
        </View>
        <View style={[styles.tableCell, css.px3, styles.notSatisfied]}>
          <Txt style={[css.fs14, css.medium]}>Not Satisfied</Txt>
        </View>
        <View style={[styles.tableCell, css.px3, styles.needImprovement]}>
          <Txt style={[css.fs14, css.medium]}>Need Improvement</Txt>
        </View>
        <View style={[styles.tableCell, css.px3, styles.satisfied]}>
          <Txt style={[css.fs14, css.medium]}>Satisfied</Txt>
        </View>
        <View style={[styles.tableCell, css.px3, styles.great]}>
          <Txt style={[css.fs14, css.medium]}>Great</Txt>
        </View>
      </View>
    );
  };

  return (
    <>
      {renderfeedbackHeader()}
      <View style={[styles.tableWrap]}>
        <FlatList
          data={feedBackData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderfeedbackItem}
        />
      </View>
    </>
  );
};

export default OptionsTable;

const styles = StyleSheet.create({
  tableWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
  },
  titleWrap: {
    minWidth: 250,
  },
  tableCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCellInner: {
    paddingVertical: 20,
  },
});
