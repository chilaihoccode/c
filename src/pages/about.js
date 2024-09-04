import { useState,useRef } from "react";

function About () {
    const inputElement = useRef()
    let jobLocal = JSON.parse(localStorage.getItem('Job'))

    const [input,setInput] = useState('')
    const [jobList,setJobList] = useState(jobLocal || [])
    
    const addJob = () => {
        setJobList(prev => {
            const newJob = [...prev,input]
            localStorage.setItem("Job",JSON.stringify(newJob))

            return newJob
        })
        setInput('')
        inputElement.current.focus()
    }

    const handleDelete = (currentIndex) => {
        
        // let jobLocal = JSON.parse(localStorage.getItem('Job'))

        jobLocal.splice(currentIndex,1)
        localStorage.setItem('Job',JSON.stringify(jobLocal))
        return setJobList(jobLocal)
    }


    return ( 
        <div className="container">
            <h1>About</h1>
                <h2 className="text-primary">Todolist</h2>
            <div className="row">
                <div className="col-10">
                    <input 
                        ref={inputElement}
                        value={input}
                        className="form-control" 
                        onChange={e => setInput(e.target.value)}
                    />
                </div>
                <button 
                    className="btn btn-primary col-2" 
                    onClick={addJob}
                >
                    ADD
                </button>
            </div>
                <ul>
                    <li>Lists</li>
                    {jobList.map((active,index) => {
                        return (
                            <div className="d-flex" key={index}>
                                <li >{active}</li>
                                <span className="mx-5 text-danger btn p-0" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width={15} height={15}
                                    onClick={() => handleDelete(index)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </span>
                            </div>
                        )
                    })}
                </ul>
        </div>
     );
}

export default About;