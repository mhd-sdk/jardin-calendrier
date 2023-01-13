import axios from "axios";
import jwt_decode from "jwt-decode";

export const API_BASE = {
  BASE: "http://127.0.0.1:8000/api/",
};
export const API_URLS = {
  API_AUTH: {
    API_LOGIN: {
      ROUTE: API_BASE.BASE + "login",
      METHOD: "POST",
    },
    API_REGISTER: {
      ROUTE: API_BASE.BASE + "register",
      METHOD: "POST",
    },
    API_REFRESH: {
      ROUTE: API_BASE.BASE + "auth/refresh",
      METHOD: "POST",
    },
  },
  API_USER: {
    API_GRANT_ADMIN: {
      ROUTE: API_BASE.BASE + "user/grant/",
    },
    API_DELETE_USER: {
      ROUTE: API_BASE.BASE + "user/delete/",
    },
  },
  API_EVENTS: {
    API_GET_EVENTS: {
      ROUTE: API_BASE.BASE + "event/all",
      METHOD: "GET",
    },
    API_CREATE_EVENT: {
      ROUTE: API_BASE.BASE + "event/new",
      METHOD: "POST",
    },
    API_EDIT_EVENT: {
      ROUTE: API_BASE.BASE + "event/edit",
      METHOD: "PUT",
    },
    API_ADD_PARTICIPANT: {
      ROUTE: API_BASE.BASE + "event/add-participant",
      METHOD: "POST",
    },
  },
};

export const loginRequest = (username: string, password: string) => {
  const config = {
    method: API_URLS.API_AUTH.API_LOGIN.METHOD,
    url: API_URLS.API_AUTH.API_LOGIN.ROUTE,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
    data: {
      username: username,
      password: password,
    },
  };
  return axios(config)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      return response.status;
    })
    .catch((error) => {
      return error.response.status;
    });
};
export type Event = {
  title: string;
  images: string[];
  start: string;
  end: string;
};

export const createEvent = async (eventBody: any) => {
  // get token from local storage
  const token = localStorage.getItem("token");
  const config = {
    method: API_URLS.API_EVENTS.API_CREATE_EVENT.METHOD,
    url: API_URLS.API_EVENTS.API_CREATE_EVENT.ROUTE,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: eventBody,
  };
  return axios(config)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.response.status;
    });
};
export const editEvent = async (eventBody: any) => {
  // get token from local storage
  const token = localStorage.getItem("token");
  const config = {
    method: API_URLS.API_EVENTS.API_EDIT_EVENT.METHOD,
    url: API_URLS.API_EVENTS.API_EDIT_EVENT.ROUTE,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: eventBody,
  };
  return axios(config)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.response.status;
    });
};

export const addParticipant = async (
  eventId: number,
  email: string,
  fullname: string,
  year: string
) => {
  // get token from local storage
  const config = {
    method: API_URLS.API_EVENTS.API_ADD_PARTICIPANT.METHOD,
    url: API_URLS.API_EVENTS.API_ADD_PARTICIPANT.ROUTE,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      eventId: eventId,
      email: email,
      fullname: fullname,
      year: year,
    },
  };
  return axios(config)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.response.status;
    });
};

export const getEvents = async () => {
  const config = {
    method: API_URLS.API_EVENTS.API_GET_EVENTS.METHOD,
    url: API_URLS.API_EVENTS.API_GET_EVENTS.ROUTE,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  };
  return axios(config);
};

export const getImage = async (imageId: number) => {
  const config = {
    method: "GET",
    url: API_BASE.BASE + "image/" + imageId,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  };
  return axios(config);
};
