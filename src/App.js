import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getCards } from "./actions";
import Results from './Components/Results/Results';
import Form from './Components/adminpanel/Form/Form'
import Quiz from "./Components/Quiz/Quiz";
import NavBar from "./Components/NavBar/NavBar";

import "./App.css";
import Home from "./Components/Home/Home";
import Video from "./Components/Video/Video";

const App = () => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();

  /**
   * Extract the required data from the redux store's state.
   * It is equivalent to the [mapStateToProps]
   * {@link https://react-redux.js.org/using-react-redux/connect-mapstate}
   * argument passed to redux `connect`.
   *
   * @see [dispatch] {@link https://react-redux.js.org/api/connect}
   */
  const { quizStarted } = useSelector(store => store.card.quiz);

  const ROOT_URL = process.env.PUBLIC_URL;

  useEffect(() => {
    // Dispatch and action to fetch data from a remote source.
    dispatch(getCards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <div>
  <Router>
      <Fragment>
        <NavBar />
        {quizStarted && <Quiz />}
        <Switch>
          <Route path={`${ROOT_URL}/`} exact component={Home} />
          <Route path={`${ROOT_URL}/admin`} component={Form} />
         <Route path={`${ROOT_URL}/results`} component={Results} /> 
        </Switch>
      </Fragment>
    </Router>
  </div>
  );
};

export default App;
