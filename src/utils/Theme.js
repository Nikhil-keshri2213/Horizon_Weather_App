export const getWaveColor = (condition, isNight) => {
  const cond = condition?.toLowerCase() || "";

  let color = isNight ? "#000000" : "#050505";

  if (cond.includes("rain") || cond.includes("drizzle")) {
    color = "#030929"; 
  }
  else if (cond.includes("snow") || cond.includes("blizzard")) {
    color = "#002547"; 
  }
  else if (cond.includes("thunder") || cond.includes("storm")) {
    color = "#1f1210"; 
  }
  else if (cond.includes("fog") || cond.includes("mist") || cond.includes("haze") || cond.includes("freezing fog")) {
    color = "#002420";
  }
  else if (cond.includes("clear") || cond.includes("sunny")) {
    color = isNight ? "#002e30" : "#060d20"; 
  }
  else if (cond.includes("partly cloud") || cond.includes("light cloud")) {
    color = "#101a1d"; 
  }
  else if (cond.includes("overcast") || cond.includes("cloudy")) {
    color = "#5a1a00"; 
  }
  else if (cond.includes("freezing rain") || cond.includes("freezing drizzle")) {
    color = "#000c06"; 
  }
  return color;
};