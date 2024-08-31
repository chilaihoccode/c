import axios from "axios"
import {toast} from 'react-toastify'

const request = axios.create({
    baseURL : 'http://127.0.0.1:3000/api/v1/',
})
request.defaults.withXSRFToken = true
request.defaults.withCredentials = true


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.reponse && error.reponse.status || 500
    switch(status) {
        case 401:
            // code block
            toast.error('Unauthorized user.Please login')
            return Promise.reject(error);
        case 400:
            // code block
            return Promise.reject(error);
        default:
            // code block
        return Promise.reject(error);
    }
  });


// methods axios
export const get = async (path,options = {}) => {
    const reponse = await request.get(path,options)

    return reponse.data
}

export const post = async (path,options = {}) => {
    const reponse = await request.post(path,options)

    return reponse.data
}

export const detroy = async (path,options = {}) => {
    const response = await request.delete(path,options)

    return response.data
}

export const update = async (path,options = {}) => {
    const reponse = await request.put(path,options)

    return reponse.data
}


export default request