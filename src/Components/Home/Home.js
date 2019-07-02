import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import "./Home.css";
import LoadingState from "../ViewStates/LoadingState";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(store => store.card);

  // Indicate loading process.
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="home background-white">
      <div className="container px-2">
        <div className="row">
          {data.map(card => (
            <Card key={card.id} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
// Add more fields.
Home.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      descriptions: PropTypes.string,
      imageUrl: PropTypes.string
    })
  )
};

export default Home;
