import axios from "axios";

import { CONSTANT } from "@utils";

class OrderService {
  GET_ALL_ORDERS() {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: "/v1/orders",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  GET_ALL_ORDERS_BY_TRANSACTION_ID(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: "/v1/orders",
        params,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  CREATE_ORDER(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "POST",
        url: "/v1/orders",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  DELETE_ORDER(order_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "DELETE",
        url: `/v1/orders/${order_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export default new OrderService();
