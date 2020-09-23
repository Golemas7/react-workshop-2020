import { Marker, Popup } from "react-leaflet";
import React from "react";
import PropTypes, { array, number, string } from "prop-types";
import { useDispatch } from "react-redux";
import distanceBetweenTwoPoints from "utils/functions/distance-between-two-points";
import { setRestaurantRating } from "services/restaurantsService/slice";

import StarVote from "../../components/StarVote/StarVote";

function MapMarker({ marker, customIcon, userLocation }) {
  const dispatch = useDispatch();

  if (!marker.latitude || !marker.longitude) {
    return;
  }

  return (
    <Marker
      position={{
        lat: marker.latitude,
        lng: marker.longitude,
      }}
      icon={customIcon}
      alt={"Vietos žymeklis"}
    >
      {marker.title && (
        <Popup>
          <h2>{marker.title}</h2>
          <p>{marker.description}</p>
          <StarVote
            restaurant={marker}
            rating={marker.rating}
            onClick={(payload) => dispatch(setRestaurantRating(payload))}
          />
          {userLocation && marker.latitude && marker.longitude && (
            <div>{`Atstumas: ${distanceBetweenTwoPoints(
              userLocation.latitude,
              userLocation.longitude,
              marker.latitude,
              marker.longitude
            )} m.`}</div>
          )}
        </Popup>
      )}
    </Marker>
  );
}

MapMarker.propTypes = {
  marker: PropTypes.shape({
    id: string,
    latitude: number,
    longitude: number,
    title: string,
    description: string,
    rating: number,
  }),
  userLocation: PropTypes.shape({
    latitude: number,
    longitude: number,
  }),
  customIcon: PropTypes.shape({
    iconUrl: string,
    iconSize: array,
    iconAnchor: array,
    popupAnchor: array,
  }),
};

export default MapMarker;
