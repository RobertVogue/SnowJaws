import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FetchSpots, addReview } from "../../store/spot";
import './review.css'


const ReviewForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [head, setHead] = useState('');
    const [body, setBody] = useState('');
    const [threeRating, setThreeRating] = useState(1);
    const [publicVote, setPublicVote] = useState(1);
    const {spotId} = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots);


    const updateReview = (e) => setBody(e.target.value);
    useEffect(() => {
    dispatch(FetchSpots());
    }, [dispatch]);

    const handleSubmit = async () => {
        history.push(`/spots/`);
    };

    return (
        <div className="back3">
            <div className ='front'>
            <form>
                <div>
                <label className="box22">
                    Title:
                    </label>
                    <input
                    className="box22"
                    type="text"
                    value={head}
                    onChange={(e) => setHead(e.target.value)}
                    required
                    />
                </div>
                <div>
                <label className="box22">
                    Review:
                    </label>
                    <textarea
                    className="box23"
                    type="text"
                    value={body}
                    onChange={updateReview}
                    required
                    />
                </div>
                <div>
                <label className="box22">
                    Spot Rating:
                    </label>
                    <input
                    className="box22"
                    type='number'
                    value={threeRating}
                    onChange={(e) => setThreeRating(e.target.value)}
                    min="1"
                    max="3"
                    required
                    />
                </div>
                <div>
                <label className="box22">
                    General Area Rating:
                    </label>
                    <input
                    className="box22"
                    type="number"
                    value={publicVote}
                    onChange={(e) => setPublicVote(e.target.value)}
                    min="1"
                    max="10"
                    required
                    />
                </div>
                <div>
                <button onClick={handleSubmit} className="login_button1" type="submit">Submit Review</button>
                </div>
            </form>
            </div>
        </div>

    );
};
export default ReviewForm
