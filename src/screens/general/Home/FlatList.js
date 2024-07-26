import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import SafeView from '../../../components/common/SafeView';

const dataItem = [
  {
    id: 1,
    title: 'section List 1',
  },
  {
    id: 2,
    title: 'section List 2',
  },
  {
    id: 3,
    title: 'section List 3',
  },
  {
    id: 4,
    title: 'section List 4',
  },
];

const RenderItem = ({item}) => (
  <View style={styles.card}>
    <View style={styles.sectionList}>
      <Text style={styles.sectionText1}>{item.title} </Text>
    </View>
    <View style={styles.sectionRow}>
      <Text style={styles.sectionText}>{item.title}</Text>
      <Text style={styles.sectionText}>{item.title} </Text>
    </View>
    <View style={styles.sectionRow}>
      <Text style={styles.sectionText1}>{item.title} </Text>
      <Text style={styles.sectionText}>{item.title} </Text>
      <Text style={styles.sectionText}>{item.title} </Text>
    </View>
    <View style={styles.sectionRow}>
      <Text style={styles.sectionText1}>{item.title} </Text>
      <Text style={styles.sectionText}>{item.title}</Text>
      <Text style={styles.sectionText}>{item.title}</Text>
    </View>
  </View>
);

const FlatListView = props => {
  return (
    <SafeView {...props}>
      <View style={styles.container}>
        <View style={styles.container_wrapper}>
          <FlatList
            data={dataItem}
            renderItem={({item}) => <RenderItem item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default FlatListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'white',
  },
  container_wrapper: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
  },
  sectionText1: {
    fontSize: 16,
    color: '#333',
  },
  sectionList: {
    backgroundColor: 'red',
    height: 50,
  },
});
