import { useState,useEffect } from 'react'


const useDebounce = (value,delay) => {
    const [debounce,setDebounce] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        },[delay])

        return () => clearTimeout(timer)
    },[value])
    return debounce
}

export default useDebounce