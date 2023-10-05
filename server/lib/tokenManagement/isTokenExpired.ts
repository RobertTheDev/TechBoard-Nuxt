export default async function isTokenExpired(tokenExpiryTime: number) {
  const currentTime = new Date().getTime();

  return currentTime > tokenExpiryTime;
}
