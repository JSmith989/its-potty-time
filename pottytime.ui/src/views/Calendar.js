import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
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
    activities.map((activity) => array.push({
      id: activity.id,
      title: 'Poop',
      start: new Date(activity.date),
      end: new Date(activity.date),
    }));
    return array;
  };

  const allViews = Object.keys(Views).map((k) => Views[k]);

  return (
  <div style={{ height: 700 }}>
    <Calendar
    popup
      localizer={localizer}
      events={newActivity()}
      step={60}
      startAccessor="start"
      views={allViews}
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
