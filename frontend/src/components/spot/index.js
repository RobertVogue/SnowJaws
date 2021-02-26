import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpots } from '../../store/spot';
// import pic1 from '../../images/pic1.jpg';
// import pic2 from '../../images/pic2.jpg';
// import pic3 from '../../images/pic3.jpg';
// import pic4 from '../../images/pic4.jpg';
// import pic5 from '../../images/pic5.jpg';
// import pic6 from '../../images/pic6.jpg';
// import pic7 from '../../images/pic7.jpg';
// import pic8 from '../../images/pic8.jpg';
// import pic9 from '../../images/pic9.jpg';
// import pic0 from '../../images/pic0.jpg';
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
                            <button to={`/spots/${spot.id}/reviews`} className='button'>Review</button>
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
