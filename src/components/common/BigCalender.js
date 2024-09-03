import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BigCalendar from 'react-native-big-calendar';
import moment from 'moment';

const BigCalender = ({ view }) => {
    return (
      <BigCalendar
        events={[]}
        defaultView={view}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        dateAccessor="date"
        onEventPress={(event) => console.log(event)}
        style={styles.calendar}
      />
    );
  };

export default BigCalender

const styles = StyleSheet.create({
    calendar: {
        flex: 1,
      },
})