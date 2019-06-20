import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const Home = ({ cards }) => (
  <div>
    {cards.map(card => (
      <Card key={card.name} data={card} />
    ))}
  </div>
);

// Add more fields.
Home.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    descriptions: PropTypes.string,
    imageUrl: PropTypes.string,
  })),
};

export default Home;
