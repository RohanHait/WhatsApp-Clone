import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials : true,
  // headers :{
  //   'Access-Control-Allow-Origin' : 'http://localhost:5000',
  //   "Access-Control-Allow-Credentials" : "true",
  //   "Access-Control-Allow-Methods": "*"
  // }
});