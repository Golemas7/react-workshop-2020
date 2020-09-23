import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRestaurants } from "services/restaurantsService/selectors";
import StarVote from "../../components/StarVote/StarVote";
import { setRestaurantRating } from "services/restaurantsService/slice";

import "./RestaurantList.scss";

// TODO add sorting

function RestaurantList() {
  const restaurants = useSelector(selectRestaurants);
  const dispatch = useDispatch();

  return (
    <div className="restaurant-list">
      <div className="restaurant-list__wrapper">
        <table className="restaurant-list__table">
          <thead>
            <tr>
              <th className="restaurant-list__cell-header">Restaurant name</th>
              <th className="restaurant-list__cell-header restaurant-list__cell-header--centered">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((item) => (
              <tr key={item.id} className="restaurant-list__row">
                <td className="restaurant-list__cell">{item.title}</td>
                <td className="restaurant-list__cell restaurant-list__cell--centered">
                  <StarVote
                    restaurant={item}
                    rating={item.rating}
                    onClick={(payload) =>
                      dispatch(setRestaurantRating(payload))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantList;
