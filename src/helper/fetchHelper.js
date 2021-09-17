export default async function fetchHelper(url, settings){
  let result = await fetch(url, settings);
  let status = await result.json();

  return status;
}