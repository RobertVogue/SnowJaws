import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { MapWithMarkerClusterer } from '../Map';
import BookingFormModal from '../Booking';
import ReviewFormModal from '../Review';

import * as spotActions from '../../../store/spot';



export default function Spot() {
    const reduxSpots = useSelector(state => state.spots.allSpots);
    const [spot, setSpot] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [indexToDisplay, setIndexToDisplay] = useState(0);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const bkModalRef = useRef(null);
    const rvModalRef = useRef(null);

    useEffect(() => {
        let id = Number(location.pathname.slice(location.pathname.lastIndexOf("/") + 1));
        if (id && typeof (id) === 'number') {
            let selectedSpot;
            if (reduxSpots) {
                selectedSpot = reduxSpots.find(spot => spot.id === id);
            }
            if (selectedSpot)
                setSpot(selectedSpot);
            else
                dispatch(spotActions.getOneS(id, true))
                    .then(res => {
                        selectedSpot = res.data.spot;
                        setSpot(selectedSpot);
                    })
                    .catch(e => { });
        }
    }, [location]);

    useEffect(() => {
        [...document.querySelectorAll('.spotSlides')].map(el => el.style = "display: none;");
        const image = document.getElementById(`image${indexToDisplay}`);
        if (image) image.style = "display: block;";
    }, [indexToDisplay, imageUrls])

    function handleBookNowClick(e) {
        // history.push(`/bookings/spots/${e.target.id.split('-')[0]}`);
        setShowBookingForm(true);
        if (bkModalRef.current && bkModalRef.current.style.display == 'none')
            bkModalRef.current.style.display = 'block';
    }
    function handleReviewClick(e) {
        // history.push(`/reviews/spots/${e.target.id.split('-')[0]}`);
        setShowReviewForm(true);
        if (rvModalRef.current && rvModalRef.current.style.display == 'none')
            rvModalRef.current.style.display = 'block';
    }

    return (
        <div className='single-spot-and-maps'>
            {spot &&
                <>
                    {showBookingForm && <BookingFormModal thisSpot={spot} dref={bkModalRef} />}
                    {showReviewForm && <ReviewFormModal thisSpot={spot} dref={rvModalRef} />}
                    <div key={spot.name} className="single-spot-main-view">
                        <div className='single-spot-name-div'>
                            <h3>{spot.name}</h3>
                            <button className="button button3"
                                onClick={e => {
                                    e.preventDefault();
                                    dispatch(spotActions.removeSpot());
                                    history.push('/allspots');
                                }}
                            >
                                All Spots
              </button>
                        </div>
                        <div className='single-spot-media-display'>
                            <div className='slide-container'>
                                {imageUrls && imageUrls.map((url, i) =>
                                    <div className="spotSlides" id={"image" + i} key={nanoid()}
                                        style={{ display: i === indexToDisplay ? 'block' : 'none' }}
                                    >
                                        <div className="numbertext">{`${i + 1} / ${imageUrls.length}`}</div>
                                        <img key={nanoid()}
                                            src={url} alt={spot.name}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                )}
                                <a className="prev"
                                    onMouseDown={e => {
                                        e.preventDefault();
                                        let prev = indexToDisplay - 1;
                                        if (prev < 0) prev = imageUrls.length - 1;
                                        setIndexToDisplay(prev);
                                    }}
                                >❮</a>
                                <a className="next"
                                    onMouseDown={e => {
                                        e.preventDefault();
                                        let next = indexToDisplay + 1;
                                        if (next >= imageUrls.length) next = 0;
                                        setIndexToDisplay(next);
                                    }}
                                >❯</a>
                            </div>
                        </div>
                        <div className="buttons-and-address">
                            <div className="book-and-more-div" style={{ flexDirection: 'row' }}>
                                <button onClick={handleBookNowClick} id={spot.id + "-" + nanoid()}>Book Now</button>
                                <button onClick={handleReviewClick} id={spot.id + "-" + nanoid()}>Review</button>
                            </div>
                            <div className='spot-address'>
                                <p style={{ maxWidth: '210px', fontSize: '16px' }}>
                                    {spot.streetAddress}
                                </p>
                                <p >
                                    {spot.city} {spot.stateProvince}, {spot.zipCode} {spot.country}
                                </p>
                            </div>

                        </div>
                        <div className='reviews-and-description-single-page'>
                            <p className='spot-description-single-page hide-scollbar'>
                                {spot.description}
                            </p>
                            {spot.Reviews &&
                                <div className='reviews-single-spot-page'>
                                    {
                                        spot.Reviews.map(review => <div className='individual-review' key={nanoid()}>
                                            <div style={{ padding: '5px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    <div className='username-display' onClick={e => alert('Follow this user?')}>
                                                        {review.User && review.User.username}
                                                    </div>
                                                </div>
                                                <p><b>{review.title}</b></p>
                                                <p>{review.body}</p>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='home-side-map'>
                        {
                            spot && <MapWithMarkerClusterer
                                center={{ lat: spot.gpsLocation[0], lng: spot.gpsLocation[1] }}
                                zoom={5}
                                spots={[spot]} />
                        }
                    </div>
                </>
            }
        </div>
    );
}
export function AllSpots({ onlyMine = false, mainGridClass = 'spots-home-display-grid', spotMapClass = 'spots-and-maps' }) {
    const originalReduxSpots = useSelector(state => state.spots.allSpots);
    const sessionUser = useSelector(state => state.session.user);
    const searchTerms = useSelector(state => state.searchs);
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState(undefined);
    const [highlighting, setHighlighting] = useState(searchText);
    const location = useLocation();
    const [reduxSpots, setReduxSpots] = useState(originalReduxSpots);
    const [spots, setSpots] = useState(reduxSpots);
    const [showMap, setShowMap] = useState(false);
    const [style, setStyle] = useState({});
    const [category, setCategory] = useState("all");

    useEffect(() => {
        if (onlyMine) setReduxSpots(originalReduxSpots.filter(spot =>
            spot.Users && spot.Users[0] && spot.Users[0].id === sessionUser.id
        ));
        else {
            if (category === "all" || category === 'allspots')
                setReduxSpots(originalReduxSpots);
            else setReduxSpots(originalReduxSpots.filter(spot =>
                spot.Categories.find(cat => cat.name === category)
            ));
        }
    }, [onlyMine, originalReduxSpots, category]);

    useEffect(() => {
        if (searchTerms[searchTerms.length - 1]) {
            setSearchText(searchTerms[searchTerms.length - 1].text.toLowerCase());
        } else {
            setSearchText(undefined);
        }
    }, [searchTerms]);

    useEffect(() => {
        setHighlighting(searchText);
        if (!searchText && !onlyMine) {
            if (location.pathname.includes('/search'))
                history.push('/allspots');
        }
    }, [searchText])

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/allspots')) setSearchText(undefined);
        const categoryFromPath = path.slice(path.lastIndexOf('/') + 1);
        //TODO: get these from real database categories
        if (categoryFromPath.includes('/allspots') ||
            path.includes('users') ||
            path.includes('reviews') ||
            path.includes('bookings') ||
            path.includes('/spots')
        ) {
            setCategory("all");
        } else {
            setCategory(categoryFromPath);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (onlyMine) return;
        if (showMap) setStyle({ maxWidth: '90vw', width: '90vw' });
        else setStyle({ maxWidth: '940px', width: '90%' });
    }, [showMap, onlyMine]);

    function handleBookNowClick(e) {
        history.push(`/bookings/spots/${e.target.id.split('-')[0]}`);
    }
    function handleReviewClick(e) {
        history.push(`/reviews/spots/${e.target.id.split('-')[0]}`);
    }

    function highlightSearchText(originalText, search) {
        if (!search || !originalText.toLowerCase().includes(search.toLowerCase())) return originalText;
        const index = originalText.toLowerCase().indexOf(search.toLowerCase());
        const firstPart = originalText.slice(0, index);
        const searchedPart = originalText.slice(index, index + search.length);
        const secondPart = originalText.slice(index + search.length);
        return <>{firstPart}<b style={{ color: "white", backgroundColor: "green" }}>{searchedPart}</b>{secondPart}</>;
    };

    const handleSpotSelection = e => {
        e.preventDefault();
        dispatch(spotActions.spot(reduxSpots.find(spot => spot.id === Number(e.target.id.split("-")[0]))));
        history.push(`/spots/${e.target.id.split("-")[0]}`);
    };

    const ShowMapButton =
        <span className='fa fa-bars showmap-button'
            onClick={e => { e.preventDefault(); setShowMap(!showMap) }}
        />


    return (
        <div className={spotMapClass} style={style}>
            {
                !onlyMine && ShowMapButton
            }
            {spots && <div className={mainGridClass}>
                {
                    spots.map(spot =>
                        <div key={nanoid()} >
                            <h6>{highlightSearchText(spot.name, searchText) || highlighting}</h6>
                            <div className='spot-media-display'>
                                {spot.urls && spot.urls[0] && !spot.urls[0].toLowerCase().includes("youtu") ?
                                    <img
                                        key={spot.urls[0]}
                                        src={spot.urls[0]}
                                        alt={spot.name}
                                        id={spot.id + "-" + nanoid()}
                                        className='spot-default-image'
                                        onClick={handleSpotSelection}
                                    />
                                    :
                                    <></>
                                }
                                {!(spot.urls && spot.urls[0]) &&
                                    <img
                                        key={nanoid()}
                                        src={'https://tripcamp.s3.amazonaws.com/resources/images/official/spots/camp-badges-and-icons-vector.jpg'}
                                        alt={spot.name}
                                        id={spot.id + "-" + nanoid()}
                                        className='spot-default-image'
                                        style={{ opacity: '0.4' }}
                                        onClick={handleSpotSelection}
                                    />
                                }
                            </div>
                            <div className='buttons-address-description'>
                                <div className="buttons-and-address">
                                    {
                                        !onlyMine && <div className="book-and-more-div">
                                            <button onClick={handleBookNowClick} id={spot.id + "-" + nanoid()}>Book Now</button>
                                            <button onClick={handleReviewClick} id={spot.id + "-" + nanoid()}>Review</button>
                                        </div>
                                    }
                                    <div className='spot-address'>
                                        <p style={{ maxWidth: '210px', fontSize: '16px' }}>
                                            {spot.streetAddress}
                                        </p>
                                        <p >
                                            {spot.city} {spot.stateProvince}, {spot.zipCode} {spot.country}
                                        </p>
                                    </div>
                                </div>
                                <p className='spot-description hide-scollbar'>
                                    {highlightSearchText(spot.description, searchText)}
                                </p>
                            </div>
                        </div>
                    )}
            </div>
            }
            {
                !spots.length && searchText &&
                <div className='nothing-found-div'>
                    <img src='https://image.cnbcfm.com/api/v1/image/105737338-1550085597458ap_19043627548529.jpg?v=1550085650&w=678&h=381' alt='mars' />
                    <p>No spot found for search criteria: {searchText}</p>
                </div>
            }
            {
                !onlyMine && showMap && <div className='home-side-map-all-spots'>
                    {
                        spots && spots.length && <MapWithMarkerClusterer
                            center={{ lat: spots[0].gpsLocation[0], lng: spots[0].gpsLocation[1] }}
                            zoom={5}
                            spots={spots} />
                    }
                </div>
            }
        </div>
    );
}

export function SpotFormModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const spots = useSelector(state => state.spots.allSpots);
    const media = useSelector(state => state.media);
    const [head, setHead] = useState("");
    const [body, setBody] = useState("");
    const [units, setUnits] = useState(1);
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const [firstAddress, setFirstAddress] = useState("");
    const [secondAddress, setSecondAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [zipCode, setZipcode] = useState(undefined);
    const [country, setCountry] = useState("USA");
    const [dailyCost, setDailyCost] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [altSite, setAltSite] = useState("");
    const [errors, setErrors] = useState([]);
    const spotModalRef = useRef(undefined);
    const history = useHistory();

    if (!sessionUser) {
        if (spotModalRef.current)
            spotModalRef.current.style.display = "none";
        return <Redirect to='/login' />;
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);

        return dispatch(spotActions.createOneS({
            spot: {
                userId: sessionUser.id,
                head,
                body,
                units,
                tracker: [latitude, longitude],
                firstAddress,
                secondAddress,
                city,
                stateProvince,
                zipCode,
                country,
                dailyCost,
                type,
                altSite
            }
        }))
            .then(res => {
                if (spotModalRef.current)
                    spotModalRef.current.style.display = "none";
                history.push('/allspots');
            })
            .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
    };
    const handleCancelClick = e => {
        e.preventDefault();
        if (spotModalRef.current)
            spotModalRef.current.style.display = "none";
        history.push('/allspots');
    }
    return (
        <div className="modal" ref={spotModalRef}
        // onClick={e => { e.preventDefault(); if (showUploadForm) setShowUploadForm(false) }}
        >
            <form
                className='form-container modal-content-spot-creation'
                onSubmit={handleSubmit}
            >
                <h3>Create Your Spot</h3>

                <ul className='error-messages'>
                    {errors.map((error) => <li key={nanoid()}>{error}</li>)}
                </ul>
                <div className="inputs-div">
                    <div className="input-div">
                        <label>Spot Name</label>
                        <input
                            className='input'
                            type='text'
                            value={head}
                            onChange={e => setHead(e.target.value)}
                            required
                            autoFocus={true}
                        />
                    </div>
                    <div className="input-div">
                        <label>Description</label>
                        <textarea
                            className='input'
                            type='text'
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            rows={10}
                            required
                        />
                    </div>
                    <div className="input-div-number">
                        <label>Number of Units</label>
                        <input
                            className='input-number'
                            type='number'
                            value={units}
                            min={1}
                            onChange={e => setUnits(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-div">
                        <label>GPS Location (Lat, Long)</label>
                        <div className="input-div" style={{ paddingTop: '0px', paddingLeft: '5px' }}>
                            <input
                                className='input-gps'
                                type='number'
                                min={-90}
                                max={90}
                                step={1e-14}
                                value={latitude}
                                onChange={e => {
                                    if (e.target.value < -90) e.target.value = -90;
                                    if (e.target.value > 90) e.target.value = 90;
                                    setLatitude(e.target.value)
                                }}
                                required
                            />
                            <input
                                className='input-gps'
                                type='number'
                                min={-180}
                                max={180}
                                step={1e-14}
                                value={longitude}
                                onChange={e => {
                                    if (e.target.value < -180) e.target.value = -180;
                                    if (e.target.value > 180) e.target.value = 180;
                                    setLongitude(e.target.value)
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-div-number">
                        <label>Cost Per Day</label>
                        <input
                            className='input-number'
                            type='number'
                            value={dailyCost}
                            min={0}
                            onChange={e => setDailyCost(Number(e.target.value))}
                        />
                    </div>
                    <div className="input-div-number">
                        <label>Type</label>
                        <input
                            className='input-number'
                            type='number'
                            value={type}
                            min={0}
                            onChange={e => setType(Number(e.target.value))}
                        />
                    </div>
                    <div className="input-div">
                        <label>External Site</label>
                        <input
                            className='input'
                            type='text'
                            value={altSite}
                            min={0}
                            onChange={e => setAltSite(e.target.value)}
                        />
                    </div>
                </div>
                <div className="buttons-div">
                    <button
                        className='button'
                        type='submit'
                    >Submit</button>
                    <button
                        className='button button-Reset'
                        onClick={handleCancelClick}
                    > Cancel </button>
                </div>
            </form>

        </div>
    );
}
