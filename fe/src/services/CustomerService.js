import axios from "axios";

import { CONSTANT } from "@utils";

class CustomerService {
  GET_ALL_CUSTOMERS() {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/customers",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  GET_CUSTOMER_BY_ID(customer_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/${customer_id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  GET_ALL_CUSTOMERS_IN_GROUP(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/groups`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  CREATE_GROUP(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/groups/create`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  JOIN_GROUP(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/groups/join`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  LEAVE_GROUP(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/groups/leave`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  CREATE_CUSTOMER(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: "/v1/customers",
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

  UPDATE_CUSTOMER(customer_id, data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/${customer_id}`,
        method: "PUT",
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

  DELETE_CUSTOMER(customer_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        url: `/v1/customers/${customer_id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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

export default new CustomerService();
