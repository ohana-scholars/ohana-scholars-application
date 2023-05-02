import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the Reviews table. */
const Review = ({ review }) => (
  <tr>
    <td>{review.owner}</td>
    <td>{review.rating} / 10</td>
    <td>{review.reason}</td>
  </tr>
);

// Require a document to be passed to this component.
Review.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    reason: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Review;
