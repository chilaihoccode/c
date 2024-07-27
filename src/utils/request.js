import axios from "axios"


const request = axios.create({
    baseURL : 'http://127.0.0.1:3000/api/v1/'
})

export const get = async (path,options = {}) => {
    const reponse = await request.get(path,options)

    return reponse.data
}

export const post = async (path,options = {}) => {
    const reponse = await request.post(path,options)

    return reponse.data
}


export default request