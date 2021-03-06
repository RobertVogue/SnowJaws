import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
// import ReviewFormModal from '../ReviewForm'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();


  function handlePicClick() {
    history.push(`/`)
}

  let authLinks;
  if (sessionUser) {
    authLinks = (
      <>
      <NavLink className="link" to="/spots"> Spots</NavLink>
      <NavLink className="link" to="/chat"> ChatRoom</NavLink>
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
      <p className='first' onClick={handlePicClick}>SnowJaws</p>
      <NavLink className="link" exact to="/">Home</NavLink>
      {authLinks}
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
