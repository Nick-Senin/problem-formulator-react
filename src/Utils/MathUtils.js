export function truncVector(startPoint, endPoint, truncValue) {
  let delta = {x:(endPoint.x - startPoint.x), y:(endPoint.y - startPoint.y)};
  const len = Math.sqrt(delta.x ** 2 + delta.y ** 2);

  delta.x = (delta.x * (len - truncValue)) / len;
  delta.y = (delta.y * (len - truncValue)) / len;

  return {x:(startPoint.x + delta.x), y:(startPoint.y + delta.y)};
}
