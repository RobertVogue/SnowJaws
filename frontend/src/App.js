import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SpotsPage from "./components/spot";
import * as sessionActions from "./store/session";
import Home from './components/Home'

import Navigation from "./components/Navigation";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className="back2">
      <Navigation isLoaded={isLoaded} />
      <Home />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/spots">
            <SpotsPage />
          </Route>

        </Switch>
      )}

    </div>
  );
}

export default App;
