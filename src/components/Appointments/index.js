import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointments: [],
    searchTitle: '',
    dateInput: '',
    errorMsg: '',
    searchErrorMsg: '',
    dateErrorMsg: '',
  }

  OnAddAppointment = () => {
    const {searchTitle, dateInput} = this.state
    if (searchTitle === '' && dateInput === '') {
      this.setState({errorMsg: 'Both title and date are required'})
      this.setState({searchErrorMsg: ''})
      this.setState({dateErrorMsg: ''})
    } else if (searchTitle === '' && dateInput !== '') {
      const msg = 'Title is Required*'
      this.setState({dateErrorMsg: ''})
      this.setState({errorMsg: ''})
      this.setState({searchErrorMsg: msg})
    } else if (searchTitle !== '' && dateInput === '') {
      const msg = 'Date is Required*'
      this.setState({searchErrorMsg: ''})
      this.setState({errorMsg: ''})
      this.setState({dateInput: msg})
    } else {
      this.setState({errorMsg: ''})
      this.setState({dateErrorMsg: ''})
      this.setState({searchErrorMsg: ''})
      const newAppointment = {
        id: uuidv4(),
        title: searchTitle,
        date: dateInput,
        isFavourite: false,
      }
      this.setState(prevState => ({
        appointments: [...prevState.appointments, newAppointment],
        searchTitle: '',
        dateInput: '',
      }))
    }
  }

  OnAddTitle = event => {
    this.setState({searchTitle: event.target.value})
  }

  onAddDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeStarStatus = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachObj => {
        if (id === eachObj.id) {
          return {...eachObj, isFavourite: !eachObj.isFavourite}
        }
        return eachObj
      }),
    }))
  }

  onSelectStarredAppointments = () => {
    const {appointments} = this.state
    const filteredStarredAppoinments = appointments.filter(
      eachObj => eachObj.isFavourite === true,
    )
    this.setState({appointments: filteredStarredAppoinments})
  }

  render() {
    const {
      appointments,
      searchTitle,
      dateInput,
      errorMsg,
      searchErrorMsg,
      dateErrorMsg,
    } = this.state
    return (
      <div className="main-container">
        <div className="content-container">
          <h1>Add Appointment</h1>
          <div className="add-appointments-block">
            <div className="input-container">
              <div className="input">
                <p className="label-para">
                  <label htmlFor="title">TITLE</label>
                </p>
                {searchErrorMsg && <p className="error">{searchErrorMsg}</p>}
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={searchTitle}
                  onChange={this.OnAddTitle}
                />
              </div>
              <div className="input">
                <p className="label-para">
                  <label htmlFor="date">DATE</label>
                </p>
                {dateErrorMsg && <p className="error">{dateErrorMsg}</p>}
                <input
                  id="date"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  value={dateInput}
                  onChange={this.onAddDate}
                />
              </div>
              <div>
                <button type="button" onClick={this.OnAddAppointment}>
                  Add
                </button>
              </div>
              <div>{errorMsg && <p className="error">{errorMsg}</p>}</div>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="starred">
            <h2>Appointments</h2>
            <button
              type="button"
              className="starred-button"
              onClick={this.onSelectStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul>
            {appointments.map(eachObj => (
              <AppointmentItem
                appointment={eachObj}
                key={eachObj.id}
                onChangeStarStatus={this.onChangeStarStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
