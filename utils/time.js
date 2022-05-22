export function getCurrentDate(separator = "") {
  let newDate = new Date();

  let year = newDate.getFullYear();

  return `${year}`;
}
