//react and react-native
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

//component
import Calendar from 'react-native-calendar';
//actions
import { selectDay } from '../reducers/day';
import { connect } from 'react-redux';

class showCalendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let d = new Date();
    let today = d.getFullYear() +"-"+ d.getMonth()+1 +"-"+ d.getDate();

    return (
      <View>
        <Calendar
        currentMonth={today}
        customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
        dayHeadings={['S', 'M', 'T', 'W', 'TH', 'F', 'Sa']}
        eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
        events={[{date:'2015-07-01'}]}// Optional array of event objects with a date property and custom styles for the event indicator
        monthNames={['January','February','March','April','May','June','July','August','September','October','November','December']}                // Defaults to english names of months}
        nextButtonText={'Next'}
        onDateSelect={(date)=>{
          this.props.updateDay(date.slice(0,10));
          Actions.home();
        }} // Callback after date selection
        onDateLongPress={(date) => this.onDateLongPress(date)} // Callback after date is long pressed
        onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
        onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
        onTouchNext={this.onTouchNext}    // Callback for next touch event
        onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
        onTitlePress={this.onTitlePress}  // Callback on title press
        prevButtonText={'Prev'}
        removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
        scrollEnabled={true}              // False disables swiping. Default: False
        selectedDate={'2015-08-15'}       // Day to be selected
        showControls={true}               // False hides prev/next buttons. Default: False
        showEventIndicators={true}        // False hides event indicators. Default:False
        startDate={'2017-11-09'}          // The first month that will display. Default: current month
        titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
        today={today}
        weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
        />
      </View>
    );
  }
}

const mapState = (state) => {
  return {};
}
const mapDispatch = dispatch => {
  return {
    updateDay(day){
      dispatch(selectDay(day));
    }
  }
}

export default connect(mapState, mapDispatch)(showCalendar);