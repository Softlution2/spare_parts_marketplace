export const numberWithCommas = (x) => {
  if (x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return 0;
}

export const stringToUrl = (str) => {
  if (str)
    return str.toString().toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
  else
    return null;
};


export const getCartLength = (items, value) => {
  let count = 0;
  for(let i = 0; i < items.length; ++i){
    if(items[i] == value)
      count++;
  }
  return count;
}

export const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + " weeks";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1)
      return Math.floor(interval) + " day";
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}