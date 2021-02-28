import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpots } from '../../store/spot';
import pic1 from '../../images/pic1.jpg';
import pic2 from '../../images/pic2.jpg';
import pic3 from '../../images/pic3.jpg';
import pic4 from '../../images/pic4.jpg';
import pic5 from '../../images/pic5.jpg';
import pic6 from '../../images/pic6.jpg';
import pic7 from '../../images/pic7.jpg';
import pic8 from '../../images/pic8.jpg';
import pic9 from '../../images/pic9.jpg';
import pic0 from '../../images/pic0.jpg';


const superArray = [pic0, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]


const SplashPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();
    const spots = useSelector((state)=> {
        return state.spot
    })
    function handlePicClick(e) {
        history.push(`/spot/${e.target.id}`)
    }

      function handlePics(id) {
        const idx = id%superArray.length
        return superArray[idx]
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
                <div className="list2" id={spot.id} onClick={handlePicClick} style={{backgroundImage: `url(${handlePics(spot.id)})`}}>
                    <h4 className='w4'>{spot.head}</h4>
                </div>
                    )}
       </div>
    </div>
);
        };
export default SplashPage;
