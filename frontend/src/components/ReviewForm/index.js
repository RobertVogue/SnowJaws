import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchSpots, addReview } from "../../store/spot";


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
    const spotName = spot.filter(
    (sp) => sp.id.toString() === spotId.toString());

    const updateReview = (e) => setReview(e.target.value);
    useEffect(() => {
      dispatch(fetchSpots());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startReview = {
            head,
            body,
            threeRating,
            publicVote
        };
        if (newReview) {
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
            <p>How was your trip at {spotName[0].head}</p>
            </h1>
        </div>
        )
    );

};

export default ReviewForm
