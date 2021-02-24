import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { FetchSpots } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import './spot.css'

const SpotsPage = () => {
    const dispatch = useDispatch();
    const currentSpots = useSelector(state => state.spot);
    console.log(currentSpots)
    const sessionUser = useSelector(state => state.session.user)

useEffect(() => {
    dispatch(FetchSpots());
}, [dispatch]);

if(!sessionUser) return <Redirect to="/" />
return (
    <div id="spots-page">
        <div className="spots-page-title">
            <h3>Spots</h3>

        </div>
    </div>
);
        };
export default SpotsPage;
