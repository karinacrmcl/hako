export function getRandomId() {
  return new Date().getTime().toString() + Math.round(Math.random() * 100);
}
