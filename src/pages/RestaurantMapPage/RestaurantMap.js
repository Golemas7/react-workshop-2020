import React, { createRef, useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import Locate from "leaflet.locatecontrol";

import { selectData as selectPinData } from "services/mapService/selectors";
import {
  selectAreRestaurantsLoaded,
  selectRestaurants,
  selectAreRestaurantsLoading,
} from "services/restaurantsService/selectors";
import { loadRestaurantData } from "services/restaurantsService/slice";
import { addPinData } from "services/mapService/slice";
import Search from "./Search";
import MapMarker from "./MapMarker";

import { customIcon, currentPinIcon } from "./icons";

import "./RestaurantMap.scss";

const TILE_LAYER_ATTRIBUTION =
  "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL";
const TILE_LAYER_URL =
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

const selectedCity = "Kaunas";

const initialZoom = 3;
const minZoom = 7;
const position = {
  lat: 54.8642866,
  lng: 23.9430665,
};

const locateOptions = {
  position: "topright",
  strings: {
    title: "Get my location!",
  },
};

function RestaurantMap() {
  const isLoaded = useSelector(selectAreRestaurantsLoaded);
  const isLoading = useSelector(selectAreRestaurantsLoading);
  const restaurantData = useSelector(selectRestaurants);

  const currentPinData = useSelector(selectPinData);
  const dispatch = useDispatch();
  const mapRef = createRef();

  const [userLocation, setUserLocation] = useState(undefined);

  const [addedToMap, setAddedToMap] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadRestaurantData({ payload: selectedCity }));
    }
  }, [dispatch, isLoaded]);

  useEffect(() => {
    const map = mapRef?.current.leafletElement;
    const lc = new Locate(locateOptions);

    if (map && lc && !addedToMap) {
      setAddedToMap(true);
      lc.addTo(map);
      lc.start();

      const findUserLocation = setInterval(() => {
        if (lc._event) {
          setUserLocation({
            latitude: lc._event.latlng.lat,
            longitude: lc._event.latlng.lng,
          });

          clearInterval(findUserLocation);
        }
      }, 1000);
    }
  }, [addedToMap, mapRef]);

  const addMarker = (position) => {
    dispatch(
      addPinData({
        latitude: position.latlng.lat,
        longitude: position.latlng.lng,
      })
    );
  };

  return (
    <>
      <Map
        id="myMap"
        className="Map"
        center={position}
        ref={mapRef}
        zoom={initialZoom}
        minZoom={minZoom}
        onClick={addMarker}
      >
        <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
        {currentPinData && (
          <Marker
            position={{
              lat: currentPinData.latitude,
              lng: currentPinData.longitude,
            }}
            icon={currentPinIcon}
          >
            <Popup>{`@${currentPinData.latitude},${currentPinData.longitude}`}</Popup>
          </Marker>
        )}
        {restaurantData?.map((marker) => {
          return (
            marker.title &&
            marker.latitude &&
            marker.longitude && (
              <MapMarker
                key={marker.id}
                marker={{
                  ...marker,
                  latitude: parseFloat(marker.latitude),
                  longitude: parseFloat(marker.longitude),
                }}
                customIcon={customIcon}
                userLocation={userLocation}
              />
            )
          );
        })}
        <Search />
      </Map>
      {isLoading && <div className="Map__loading">Loading...</div>}
    </>
  );
}

export default RestaurantMap;
