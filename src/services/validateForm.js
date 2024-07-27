import { toast } from 'react-toastify'
import * as apiService from '~/apiServices/userService'

const validateFrom = async (data) => {
const formMail = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)?(\.\w{2,3})+$/
let result 
const rules = {
    username : {
        require : true,
        minLength : 3,
    },
    phone : {
        require : true,
        minLength : 10,
    },
    email : {
        require : true,
        regex : formMail
    },
    password : {
        require : true,
        minLength : 8
    },
    confirmPassword : {
        require : true,
        compare_password : 'password'
    }
}

const methodRules = {
    require : (inputText,params) => {
        return inputText ? true : false
    },
    minLength : (inputText,params) => {
        return inputText.length >= params ? true : false
    },
    regex : (inputText,params) => {
        return params.test(inputText)
    },
    compare_password : (inputText,params) => {
        return inputText === data[params] ? true : false
    }
}

// Toast Error validate
const notify = (value) => toast.error(value);

const messageError = {
    username_require : 'Ten ko dc bo trong',
    username_minLength : 'Ten phai hon 3 ki tu',
    phone_require : 'Phone ko dc bo trong',
    phone_minLength : 'Phone phai hon 10 ki tu',
    email_require : 'Email ko dc bo trong',
    email_regex : 'Email phai dung dinh dang',
    password_require : 'Password ko dc bo trong',
    password_minLength : 'Password phai hon 8 ki tu',
    confirmPassword_require : 'Confirm Password ko dc bo trong',
    confirmPassword_compare_password : 'Confirm Password ko dung voi password'
}

    // console.log('>>Check data props',data)
    for( let ruleName in rules ) {
        // console.log('>>Rolename', ruleName)
        let inputText = data[ruleName]
        // console.log('>> Input text',inputText)
        let ruleItems = rules[ruleName]
        for(let ruleVaild in ruleItems) {
            // console.log('>> check rule value',ruleItems[ruleVaild])
            const params = ruleItems[ruleVaild]
            result = methodRules[ruleVaild](inputText,params)
            console.log(result)
            let message = messageError[`${ruleName}_${ruleVaild}`]
            if(!result) {
                notify(message)
                break;
            }
        }
    }

    if(result) {
        const validValue = await apiService.createUser(data)
        return validValue
    }
}

export default validateFrom