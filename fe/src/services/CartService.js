import axios from "axios";

import { CONSTANT } from "@utils";

class CartService {
  GET_ALL_ITEMS_IN_CART(customer_id) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: CONSTANT.API_ROOT,
        method: "GET",
        url: `/v1/carts/${customer_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export default new CartService();
