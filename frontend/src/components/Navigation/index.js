import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [user, setUser] = useState(sessionUser);

  let authLinks;
  if (sessionUser) {
    authLinks = (
      <>
      <NavLink className="link" to="/spots"> Spots</NavLink>
      <NavLink className="link" to="/reviews"> Reviews</NavLink>
      </>
    )
  }
 
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='outer'>
        <div className="pic">

        </div>
            <div className='box'>
                <NavLink className="link" exact to="/">Home</NavLink>
                {authLinks}
                {isLoaded && sessionLinks}
            </div>
    </div>
  );
}

export default Navigation;
