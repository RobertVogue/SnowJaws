import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpots } from '../../store/spot';
import ReviewForm from '../ReviewForm'
import pic1 from '../../images/pic1.jpg';
import pic2 from '../../images/pic2.jpg';
import pic3 from '../../images/pic3.png';
import pic4 from '../../images/pic4.jpg';
import pic5 from '../../images/pic5.jpg';
import pic6 from '../../images/pic6.jpg';
import pic7 from '../../images/pic7.jpg';
import pic8 from '../../images/pic8.jpg';
import pic9 from '../../images/pic9.jpg';
import pic0 from '../../images/pic0.jpg';
import './spot.css'

const superArray = [pic0, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]



const SpotsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showReviewForm, setShowReviewForm] = useState(false);
    const history = useHistory();
    const rvModalRef = useRef(null);
    const [pic, setPic] = useState(pic1)
    const spots = useSelector((state)=> {
        return state.spot
    })
    function handleReviewClick(e) {
        if (sessionUser) {
        history.push(`/reviews/spots/${e.target.id}`);
        } else {
            history.push('/signup')
        }
      }
    function handlePicClick(e) {
        history.push(`/spot/${e.target.id}`)
    }

    function handlePics(id) {
        const idx = id%superArray.length
        return superArray[idx]
    }

        // setPic(`pic${id.target.id}`)
        // if (pic0 == pic) return pic0
        // else if (pic1 == pic) return pic1
        // else if (pic2 == pic) return pic2
        // else if (pic3 == pic) return pic3
        // else if (pic4 == pic) return pic4
        // else if (pic5 == pic) return pic5
        // else if (pic6 == pic) return pic6
        // else if (pic7 == pic) return pic7
        // else if (pic8 == pic) return pic8
        // else if (pic9 == pic) return pic9
        // else return pic0


useEffect(() => {
    dispatch(FetchSpots());
}, [dispatch]);

if(!sessionUser) return <Redirect to="/signup" />
// const bgStyle = {backgroundImage: `url(${handlePics()})`}
return (
    <div id="spots-page">
       <div className='spotList'>
            {spots.map(spot =>
                <div className="spotBox">
                    <h4 className="w6">{spot.head}</h4>
                    <div className="list" id={spot.id} onClick={handlePicClick} style={{backgroundImage: `url(${handlePics(spot.id)})`}}></div>
                    <div className="row2">
                        <button className='button4'>Book</button>
                        <button onClick={handleReviewClick} id={spot.id} className='button4'>Review</button>
                    </div>
                    <h4 className="w7">{spot.firstAddress} {spot.secondAddress} {spot.city}, {spot.state}, {spot.country} {spot.zip}</h4>
                    <p className='tiny hide-scollbar'>{spot.body}</p>
                </div>
                    )}
       </div>
    </div>
);
        };
export default SpotsPage;
