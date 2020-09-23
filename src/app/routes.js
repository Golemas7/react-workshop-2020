const routes = {
  restaurantMap: {
    path: "/",
    getComponent: () => import("pages/RestaurantMapPage"),
  },
  restaurantList: {
    path: "/restaurant-list",
    getComponent: () => import("pages/RestaurantListPage"),
  },
};

export default routes;
