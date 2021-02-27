import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect} from 'react';
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





const SplashPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();
    const spots = useSelector((state)=> {
        return state.spot
    })
    function handleReviewClick(e) {
        history.push(`/signup`);
      }

useEffect(() => {
    dispatch(FetchSpots());
}, [dispatch]);

return (
    <div id="spots-page">
       <div className="title">
            <h1 className="w2">Find yourself on the slopes.</h1>
            <h2 className="w3">Discover and book ski lodging.</h2>
       </div>
       <div className='spotList'>
            {spots.map(spot =>
                <div className="list2">
                    <h4 className='w4'>{spot.head}</h4>
                        <div className="row">
                            <p>{spot.firstAddress} {spot.secondAddress} {spot.city}, {spot.state}, {spot.country} {spot.zip}</p>
                        </div>
                </div>
                    )}
       </div>
    </div>
);
        };
export default SplashPage;
