import jwt_decode from "jwt-decode";
import { countryCodes } from "./constants";

export const numberWithCommas = (x) => {
  if (x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return 0;
}

export const stringToUrl = (str) => {
  if (str)
    return str.toString().toLowerCase().replaceAll(" ", "-");
  else
    return null;
};

export const getDomain = () => {
  const url = window.location.href;
  const arr = url.split("/");
  const domain = arr[0] + "//" + arr[2];
  return domain;
}

export const checkAuthenticated = token => {
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = jwt_decode(token);
  return date < data.exp;
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