import {Switch, Route} from 'react-router-dom';
import ReviewForm from "../ReviewForm";
import SpotsPage from '../spot'

function Home() {

    return (
      <Switch>
        <Route exact path='/'>
          <SpotsPage />
        </Route>
        <Route  path='/spots/:spotId/review' >
          <ReviewForm />
        </Route>
      </Switch>
    );
  }

  export default Home;
