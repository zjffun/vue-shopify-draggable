export function withElementFromPoint(elementFromPoint, callback) {
  const originalElementFromPoint = document.elementFromPoint;
  document.elementFromPoint = () => elementFromPoint;
  callback();
  document.elementFromPoint = originalElementFromPoint;
}
