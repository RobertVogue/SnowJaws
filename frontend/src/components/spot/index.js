import { Redirect, NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpots } from '../../store/spot';
import './spot.css'

const SpotsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const spots = useSelector((state)=> {
        return state.spot
    })

useEffect(() => {
    dispatch(FetchSpots());
}, [dispatch]);

if(!sessionUser) return <Redirect to="/" />
return (
    <div id="spots-page">
       <div className="title">
            <h1>SnowJaws Spot List</h1>
       </div>
       <div className='spotList'>
            {spots.map(spot =>
                <div className="list">
                    <h4>{spot.head}</h4>
                        <div className="row2">
                            <button className='button'>Book</button>
                            <button className='button'>Review</button>
                        </div>
                        <div className="row">
                            <p>{spot.firstAddress} {spot.secondAddress} {spot.city}, {spot.state}, {spot.country} {spot.zip}</p>
                        </div>
                        <p className='tiny'>{spot.body}</p>
                </div>
                    )}
       </div>
    </div>
);
        };
export default SpotsPage;
