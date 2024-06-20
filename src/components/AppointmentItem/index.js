import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointment, onChangeStarStatus} = props
  const {title, date, id, isFavourite} = appointment
  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStar = () => {
    onChangeStarStatus(id)
  }
  console.log(isFavourite)
  const srcLink = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div>
        <p>{title}</p>
        <button
          type="button"
          className="img-button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={srcLink} alt="star" className="img" />
        </button>
      </div>
      <p>Date: {newDate}</p>
    </li>
  )
}
export default AppointmentItem
