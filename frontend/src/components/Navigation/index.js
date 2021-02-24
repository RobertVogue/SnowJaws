import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let authLinks;
  if (sessionUser) {
    authLinks = (
      <>
      <NavLink className="link" to="/users"> My Plans</NavLink>
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
