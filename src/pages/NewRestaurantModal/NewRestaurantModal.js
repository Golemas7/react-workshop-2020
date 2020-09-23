import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAddNewRestaurantPending,
  selectAddNewRestaurantError,
  selectAddNewRestaurantSuccess,
} from "./selectors";
import {
  addNewRestaurantLoading,
  resetAddNewRestaurantState,
} from "services/restaurantsService/slice";
import { selectData as selectPinData } from "services/mapService/selectors";
import NewRestaurantForm from "./NewRestaurantForm";

import "./NewRestaurantModal.scss";

function NewRestaurantModal({ isOpen, onClose }) {
  const [locationError, setLocationError] = useState();
  const currentPinData = useSelector(selectPinData);
  const isPending = useSelector(selectAddNewRestaurantPending);
  const isSuccess = useSelector(selectAddNewRestaurantSuccess);
  const error = useSelector(selectAddNewRestaurantError);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    latitude: currentPinData?.latitude || "",
    longitude: currentPinData?.longitude || "",
  });

  useEffect(() => {
    if (isSuccess) {
      onClose();

      return () => {
        setFormValues({
          // TODO refactor to maybe unmount form component so the form state would be always clear?
          title: "",
          description: "",
          latitude: "",
          longitude: "",
        });

        dispatch(resetAddNewRestaurantState());
      };
    }
  }, [isSuccess, onClose, dispatch]);

  useEffect(() => {
    if (currentPinData?.longitude && currentPinData?.latitude) {
      setFormValues({
        title: "",
        description: "",
        latitude: currentPinData.latitude.toString(),
        longitude: currentPinData.longitude.toString(),
      });
    }
  }, [currentPinData]);

  const getCurrentLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setFormValues({
            ...formValues,
            latitude: position.coords.latitude.toFixed(5),
            longitude: position.coords.longitude.toFixed(5),
          });
          setLocationError({
            error: null,
          });
        },
        () => {
          setLocationError({
            error: "Failed to get current location.",
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="modal__overlay"
      isOpen={isOpen}
    >
      {isPending && <p> Loading</p>}
      {!isPending && error && <p> Error</p>}
      <NewRestaurantForm
        handleChange={handleChange}
        getCurrentLocation={getCurrentLocation}
        locationError={locationError}
        formValues={formValues}
        onSubmit={() => dispatch(addNewRestaurantLoading(formValues))}
      />
      <button
        onClick={() => onClose()}
        title="Close modal"
        className="modal__close-btn"
      >
        ✖
      </button>
    </ReactModal>
  );
}

NewRestaurantModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ReactModal.setAppElement("#root");

export default NewRestaurantModal;
