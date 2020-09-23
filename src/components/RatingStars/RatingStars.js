import React from "react";
import { func, number } from "prop-types";

import "./RatingStars.scss";

RatingStars.propTypes = {
  rating: number,
  onClick: func,
};

function RatingStars({ rating }) {
  // Only votes within the range are valid
  if (rating < 0 || rating > 5) {
    return;
  }

  return (
    <div
      className="ratingStars"
      style={{ "--rating": rating }}
      aria-label={`Rating of this restaurant is ${rating} out of 5.`}
      title={`Rating of this restaurant is ${rating} out of 5.`}
    />
  );
}

export default RatingStars;
