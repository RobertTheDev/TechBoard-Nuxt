export default async function isTokenUnexpired(tokenExpiryTime: number) {
  const currentTime = new Date().getTime();

  return currentTime <= tokenExpiryTime;
}
