import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FetchSpots } from '../../store/spot';
import { fetchSingleSpot } from "../../store/spot";
import './single.css'
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
import './spot.css'

const superArray = [pic0, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]

function SpotPage() {
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spot);
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(spots)
    const singleSpot = spots[id-1];
    const history = useHistory();

    useEffect(() => {
        dispatch(FetchSpots());
    }, [dispatch]);

    useEffect(()=> {
        dispatch(fetchSingleSpot());
    }, [dispatch])

    const handleClick = () => {
        if(!user) return history.push('/login');
    }
    function handlePics(id) {
        const idx = id%superArray.length
        return superArray[idx]
    }
    function handleReviewClick(e) {
        if (user) {
        history.push(`/reviews/spots/${e.target.id}`);
        } else {
            history.push('/signup')
        }
      }
    return(
        <div className='main-spot-page' id={singleSpot.id} style={{backgroundImage: `url(${handlePics(singleSpot.id)})`}}>
            <div className="inner">
                <div className='main-image'>
                    <h1>{singleSpot.head}</h1>
                    <h3>Price per day: {singleSpot.dailyCost}</h3>
                    <button onClick={handleReviewClick}>Review</button>
                    <button>Book</button>
                </div>
                <div className="box-description">
                    <p>{singleSpot.body}</p>
                </div>
                <div className="box-rating">
                    <p>{singleSpot.threeRating}</p>
                </div>
                <div className="box-review"></div>
                    <p>{singleSpot.review}</p>
            </div>
        </div>
    )
}
export default SpotPage;
