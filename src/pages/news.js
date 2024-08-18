import { useState,useRef } from "react";

function News () {  
    let timerId = useRef()

    const [timer,setTimer] = useState(180)


    const handleStart = () => {
        timerId.current = setInterval(() => {
            setTimer(prev => prev - 1)
        },[1000])

        console.log('>> Check timerId',timerId)
    }

    const handleStop = () => {
        clearInterval(timerId.current)
        console.log('>> Check Stop ',timerId.current)
    }


    return ( 
        <div className="container">
            <h1 className="text-primary">News</h1>
            <h3>Time Out Clock</h3>
            <p>{timer}</p>
            <button className="btn btn-primary" onClick={handleStart}>start</button>
            <button className="btn btn-secondary" onClick={handleStop}>stop</button>
        </div>
     );
}

export default News;