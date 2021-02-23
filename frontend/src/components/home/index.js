import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import './home.css'

export default function Home() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings);
  const spots = useSelector(state => state.spots.allSpots)
  const [customBookings, setCustomBookings] = useState([]);
  const [bookingsAdmin, setBookingsAdmin] = useState([]);

}
