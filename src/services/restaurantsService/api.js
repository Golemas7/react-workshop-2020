import query_overpass from "query-overpass";

export function getData(payload) {
  return new Promise((resolve, reject) => {
    query_overpass(
      `
        [out:json];
        area[name = "${payload}"]->.a;
        (
           node(area.a)[amenity=restaurant];
           node(area.a)[amenity=cafe];
           node(area.a)[amenity=fast_food];
           node(area.a)[amenity=food_court];
         );
         out body;
         `,
      (error, data) => {
        if (error) {
          reject(error);
        }

        if (data) {
          const array = data.features;
          const extractedData = array.map((item) => {
            return {
              id: item.id,
              longitude: item.geometry.coordinates[0],
              latitude: item.geometry.coordinates[1],
              title: item.properties.name,
              description: `${
                item.properties["addr:street"]
                  ? item.properties["addr:street"]
                  : ""
              } ${
                item.properties["addr:housenumber"]
                  ? item.properties["addr:housenumber"]
                  : ""
              }${
                item.properties["addr:city"]
                  ? ", " + item.properties["addr:city"]
                  : ""
              }`,
            };
          });
          resolve(extractedData);
        }
      },
      { flatProperties: true }
    );
  });
}
