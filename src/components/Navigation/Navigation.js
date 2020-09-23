import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";

import NewRestaurantModal from "pages/NewRestaurantModal";
import routes from "app/routes";
import messages from "./messages";
import Button from "../Button";

import "./Navigation.scss";

function Navigation() {
  const intl = useIntl();

  const [isNewRestaurantModalOpen, setIsNewRestaurantModalOpen] = useState(
    false
  );

  const NAV_ITEMS = {
    restaurantMap: {
      link: routes.restaurantMap.path,
      text: intl.formatMessage(messages.linkHome),
    },
    restaurantList: {
      link: routes.restaurantList.path,
      text: intl.formatMessage(messages.linkRestaurantList),
    },
  };

  function handleAddNewRestaurant() {
    setIsNewRestaurantModalOpen(true);
  }

  return (
    <>
      <nav className="navigation">
        <NavLink
          exact
          to={routes.restaurantMap.path}
          className="navigation__logo-link"
          activeClassName="navigation__logo-link--active"
          title={intl.formatMessage(messages.linkHome)}
        >
          <span role="img" aria-label="Find where to eat">
            🍕
          </span>
        </NavLink>

        <ul className="navigation__menu">
          {Object.entries(NAV_ITEMS).map(([key, { link, text }]) => (
            <li key={key} className="navigation__menu-item">
              <NavLink
                exact
                className="navigation__link"
                activeClassName="navigation__link--is-active"
                to={link}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button onClick={handleAddNewRestaurant}>Add New Restaurant</Button>
      </nav>
      <NewRestaurantModal
        isOpen={isNewRestaurantModalOpen}
        onClose={() => setIsNewRestaurantModalOpen(false)}
      />
    </>
  );
}

export default Navigation;
