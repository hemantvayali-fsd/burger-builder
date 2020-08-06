import axios from "axios";

const dbInstance = axios.create({
  baseURL: "https://react-my-burger-2cec8.firebaseio.com/",
});

export default dbInstance;
