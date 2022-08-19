import axios from "axios";

const ENDPOINT_PATH = "http://127.0.0.1:3333/api/v1/";

export default {
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "regiser", user);
  }
    };