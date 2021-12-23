import axios from "axios";

import { CONSTANT } from "@utils";

class TransactionDetailService {
  GET_ALL_TRANSACTION_DETAIL_BY_CUSTOMER_ID(params) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: `/v1/transaction-details`,
        params,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  GET_TRANSACTION_DETAIL_BY_ID(transaction_detail_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: `/v1/transaction-details/${transaction_detail_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  CREATE_TRANSACTION_DETAIL(data) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "POST",
        url: "/v1/transaction-details",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  DELETE_TRANSACTION_DETAIL(transaction_detail_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "DELETE",
        url: `/v1/transaction-details/${transaction_detail_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export default new TransactionDetailService();
