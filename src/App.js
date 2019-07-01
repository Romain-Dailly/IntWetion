import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardData } from "./actions";
import Modal from "./Components/Modal/Modal";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import Home from "./Components/Home/Home";

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
  const { isStarted } = useSelector(store => store.card.quiz);

  useEffect(() => {
    // on componentDidMount, dispatch an action to
    // fetch data from a remote source.
    dispatch(getCardData);
  }, []);

  return (
    <Fragment>
      <NavBar title="Forces" />
      <Home />
      {isStarted && <Modal />}
    </Fragment>
  );
};

export default App;
