import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className="link" user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="link" to="/signup">Sign Up</NavLink>
        <NavLink className="link" to="/signup">Spots</NavLink>
        <NavLink className="link" to="/signup">About</NavLink>
      </>
    );
  }

  return (
    <div className='outer'>
        <img className="pic" src="https://i.postimg.cc/xC6ND41H/background-nav2.png"/>
            <div className='box'>
                <NavLink className="link" exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
            </div>
    </div>
  );
}

export default Navigation;
