import { useState,useEffect } from 'react'
import useDebounce from '~/services/useDebounce'

const Users = [
    {
        name : 'Dao Le Phuong Hoa',
        age : 19,
        gender : 'female'
    },
    {
        name : 'Bui Kim long',
        age : 19,
        gender : 'female'
    },
    {
        name : 'Dao Le Phuong Thuy',
        age : 19,
        gender : 'female'
    },
    {
        name : 'Ma gaming',
        age : 19,
        gender : 'female'
    },
    {
        name : 'Jack',
        age : 19,
        gender : 'female'
    },
    {
        name : 'Son Tung',
        age : 19,
        gender : 'female'
    }
]


function Explope() {
    const [inputValue,setInputValue] = useState('')
    const [result,setResult] = useState([])
    let debounce = useDebounce(inputValue,300)
    useEffect(() => {
        if(debounce.length === 0) {
            return
        }
        let data =  Users.filter((item) => {
            return item.name.toLowerCase().includes(debounce.toLowerCase())
        })
        setResult(data)
        console.log(data)
        // console.log(debounce)
    },[debounce])


    return ( 
        <>
            Explore
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <input 
                            type='hidden'                            
                        />
                    </div>
                    <div className='col-sm-4'>
                        <div className="input-group input-group-sm mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder='Search '
                            onChange={(e) => setInputValue(e.target.value)}    
                        />
                        <span 
                            className="input-group-text text-danger"
                            onClick={() => setInputValue('')}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </span>
                        </div>
                        <div className=''>
                            {result.length === 0 ?
                                <>ko co ket qua</>
                                : 
                            result.map((item,index) => {
                                return <p key={index}>{item.name}</p>
                            })}
                            
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <input 
                            type='hidden'  
                        />
                    </div>
                </div>
            </div>
        </>
     );
}

export default Explope;