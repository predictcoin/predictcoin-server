const destructureDate = (date: Date): {[key: string]: number} => {
  const seconds = date.getUTCSeconds();
  const minutes = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const weekDay = date.getUTCDay();
  const monthDay = date.getUTCDate();
  const month = date.getUTCMonth();

  return { seconds, minutes, hour, weekDay, monthDay, month };
};

const currentTimestamp = () => {
  return Math.trunc(new Date().getTime()/1000);
}

export { destructureDate, currentTimestamp };