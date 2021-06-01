import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getBabyActivities } from '../helpers/data/activitydata';

const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {
  const [activities, setActivities] = useState([]);

  const getActivities = (babyId) => {
    getBabyActivities(babyId).then((response) => {
      setActivities(response);
    });
  };

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getActivities(babyId);
    }
  }, [activities]);

  const newActivity = () => {
    const array = [];
    activities.map((activity) => {
      if (activity.activityType === 0) {
        array.push({
          id: activity.id,
          title: 'Poop',
          start: new Date(activity.date),
          end: new Date(activity.date),
        });
      } else if (activity.activityType === 1) {
        array.push({
          id: activity.id,
          title: 'Breakfast',
          start: new Date(activity.date),
          end: new Date(activity.date),
        });
      } else if (activity.activityType === 2) {
        array.push({
          id: activity.id,
          title: 'Lunch',
          start: new Date(activity.date),
          end: new Date(activity.date),
        });
      } else if (activity.activityType === 3) {
        array.push({
          id: activity.id,
          title: 'Dinner',
          start: new Date(activity.date),
          end: new Date(activity.date),
        });
      }
      return null;
    });
    return array;
  };

  return (
  <div style={{ height: 700 }}>
    <Calendar
      localizer={localizer}
      events={newActivity()}
      step={60}
      startAccessor="start"
      views={['month', 'week']}
      onSelectEvent={(event) => (console.log('event', event))}
      endAccessor="end"
    />
  </div>
  );
}

MyCalendar.propTypes = {
  user: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
    })
  }),
};
