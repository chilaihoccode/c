import * as request from '~/utils/request'

const getAllGroup = async (data) => {
    try{
        const response = await request.get('groups/watch')
        return response
    }catch(e) {
        console.log(e)
    }
}

export {
    getAllGroup
}