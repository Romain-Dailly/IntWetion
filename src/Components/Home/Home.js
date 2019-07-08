import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Quiz from "../Quiz/Quiz";
import Video from "../Video/Video";
import Card from "../Card/Card";
import "./Home.css";
import { Row, Col } from "react-flexbox-grid";
import LoadingState from "../ViewStates/LoadingState";

const Home = () => {
  const { data, isLoading } = useSelector(store => store.card);
  const { cardId, setCardId } = useState(undefined);

  // Indicate loading process.
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="home background-white">
      <Video videoKey="gN7U0ycbWCM" />
      <div className="container px-2">
        <Row gutter={16}>
          {data.map((card, index) => (
            <Card key={card.id} data={card} index={index} />
          ))}
        </Row>
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
