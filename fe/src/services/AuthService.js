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
}

export default new AuthService();
