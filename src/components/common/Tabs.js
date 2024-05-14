// CustomTabs.js

import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../themes/colors';
import Txt from '../micro/Txt';
import {fonts} from '../../themes/fonts';
import css from '../../themes/space';

const Tabs = ({tabs, initialTab, onTabPress}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabPress = index => {
    setActiveTab(index);
    onTabPress(index);
  };

  return (
    <View style={styles.tabsContainer}>
      {tabs?.map((tab, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          style={[styles.tabItem, index === activeTab && styles.activeTab]}
          onPress={() => handleTabPress(index)}>
          <Txt
            style={[
              styles.tabsText,
              {color: index === activeTab ? colors.primary : '#222'},
            ]}>
            {tab}
          </Txt>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabsText: {
    fontFamily: fonts.Bold,
    fontSize: 18,
  },
});

export default Tabs;
