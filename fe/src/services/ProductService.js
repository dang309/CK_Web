import axios from "axios";

import { CONSTANT } from "@utils";

class ProductService {
  GET_ALL_PRODUCTS(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: "/v1/products",
        params,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  CREATE_PRODUCT(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "POST",
        url: "/v1/products",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  UPDATE_PRODUCT(product_id, data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "PUT",
        url: `/v1/products/${product_id}`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  DELETE_PRODUCT(product_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "DELETE",
        url: `/v1/products/${product_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export default new ProductService();
