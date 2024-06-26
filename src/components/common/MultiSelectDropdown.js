import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Txt from '../micro/Txt';
import css, {height} from '../../themes/space';
import {MultiSelect} from 'react-native-element-dropdown';
import {colors} from '../../themes/colors';
import {Image} from 'react-native-svg';
import {icons} from '../../themes/icons';

const MultiSelectDropdown = props => {
  const [isFocus, setIsFocus] = useState(false);
  const [category, setCategory] = useState([]);

  const {
    style,
    value,
    placeholder,
    title,
    onChange,
    data,
    labelField,
    valueField,
  } = props;

  const renderItem = item => {
    // console.log(item, '??????');
    const isSelected = category?.includes(item?.id);
    // console.log(isSelected, '??>>>>');
    return (
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.selectedTextStyle}>{item?.name}</Text>
          {/* <Text style={{ color: Colors.blue, marginLeft: normalize(10) }}>
            {item?.total_available_tasks}
          </Text> */}
        </View>
        {/* {isSelected && ( */}
        <Image source={icons?.CircleCheck} style={{height: 20, width: 20}} />
        {/* )} */}
        {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };
  //   console.log(category, '?????>>>');
  return (
    <View style={[style, styles.contianerStyle]}>
      <Txt style={[css.fs20]}>{title}</Txt>
      <MultiSelect
        style={[styles.dropdownStyle, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data ? data : []}
        value={value}
        placeholder={placeholder}
        maxHeight={280}
        labelField={labelField ? labelField : 'label'}
        valueField={valueField ? valueField : 'value'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(res) => {
          onChange
          setCategory(res)
          //  console.log(res, '??>>>>>>');
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 18,
    color: colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: colors.primaryTextColor,
  },
  contianerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: 16,
  },
  dropdownStyle: {},
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
