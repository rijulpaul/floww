import './Timer.css'
import Button from './Button/Button'
import { useEffect, useState } from 'react'

function Timer() {

    const [timer,setTimer] = useState<number>(25*60);
    const [isActive,setIsActive] = useState<boolean>(false);

    const formatTime = (time:number) => String(time).padStart(2,'0');

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
        clearInterval(interval);
        setTimer(25*60)
    }
  }, [isActive]);

    return(
        <div className='timer-container'>
            <div className='timer'>{formatTime(Math.floor(timer/60)) || "00"}:{formatTime(timer%60)}</div>
            <div className='buttons'>
                {isActive || <Button title="Focus" onClick={()=>{setTimer(25*60);setIsActive(!isActive)}}/>}
                <Button title={isActive ? "Stop" : "Break"} onClick={()=>{setTimer(5*60); setIsActive(!isActive)}}/>
            </div>
        </div>
    )
}

export default Timer
