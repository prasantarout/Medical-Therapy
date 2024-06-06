import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const DashboardCradDetails = ({title}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardCradDetails;
