import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./StarVote.scss";

function StarVote({ restaurant, onClick }) {
  const totalVotes = [5, 4, 3, 2, 1]; //in reverse order because of text direction rtl

  return (
    <div className="star-vote">
      {totalVotes.map((vote) => (
        <label
          key={vote}
          className={classNames("star-vote__star", {
            "star-vote__star--selected": restaurant.rating >= vote,
          })}
          htmlFor={`restaurant-${restaurant.id}-rating-${vote}`}
        >
          <input
            type="radio"
            className="star-vote__input"
            id={`restaurant-${restaurant.id}-rating-${vote}`}
            name={`restaurant-${restaurant.id}`}
            onChange={() => {
              onClick({ restaurantId: restaurant.id, rating: vote });
            }}
          />
        </label>
      ))}
    </div>
  );
}

StarVote.propTypes = {
  restaurant: PropTypes.object.isRequired, // TODO add shared restaurant shape
  onClick: PropTypes.func.isRequired,
};

export default StarVote;
