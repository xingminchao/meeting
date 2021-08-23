import axios from 'axios'  //引入axios
import router from '@/router'


axios.defaults.baseURL = 'http://api.conference.strangeuniverse.com'
// axios.defaults.baseURL = 'http://192.168.50.103:8081'

// axios.interceptors.request.use(config => {
//     // Do something before request is sent
//     return config;
// }, error => {
//     // Do something with request error
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//     // Do something before response is sent
//     return response;
// }, error => {
//     // Do something with response error
//     return Promise.reject(error);
// });

export default axios