import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axios;
