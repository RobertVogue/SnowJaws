import {Switch, Route} from 'react-router-dom';
import ReviewForm from "../ReviewForm";


function Home() {

    return (
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route  path='/spots/:spotId/review' >
          <ReviewForm />
        </Route>
      </Switch>
    );
  }

  export default Home;
