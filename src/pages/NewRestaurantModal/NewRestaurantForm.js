import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import TextInput from "components/TextInput";

import "./NewRestaurantForm.scss";

function NewRestaurantForm({
  handleChange,
  onSubmit,
  formValues,
  getCurrentLocation,
  locationError,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="new-restaurant-form">
      <h3>Add new restaurant</h3>
      <TextInput
        label="Title:"
        onChange={handleChange}
        value={formValues.title}
        name="title"
      />
      <TextInput
        label="Description:"
        onChange={handleChange}
        value={formValues.description}
        name="description"
      />

      <div className="new-restaurant-form__row">
        <div className="new-restaurant-form__column">
          <TextInput
            label="Location(latitude):"
            onChange={handleChange}
            value={formValues.latitude}
            name="latitude"
          />
        </div>
        <div className="new-restaurant-form__column">
          <TextInput
            label="Location(longitude):"
            onChange={handleChange}
            value={formValues.longitude}
            name="longitude"
          />
        </div>
      </div>
      <Button type="button" variant="secondary" onClick={getCurrentLocation}>
        Get Current Location
      </Button>
      {locationError && <span>{locationError.error}</span>}

      <div className="new-restaurant-form__button-row">
        <Button type="submit">Save Restaurant</Button>
      </div>
    </form>
  );
}

NewRestaurantForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }).isRequired,
  locationError: PropTypes.shape({
    error: PropTypes.string.isRequired,
  }),
};

export default NewRestaurantForm;
