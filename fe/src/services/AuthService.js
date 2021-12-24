import axios from "axios";

import { CONSTANT } from "@utils";

class AuthService {
  LOGIN(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  REGISTER(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  FORGOT_PASSWORD(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/auth/forgot-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  RESET_PASSWORD(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/auth/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new AuthService();
