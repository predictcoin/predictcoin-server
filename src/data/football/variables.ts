export const playPeriod = 300; //used for testing and expressed in seconds
export const dailyMatches = process.env.NODE_ENV === "development" ? 3 : 10;
export const matchTime = process.env.NODE_ENV === "development" ? Math.round(0.5*playPeriod) : 105*60;
