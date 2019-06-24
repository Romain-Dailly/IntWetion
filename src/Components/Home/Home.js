import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './Home.css'

const Home = ({ cards, runQuiz }) => {
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          {cards.map(card => (
            <Card
              key={card.name}
              data={card}
              runQuiz={runQuiz}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
// Add more fields.
Home.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    descriptions: PropTypes.string,
    imageUrl: PropTypes.string,
  })),
};

export default Home;
