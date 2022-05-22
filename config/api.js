export const apiUrl = "https://hidden-journey-04244.herokuapp.com";
// export const apiUrl = "https://1337";
export const fetcher = async (url) => {
  const res = await fetch(url);
  const result = await res.json();
  return result;
};
