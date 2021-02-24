import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
// import Booking from "./components/MVP/Booking";
// import Map from "./components/MVP/Map";
// import Review from './components/MVP/Review';
// import Spot from './components/MVP/Spot'



import * as sessionActions from "./store/session";
import * as spotStuff from './store/spot'
import Navigation from "./components/Navigation";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const withReviews = false;
    dispatch(spotStuff.getAllS(withReviews));
  }, [dispatch]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='page'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route >
          <div>
            <h4>Page Hiding</h4>
          </div>
        </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
