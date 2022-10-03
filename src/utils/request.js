import axios from "axios";
// Add a request interceptor
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 3000,
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.status<400) {
        return response.data
    }

    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const request =(options)=>{
    options.method = options.method || 'get'
    if (options.method.toLowerCase()==='get') {
        options.params = options.data || options.params
        delete options.data
    }
    return instance(options)
}

export default request
