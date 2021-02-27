import {Switch, Route} from 'react-router-dom';
import SplashPage from './Splash'

function Home() {

    return (
      <Switch>
        <Route exact path='/'>
          <SplashPage />
        </Route>
      </Switch>
    );
  }

  export default Home;
