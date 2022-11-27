import axios from "axios";

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
};

export const test = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: "mehdi",
    password: "123poi",
  });

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000/api/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
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
