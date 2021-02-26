import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FetchSpots, addReview } from "../../store/spot";
import RadioSelector from "./RadioSelector";


const ReviewForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [head, setHead] = useState('');
    const [body, setBody] = useState('');
    const [threeRating, setThreeRating] = useState(3);
    const [publicVote, setPublicVote] = useState(5);
    const {spotId} = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots);


    const updateReview = (e) => setBody(e.target.value);
    useEffect(() => {
    dispatch(FetchSpots());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startReview = {
            head,
            body,
            threeRating,
            publicVote
        };
        if (startReview) {
            let userId = sessionUser.id;
            dispatch(addReview(startReview, spotId, userId));

        }
        history.push(`/spots/${spotId}`);
    };

    return (
        spot && (
        <div className="reviewContainers">
            <h1>
            {sessionUser.username.toUpperCase()},
            <p>How was your trip at </p>
            </h1>
            <div>
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
                    Review
                    </label>
                    <input
                    className="box22"
                    type="textfield"
                    value={body}
                    onChange={updateReview}
                    required
                    />
                </div>
                <div>
                <RadioSelector
                label="Rating"
                count={3}
                checked={threeRating}
                onChange={setThreeRating}
                />
                </div>
                <div>
                <RadioSelector
                label="General Location Rating"
                count={5}
                checked={publicVote}
                onChange={setPublicVote}
                />
                </div>
                <div>
                <button onClick={handleSubmit} className="login_button1" type="submit">Submit Review</button>
                </div>
            </form>
            </div>
        </div>
        )
    );
};
export default ReviewForm
