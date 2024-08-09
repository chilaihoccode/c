import * as request from '~/utils/request'

const createUser = async (data) => {
    try {
        const reponseData = await request.post('register',{
            data
        })
        return reponseData
    }catch(e) {
        console.log(e)
    }
}

const loginUser = async (data) => {
    try {
        const responeData = await request.post('login', {
            data
        })
        return responeData
    }catch(e) {
        console.log(e)
    }
}

const getAllUser = async (page,limit) => {
    try{
        const responseData = await request.get(`users/watch/${page}&${limit}`)

        return responseData
    }catch(e) {
        console.log(e)
    }
}

const detroyUser = async (id) => {
    try {
        const responseData = await request.detroy('/users/destroy', {
            data : {
                id : id 
            }
        })
        return responseData
    }catch(e) {
        console.log(e)
    }
}

export { createUser,loginUser,getAllUser,detroyUser }