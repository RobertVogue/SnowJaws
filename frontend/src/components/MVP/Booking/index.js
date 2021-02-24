import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as bookingStuff from '../../../store/booking';



export default function Booking({ alpha = undefined, beta = undefined }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots.allSpots);
  const date = new Date();
  const today = new Date(date.toLocaleDateString()).toISOString().slice(0, 10);
  date.setDate(date.getDate() + 1);
  const tomorrow = new Date(date.toLocaleDateString()).toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [capacity, setCapacity] = useState(1);
  const [errors, setErrors] = useState([]);
  const bookingModalRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    if (alpha) {
      return setSpot(alpha);
    }
    if (location.pathname && spots) {
      const path = location.pathname;
      setSpot(spots.find(spot => spot.id === Number(path.slice(path.lastIndexOf('/') + 1))));
    }
  }, [location.pathname, alpha]);

  if (!sessionUser) {
    if (bookingModalRef.current)
      bookingModalRef.current.style.display = "none";
    return <Redirect to='/login' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(bookingStuff.createOneB({
      booking: {
        userId: sessionUser.id,
        spotId: spot.id,
        startDate,
        endDate,
        capacity: capacity,
      }
    }))
      .then(res => {
        if (beta && beta.current)
          beta.current.style.display = "none";
        if (bookingModalRef.current)
          bookingModalRef.current.style.display = "none";
        if (!alpha)
          history.push('/allspots');
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (bookingModalRef.current)
      bookingModalRef.current.style.display = "none";
    if (beta && beta.current)
      beta.current.style.display = "none";
    if (!alpha)
      history.push('/allspots');
  }

  return (
    <div className="modal" ref={beta ? beta : bookingModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Booking Form</h3>
        <div>
          {
            spot && <>
              <p>Spot:</p>
              <p>{spot.head}</p>
              <p>{spot.firstAddress}</p>
            </>
          }
        </div>
        <ul className='error-messages'>
          {errors.map((error) => <li key={nanoid()}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Start Date</label>
            <input
              className='input-date'
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>End Date</label>
            <input
              className='input-date'
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Capacity</label>
            <input
              className='input-number'
              type='number'
              value={capacity}
              min={1}
              onChange={e => setCapacity(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="buttons-div">
          <button
            className='button'
            type='submit'
          >Submit</button>
          <button
            className='button button-Reset'
            onClick={handleCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}
