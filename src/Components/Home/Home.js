import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const cards = useSelector(store => store.card.data);

  return (
    <div className="home background-white">
      <div className="container px-2">
        <div className="row">
          {cards.map(card => (
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
