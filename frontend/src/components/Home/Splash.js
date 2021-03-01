import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pic1 from '../../images/pict1.jpg';
import pic2 from '../../images/pictu1.jpg';
import pic3 from '../../images/pictu2.jpg';
import pic4 from '../../images/pictur1.jpg';
import pic5 from '../../images/pictur2.jpg';
import pic6 from '../../images/pictur3.jpg';

const SplashPage = () => {
    const history = useHistory();

    function handlePicClick(e) {
        history.push(`/spots/${e.target.id}`)
    }

return (
    <div id="spots-page">
       <div className="title">
            <h1 className="w2">Find yourself on the slopes.</h1>
            <h2 className="w3">Discover and book ski lodging.</h2>
       </div>
       <div className='SplashList'>
            <div className="top">
                <div className="topPic" style={{backgroundImage: `url(${pic1})`}}></div>
            </div>
            <div className="middle">
                <div className="midPic" id={1} onClick={handlePicClick} style={{backgroundImage: `url(${pic2})`}}>
                    <p className="w10">Ski</p>
                </div>

                <div className="midPic2" id={1} onClick={handlePicClick} style={{backgroundImage: `url(${pic3})`}}>
                    <p className="w10">Snowboard</p>
                </div>

            </div>
            <div className="bottom">
                <div className="botPic" id={1} onClick={handlePicClick} style={{backgroundImage: `url(${pic4})`}}>
                    <p className="w10">Winter</p>
                </div>

                <div className="botPic2" id={1} onClick={handlePicClick} style={{backgroundImage: `url(${pic5})`}}>
                    <p className="w10">Spring</p>
                </div>

                <div className="botPic" id={1} onClick={handlePicClick} style={{backgroundImage: `url(${pic6})`}}>
                    <p className="w10">Fall</p>
                </div>

            </div>
       </div>
    </div>
);
        };
export default SplashPage;
