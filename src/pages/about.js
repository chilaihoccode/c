import { useState,useRef } from "react";

function About () {
    const inputElement = useRef()

    const [input,setInput] = useState('')
    const [jobList,setJobList] = useState([])

    const addJob = () => {
        setJobList(prev => {
            const newJob = [...prev,input]
            // localStorage.setItem("Job",JSON.stringify(newJob))

            return newJob
        })
        setInput('')
        inputElement.current.focus()
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
                        return <li key={index}>{active}</li>
                    })}
                </ul>
        </div>
     );
}

export default About;