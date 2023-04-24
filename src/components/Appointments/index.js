import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

const initappointmentsList = [
  {
    id: v4(),
    title: 'Dentist',
    date: new Date('20-July-2021'),
    isStarred: false,
  },
  {
    id: v4(),
    title: 'AI-ML Session',
    date: new Date('21-July-2021'),
    isStarred: true,
  },
  {
    id: v4(),
    title: 'CoviShield Dose 1',
    date: new Date('22-July-2021'),
    isStarred: true,
  },
]

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    onlyStarred: false,
  }

  starAppointment = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApmt => {
        if (id === eachApmt.id) {
          return {...eachApmt, isStarred: !eachApmt.isStarred}
        }
        return eachApmt
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  filterStarredAppointments = () => {
    const {appointmentsList} = this.state
    return appointmentsList.filter(eachApmt => eachApmt.isStarred)
  }

  updateTitleInput = event => this.setState({titleInput: event.target.value})

  updateDateInput = event => this.setState({dateInput: event.target.value})

  updateStarred = () => {
    this.setState(prevState => ({onlyStarred: !prevState.onlyStarred}))
  }

  render() {
    const {titleInput, onlyStarred, dateInput} = this.state
    let {appointmentsList} = this.state
    if (onlyStarred) {
      appointmentsList = this.filterStarredAppointments()
    }
    const starredBtnClass = onlyStarred
      ? 'starred-button clicked-starred-button'
      : 'starred-button'
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="input-and-banner-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <h1 className="app-heading">Add Appointment</h1>
              <label className="input-label" htmlFor="titleInput">
                TITLE
              </label>
              <br />
              <input
                id="titleInput"
                type="text"
                placeholder="Title"
                className="input-element"
                onChange={this.updateTitleInput}
                value={titleInput}
              />
              <br />
              <label className="input-label" htmlFor="dateInput">
                DATE
              </label>
              <br />
              <input
                id="dateInput"
                type="date"
                className="input-element"
                onChange={this.updateDateInput}
                value={dateInput}
              />
              <br />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="banner-image"
            />
          </div>
          <hr className="separator" />
          <div className="appointments-heading-container">
            <h1 className="appointment-section-heading">Appointments</h1>
            <button
              type="button"
              className={starredBtnClass}
              onClick={this.updateStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {appointmentsList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                starAppointment={this.starAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
