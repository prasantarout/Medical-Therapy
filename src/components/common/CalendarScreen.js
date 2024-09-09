import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import normalize from '../../utils/normalize';
import {icons} from '../../themes/icons';
import moment from 'moment';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const CustomCalendar = props => {
  // console.log(props, '>>>>>????');

  const [viewMode, setViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    const newDate = moment(currentDate).subtract(1, viewMode).toDate();
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = moment(currentDate).add(1, viewMode).toDate();
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getCurrentDisplay = () => {
    if (viewMode === 'month') {
      return moment(currentDate).format('MMMM YYYY');
    } else if (viewMode === 'week') {
      const startOfWeek = moment(currentDate).startOf('week').format('MMM D');
      const endOfWeek = moment(currentDate).endOf('week').format('MMM D, YYYY');
      return `${startOfWeek} - ${endOfWeek}`;
    } else if (viewMode === 'day') {
      return moment(currentDate).format('MMMM D, YYYY');
    }
  };

  const events = props?.data?.patientData?.visitDue
    ?.map(item => {
      const startDate = new Date(item.start);
      const endDate = item.end
        ? new Date(item.end)
        : new Date(startDate.getTime() + 30 * 60000);
      if (isNaN(startDate.getTime())) {
        console.error(`Invalid start date for item: ${JSON.stringify(item)}`);
        return null;
      }
      return {
        id: item.id,
        title: item.title || 'No Title',
        start: startDate,
        end: isNaN(endDate.getTime())
          ? new Date(startDate.getTime() + 30 * 60000)
          : endDate,
      };
    })
    ?.filter(event => event !== null);


    // console.log(events,">>>>>>>>events")

    const handleEventPress = (event) => {
      const eventId = event.id; 
      props?.onPress(eventId); 
      // ModalOpen(eventId);
    };


  const renderEvent = (event, touchableOpacityProps) => (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text style={styles.eventText}>{event.title}</Text>
    </TouchableOpacity>
  );

  const darkTheme = {
    palette: {
      primary: {
        main: '#6185d0',
        contrastText: '#fff',
      },
      gray: {
        100: '#333',
        200: '#666',
        300: '#888',
        500: '#333',
        800: '#333',
      },
    },
    // Custom styles for the calendar
    stylesheet: {
      calendar: {
        header: {
          dayHeader: {
            color: '#fff',
            backgroundColor: '#6185d0',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
            padding: 5,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
      },
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navButtonsContainer}>
          <View style={styles.buttonGreater}>
            <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
              <Image source={icons.backArrow} style={styles.navIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              <Image source={icons.leftArrow} style={styles.navIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleToday} style={styles.todayButton}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.monthCenter}>
          <Text style={styles.monthText}>{getCurrentDisplay()}</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, viewMode === 'month' && styles.activeTab]}
            onPress={() => setViewMode('month')}>
            <Text
              style={[
                styles.tabText,
                viewMode === 'month' && styles.activeTabText,
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, viewMode === 'week' && styles.activeTab]}
            onPress={() => setViewMode('week')}>
            <Text
              style={[
                styles.tabText,
                viewMode === 'week' && styles.activeTabText,
              ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, viewMode === 'day' && styles.activeTab]}
            onPress={() => setViewMode('day')}>
            <Text
              style={[
                styles.tabText,
                viewMode === 'day' && styles.activeTabText,
              ]}>
              Day
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: normalize(10)}}>
        <Calendar
          renderEvent={renderEvent}
          events={events ? events : []}
          height={600}
          mode={viewMode}
          date={currentDate}
          theme={darkTheme}
          showTime={true}
          weekStartsOn={0}
          minHour={0} // Start at 12 AM
          maxHour={23}
          ampm
          hourStyle={{
            backgroundColor: '#fff',
            color: '#000',
          }}
          onPressEvent={handleEventPress}
          // renderCustomDateForMonth={true}
          showAdjacentMonths={true}
        
    
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
  },
  buttonGreater: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    gap: normalize(5),
    borderRadius: 5,
  },
  navIcon: {
    height: normalize(10),
    width: normalize(10),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  todayButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: normalize(3),
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: normalize(8),
  },
  monthCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 25,
    fontFamily: fonts.SemiBold,
    color: '#144067',
    textTransform: 'uppercase',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: normalize(4),
    borderWidth: 1,
    borderColor: '#2C3E50',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#2C3E50',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: normalize(8),
  },
  activeTabText: {
    color: '#fff',
  },
  eventText: {
    color: 'white',
    fontSize: normalize(6),
    fontWeight: 'bold',
  },
});

export default CustomCalendar;
