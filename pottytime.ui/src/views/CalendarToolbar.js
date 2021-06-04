import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import Modal from '../components/Modal';
import EditActivityForm from '../components/Forms/AddActivityForm';

export default class CalendarToolbar extends Toolbar {
  render() {
    return (
        <>
      <div className="d-flex justify-content-between">
        <div className='rbc-btn-group'>
          <button type='button' className="cool-button" onClick={() => this.navigate('TODAY')}>
            TODAY
          </button>
          <button type='button' className="cool-button" onClick={() => this.navigate('PREV')}>
            BACK
          </button>
          <button type='button' className="cool-button" onClick={() => this.navigate('NEXT')}>
            NEXT
          </button>
        </div>
        <div className='rbc-toolbar-label month-name'>{this.props.label}</div>
        <div className='rbc-btn-group'>
          <button type='button' className="cool-button" onClick={this.view.bind(null, 'month')}>
            MONTH
          </button>
          <button type='button' className="cool-button" onClick={this.view.bind(null, 'week')}>
            WEEK
          </button>
        </div>
      </div>
      <div>
      <Modal title={'Add Activity'} btnStyle={'cool-button'} plus={<i className="fas fa-plus fa-xs"></i>} buttonLabel={'Add Activity'}>
      <EditActivityForm
      />
    </Modal>
    </div>
      </>
    );
  }
}
