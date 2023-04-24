import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starAppointment} = props
  const {title, date, isStarred, id} = appointmentDetails
  const startImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    starAppointment(id)
  }
  return (
    <li className="appointment-item">
      <div>
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">
          Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        type="button"
        className="star-button"
        onClick={onClickStarButton}
        data-testid="star"
      >
        <img src={startImageUrl} alt="star" className="star-image" />
      </button>
    </li>
  )
}

export default AppointmentItem
