// Taken from https://www.movable-type.co.uk/scripts/latlong.html
export default function distanceBetweenTwoPoints(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const fi1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const fi2 = (lat2 * Math.PI) / 180;
  const deltaFi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
    Math.cos(fi1) *
      Math.cos(fi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return Math.round(d);
}
